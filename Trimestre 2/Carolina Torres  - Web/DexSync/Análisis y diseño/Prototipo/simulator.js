window.HandSimulator = (function() {
  let container, renderer, scene, camera, controls;
  let handModel = null;
  
  /* Bones storage mapped from GLTF */
  const bones = {
    pulgar:  [null, null, null],
    indice:  [null, null, null],
    medio:   [null, null, null],
    anular:  [null, null, null],
    menique: [null, null, null],
    wrist:   null
  };

  /* ═════════════ PUBLIC API ═════════════ */

  function init() {
    container = document.getElementById('hand-sim-canvas');
    if (!container) return;

    /* Setup */
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f5f9);
    scene.fog = new THREE.Fog(0xf1f5f9, 5, 15);

    camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0.8, 1.8, 3.2);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0.6, 0);
    controls.minDistance = 2;
    controls.maxDistance = 7;
    controls.maxPolarAngle = Math.PI * 0.85;

    /* Cinematic Lighting Setup */
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(4, 6, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 15;
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.bias = -0.001;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xbae6fd, 0.7);
    fill.position.set(-4, 3, -2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xe0f2fe, 1.5);
    rim.position.set(0, 2, -6);
    scene.add(rim);

    /* Environment Map (HDRI substitute) */
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x111111);
    const envLight1 = new THREE.DirectionalLight(0xffffff, 2);
    envLight1.position.set(5, 5, 5);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0xbae6fd, 1);
    envLight2.position.set(-5, -5, -5);
    envScene.add(envLight2);
    scene.environment = pmremGenerator.fromScene(envScene).texture;

    /* Base Platform */
    _buildPlatform();

    /* Load the 3D model */
    const loader = new THREE.GLTFLoader();
    loader.load(
      'Meshy_AI_Character_output.glb',
      function (gltf) {
        handModel = gltf.scene;
        
        /* Enable shadows and normalize materials if needed */
        handModel.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        /* The uploaded model might have a different scale/position, so we normalize it */
        const box = new THREE.Box3().setFromObject(handModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        console.log("Model size:", size, "Model center:", center);
        
        // Scale the model down to better proportions (2.2 units tall)
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const scale = 2.2 / maxDim;
          handModel.scale.set(scale, scale, scale);
        }
        
        // Position hand so its bottom base rests directly on top of the platform (Y = 0)
        handModel.position.set(
          -center.x * handModel.scale.x,
          -box.min.y * handModel.scale.y,
          -center.z * handModel.scale.z
        );
        scene.add(handModel);
        console.log("Hand model added to scene at position:", handModel.position);
        
        // Dynamically adjust OrbitControls target to upper-center of the hand
        controls.target.set(0, (box.max.y - box.min.y) * handModel.scale.x * 0.45, 0);
        controls.update();

        /* Map GLTF Bones to local state */
        _mapBones(handModel);

        /* Refresh sliders with the newly mapped bones */
        reset();
      },
      undefined,
      function (error) {
        console.error('Error cargando Meshy_AI_Character_output.glb:', error);
      }
    );

    /* Initialize Sliders Event Listeners */
    _bindSliders();

    /* Resize Handler */
    window.addEventListener('resize', () => _onResize(container));

    /* Start Render Loop */
    _animate();
  }

  function reset() {
    if (bones.wrist && bones.wrist._restQuat) {
      bones.wrist.quaternion.copy(bones.wrist._restQuat);
    }

    const fingerNames = ['pulgar', 'indice', 'medio', 'anular', 'menique'];
    fingerNames.forEach(name => {
      bones[name].forEach((bone) => {
        if (bone && bone._restQuat) {
          bone.quaternion.copy(bone._restQuat);
        }
      });

      /* Reset single slider UI */
      const slider = document.getElementById(`sim-${name}`);
      const valEl  = document.getElementById(`sim-val-${name}`);
      if (slider) { slider.value = 0; _updateSliderBg(slider); }
      if (valEl) valEl.textContent = '0°';
    });

    /* Reset wrist sliders */
    ['pitch', 'yaw'].forEach(axis => {
      const slider = document.getElementById(`sim-wrist-${axis}`);
      const valEl  = document.getElementById(`sim-val-wrist-${axis}`);
      if (slider) { slider.value = 0; _updateSliderBg(slider); }
      if (valEl) valEl.textContent = '0°';
    });
  }

  function setColor(preset) {
    document.querySelectorAll('.color-swatch').forEach(el => {
      el.classList.toggle('active', el.dataset.color === preset);
    });
    console.log(`[Simulator] Color preset '${preset}' activado en la UI.`);
  }

  /* ═════════════ INTERNAL ═════════════ */
 
  /* Anatomical max flexion angles per joint (in radians) derived from kinematic reference */
  const DEG = THREE.MathUtils.degToRad;
  const FINGER_MAX = {
    pulgar:  [DEG(50),  DEG(65),  DEG(0)],
    indice:  [DEG(95),  DEG(110), DEG(85)],
    medio:   [DEG(95),  DEG(112), DEG(85)],
    anular:  [DEG(95),  DEG(112), DEG(88)],
    menique: [DEG(100), DEG(112), DEG(90)]
  };

  function _mapBones(model) {
    /* Map wrist to the root bone of the hand */
    bones.wrist = model.getObjectByName('Bone_001') || null;
    
    bones.pulgar = [
      model.getObjectByName('Bone_007') || null,
      model.getObjectByName('Bone_006') || null,
      model.getObjectByName('Bone_005') || null
    ];
    bones.indice = [
      model.getObjectByName('Bone_019') || null,
      model.getObjectByName('Bone_018') || null,
      model.getObjectByName('Bone_017') || null
    ];
    bones.medio = [
      model.getObjectByName('Bone_023') || null,
      model.getObjectByName('Bone_022') || null,
      model.getObjectByName('Bone_021') || null
    ];
    bones.anular = [
      model.getObjectByName('Bone_015') || null,
      model.getObjectByName('Bone_014') || null,
      model.getObjectByName('Bone_013') || null
    ];
    bones.menique = [
      model.getObjectByName('Bone_011') || null,
      model.getObjectByName('Bone_010') || null,
      model.getObjectByName('Bone_009') || null
    ];

    /* Save pristine rigged rest quaternions directly from GLTF */
    const fingerNames = ['pulgar', 'indice', 'medio', 'anular', 'menique'];
    fingerNames.forEach(name => {
      bones[name].forEach(bone => {
        if (bone) {
          bone._restQuat = bone.quaternion.clone();
        }
      });
    });
    if (bones.wrist) {
      bones.wrist._restQuat = bones.wrist.quaternion.clone();
    }

    console.info('Custom bone mapping applied for hand structure.');
  }

  function _buildPlatform() {
    const geo = new THREE.CylinderGeometry(1.0, 1.0, 0.05, 48);
    const mat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.15, roughness: 0.6 });
    const platform = new THREE.Mesh(geo, mat);
    platform.position.y = -0.03;
    platform.receiveShadow = true;
    scene.add(platform);
  }

  function _bindSliders() {
    const fingerNames = ['pulgar', 'indice', 'medio', 'anular', 'menique'];

    fingerNames.forEach(name => {
      const slider = document.getElementById(`sim-${name}`);
      const valEl  = document.getElementById(`sim-val-${name}`);
      if (!slider) return;

      _updateSliderBg(slider);

      slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (valEl) valEl.textContent = val + '°';
        _updateSliderBg(slider);

        const rad = THREE.MathUtils.degToRad(val);
        const dq = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), rad);

        /* Flex relative to pristine GLTF rest pose */
        bones[name].forEach((bone) => {
          if (!bone || !bone._restQuat) return;
          bone.quaternion.copy(bone._restQuat).multiply(dq);
        });
      });
    });

    /* Wrist Sliders */
    const wPitch = document.getElementById('sim-wrist-pitch');
    const wPitchVal = document.getElementById('sim-val-wrist-pitch');
    if (wPitch) {
      _updateSliderBg(wPitch);
      wPitch.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (wPitchVal) wPitchVal.textContent = val + '°';
        _updateSliderBg(wPitch);
        if (bones.wrist && bones.wrist._restX !== undefined) {
          bones.wrist.rotation.x = bones.wrist._restX + THREE.MathUtils.degToRad(val);
        }
      });
    }

    const wYaw = document.getElementById('sim-wrist-yaw');
    const wYawVal = document.getElementById('sim-val-wrist-yaw');
    if (wYaw) {
      _updateSliderBg(wYaw);
      wYaw.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (wYawVal) wYawVal.textContent = val + '°';
        _updateSliderBg(wYaw);
        if (bones.wrist && bones.wrist._restY !== undefined) {
          bones.wrist.rotation.y = bones.wrist._restY + THREE.MathUtils.degToRad(val);
        }
      });
    }
  }

  function _updateGripMeter() {
    let totalAng = 0;
    const fingerNames = ['pulgar', 'indice', 'medio', 'anular', 'menique'];

    fingerNames.forEach(name => {
      const slider = document.getElementById(`sim-${name}`);
      if (slider) {
        totalAng += parseInt(slider.value, 10);
      }
    });

    /* Max angle: 5 fingers × 90° = 450 */
    let perc = (totalAng / 450) * 100;
    if (perc > 100) perc = 100;

    const meterFill = document.getElementById('grip-meter-fill');
    if (!meterFill) return;

    meterFill.style.width = perc + '%';

    if (perc < 33) {
      meterFill.style.backgroundColor = 'var(--dx-400)';
    } else if (perc < 66) {
      meterFill.style.backgroundColor = '#f59e0b'; // amber-500
    } else {
      meterFill.style.backgroundColor = '#ef4444'; // red-500
    }
  }

  function _updateSliderBg(slider) {
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = parseFloat(slider.value);
    const perc = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--dx-500) ${perc}%, var(--slate-200) ${perc}%)`;
  }

  function _onResize(containerEl) {
    if (!camera || !renderer || !containerEl) return;
    camera.aspect = containerEl.clientWidth / containerEl.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
  }

  function _animate() {
    requestAnimationFrame(_animate);
    if (controls) controls.update();
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  return { init, reset, setColor };
})();
