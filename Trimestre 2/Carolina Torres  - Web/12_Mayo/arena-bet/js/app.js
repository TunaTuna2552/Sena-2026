/* ============================================
   ARENA BET GAMING — app.js
   Todas las funciones JS del taller
   ============================================ */

// ─── DATOS GLOBALES ─────────────────────────

const PUNTOS_INICIALES = 1000;
const MULTIPLICADOR_GANANCIA = 1.8; // Multiplica lo apostado si gana

/** Array de partidas disponibles (NO escritas en HTML) */
const PARTIDAS = [
  {
    id: 1,
    juego: "League of Legends",
    equipoA: "Dragons FC",
    equipoB: "Shadow Wolves",
    duracionFalsa: 120, // segundos del contador regresivo
    badgeClass: "lol"
  },
  {
    id: 2,
    juego: "Valorant",
    equipoA: "Cyber Ninjas",
    equipoB: "Pixel Titans",
    duracionFalsa: 90,
    badgeClass: "val"
  },
  {
    id: 3,
    juego: "Counter-Strike 2",
    equipoA: "Omega Team",
    equipoB: "Dark Bots",
    duracionFalsa: 150,
    badgeClass: "cs2"
  }
];

// Estado de la app
let estadoJuego = {
  puntos: PUNTOS_INICIALES,
  historial: [],
  equipoSeleccionadoIndex: null,
  partidaFiltroActiva: "todos"
};

// ─── INICIALIZACIÓN ──────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  cargarPuntos();
  renderizarPartidas();
  renderizarHistorial();
  calcularRanking();
  renderizarRanking();
  generarParticulas();
  poblarSelectPartidas();
  actualizarDashboard();
});

/** Genera las partículas del hero */
function generarParticulas() {
  const container = document.getElementById("heroParticles");
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left   = Math.random() * 100 + "%";
    p.style.width  = Math.random() * 3 + 1 + "px";
    p.style.height = p.style.width;
    p.style.animationDuration  = Math.random() * 10 + 6 + "s";
    p.style.animationDelay     = Math.random() * 8 + "s";
    p.style.opacity = Math.random() * 0.8;
    container.appendChild(p);
  }
}

// ─── PUNTOS ──────────────────────────────────

/**
 * Carga los puntos y el historial desde localStorage.
 */
function cargarPuntos() {
  const guardado = localStorage.getItem("arenaBetEstado");
  if (guardado) {
    try {
      const datos = JSON.parse(guardado);
      estadoJuego.puntos   = datos.puntos   ?? PUNTOS_INICIALES;
      estadoJuego.historial = datos.historial ?? [];
    } catch {
      estadoJuego.puntos    = PUNTOS_INICIALES;
      estadoJuego.historial = [];
    }
  }
}

/**
 * Guarda el estado completo en localStorage.
 */
function guardarPuntos() {
  localStorage.setItem("arenaBetEstado", JSON.stringify({
    puntos:   estadoJuego.puntos,
    historial: estadoJuego.historial
  }));
}

// ─── RENDER PARTIDAS ─────────────────────────

/**
 * Renderiza las cards de partidas desde el array PARTIDAS.
 * Regla 1: No se permiten partidas quemadas en HTML.
 */
function renderizarPartidas(filtroJuego = "todos") {
  const container = document.getElementById("partidasContainer");
  if (!container) return;
  container.innerHTML = "";

  const lista = filtroJuego === "todos"
    ? PARTIDAS
    : PARTIDAS.filter(p => p.juego === filtroJuego);

  if (lista.length === 0) {
    container.innerHTML = `<div class="col-12 text-center text-muted py-5">
      <i class="bi bi-search fs-3 d-block mb-2"></i>No hay partidas para este juego.
    </div>`;
    return;
  }

  lista.forEach(partida => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    const animDuration = partida.duracionFalsa + "s";

    col.innerHTML = `
      <div class="partida-card h-100" id="card-partida-${partida.id}">
        <div class="partida-header">
          <span class="game-badge ${partida.badgeClass}">${partida.juego}</span>
          <span class="live-dot">LIVE</span>
        </div>
        <div class="partida-body">
          <div class="matchup">
            <div class="team-name">${partida.equipoA}</div>
            <div class="vs-text">VS</div>
            <div class="team-name">${partida.equipoB}</div>
          </div>
          <div class="countdown-bar" title="Tiempo restante simulado">
            <div class="countdown-fill" style="animation-duration:${animDuration}"></div>
          </div>
          <button class="bet-btn" onclick="seleccionarPartidaEnForm(${partida.id})">
            <i class="bi bi-lightning-fill me-1"></i>APOSTAR
          </button>
        </div>
      </div>`;
    container.appendChild(col);
  });
}

/** Filtra las cards por juego al hacer clic en los botones de filtro */
function filtrarPartidas(btn) {
  document.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const juego = btn.getAttribute("data-game");
  estadoJuego.partidaFiltroActiva = juego;
  renderizarPartidas(juego);
}

// ─── FORMULARIO ──────────────────────────────

/** Rellena el <select> de partidas en el formulario */
function poblarSelectPartidas() {
  const sel = document.getElementById("partidaSelect");
  if (!sel) return;
  PARTIDAS.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.juego} — ${p.equipoA} vs ${p.equipoB}`;
    sel.appendChild(opt);
  });
  sel.addEventListener("change", () => actualizarEquiposForm());
}

/** Cuando el usuario elige una partida, actualiza los botones de equipo */
function actualizarEquiposForm() {
  const sel = document.getElementById("partidaSelect");
  const id  = parseInt(sel.value);
  const partida = PARTIDAS.find(p => p.id === id);

  const e1 = document.getElementById("equipo1Nombre");
  const e2 = document.getElementById("equipo2Nombre");
  const eq = document.getElementById("equipoElegido");

  if (partida) {
    e1.textContent = partida.equipoA;
    e2.textContent = partida.equipoB;
  } else {
    e1.textContent = "--";
    e2.textContent = "--";
  }

  // Reset selección
  estadoJuego.equipoSeleccionadoIndex = null;
  eq.value = "";
  document.getElementById("equipo1Btn").classList.remove("selected");
  document.getElementById("equipo2Btn").classList.remove("selected");
}

/** Al hacer clic en botón de equipo (0 = A, 1 = B) */
function seleccionarEquipo(index) {
  const sel     = document.getElementById("partidaSelect");
  const id      = parseInt(sel.value);
  const partida = PARTIDAS.find(p => p.id === id);
  if (!partida) {
    mostrarAlerta("Primero selecciona una partida.", "warning");
    return;
  }

  estadoJuego.equipoSeleccionadoIndex = index;
  document.getElementById("equipoElegido").value = index === 0 ? partida.equipoA : partida.equipoB;

  document.getElementById("equipo1Btn").classList.toggle("selected", index === 0);
  document.getElementById("equipo2Btn").classList.toggle("selected", index === 1);
}

/** Abre el formulario preseleccionando la partida clickeada en la card */
function seleccionarPartidaEnForm(idPartida) {
  const sel = document.getElementById("partidaSelect");
  sel.value = idPartida;
  actualizarEquiposForm();
  document.getElementById("apostar").scrollIntoView({ behavior: "smooth" });
  mostrarToast(`<i class="bi bi-lightning me-1"></i>Partida seleccionada. Elige tu equipo.`, "info");
}

// ─── VALIDACIÓN ──────────────────────────────

/**
 * Valida todos los campos del formulario antes de apostar.
 * Retorna { valido: bool, datos: {...} }
 */
function validarApuesta() {
  const nombre  = document.getElementById("nombreJugador").value.trim();
  const idStr   = document.getElementById("partidaSelect").value;
  const equipo  = document.getElementById("equipoElegido").value;
  const puntosStr = document.getElementById("puntosApostar").value;

  if (!nombre) {
    mostrarAlerta("⚠️ Debes ingresar tu nombre de jugador.", "danger");
    return { valido: false };
  }
  if (!idStr) {
    mostrarAlerta("⚠️ Debes seleccionar una partida.", "danger");
    return { valido: false };
  }
  if (!equipo) {
    mostrarAlerta("⚠️ Debes seleccionar un equipo ganador.", "danger");
    return { valido: false };
  }

  const puntosApuesta = parseInt(puntosStr);
  if (!puntosStr || isNaN(puntosApuesta) || puntosApuesta <= 0) {
    mostrarAlerta("⚠️ Los puntos deben ser un número mayor a 0.", "danger");
    return { valido: false };
  }
  if (estadoJuego.puntos <= 0) {
    mostrarAlerta("⛔ No tienes puntos disponibles. Usa el botón Reiniciar.", "danger");
    return { valido: false };
  }
  if (puntosApuesta > estadoJuego.puntos) {
    mostrarAlerta(`⚠️ No puedes apostar más de ${estadoJuego.puntos} puntos.`, "danger");
    return { valido: false };
  }

  const partida = PARTIDAS.find(p => p.id === parseInt(idStr));
  ocultarAlerta();
  return { valido: true, nombre, partida, equipo, puntosApuesta };
}

// ─── LÓGICA DE APUESTA ───────────────────────

/**
 * Simula aleatoriamente el ganador de una partida.
 * 50/50 chance entre equipoA y equipoB.
 */
function simularGanador(partida) {
  return Math.random() < 0.5 ? partida.equipoA : partida.equipoB;
}

/**
 * Calcula el resultado de la apuesta.
 * Retorna { gano: bool, ganancia: number }
 */
function calcularResultado(equipoElegido, ganadorReal, puntosApuesta) {
  const gano = equipoElegido === ganadorReal;
  const ganancia = gano
    ? Math.round(puntosApuesta * MULTIPLICADOR_GANANCIA)
    : -puntosApuesta;
  return { gano, ganancia };
}

/**
 * Función principal: maneja todo el flujo de la apuesta.
 */
function realizarApuesta() {
  const validacion = validarApuesta();
  if (!validacion.valido) return;

  const { nombre, partida, equipo, puntosApuesta } = validacion;

  // Simular ganador
  const ganadorReal = simularGanador(partida);

  // Calcular resultado
  const { gano, ganancia } = calcularResultado(equipo, ganadorReal, puntosApuesta);

  // Actualizar puntos
  estadoJuego.puntos += ganancia;
  if (estadoJuego.puntos < 0) estadoJuego.puntos = 0;

  // Crear registro de historial
  const registro = {
    jugador:        nombre,
    juego:          partida.juego,
    partida:        `${partida.equipoA} vs ${partida.equipoB}`,
    equipoElegido:  equipo,
    ganadorReal,
    puntosApostados: puntosApuesta,
    resultado:       gano ? "ganó" : "perdió",
    ganancia:        ganancia,
    fecha:           new Date().toLocaleString("es-CO", { dateStyle:"short", timeStyle:"short" })
  };

  // Guardar
  guardarHistorial(registro);
  guardarPuntos();

  // Actualizar UI
  actualizarDashboard();
  renderizarHistorial();
  calcularRanking();
  renderizarRanking();

  // Mostrar modal de resultado
  mostrarModalResultado(registro, ganadorReal);

  // Limpiar formulario
  limpiarFormulario();
}

// ─── HISTORIAL ───────────────────────────────

/**
 * Agrega un registro al historial y lo guarda.
 */
function guardarHistorial(registro) {
  estadoJuego.historial.unshift(registro); // más reciente primero
  guardarPuntos();
}

/**
 * Renderiza la tabla del historial.
 * Aplica los filtros activos si los hay.
 */
function renderizarHistorial(lista) {
  const tbody = document.getElementById("historialBody");
  if (!tbody) return;

  const datos = lista || estadoJuego.historial;

  if (datos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-muted">
      <i class="bi bi-inbox fs-3 d-block mb-2"></i>Sin apuestas aún. ¡Haz tu primera predicción!
    </td></tr>`;
    return;
  }

  tbody.innerHTML = datos.map(r => `
    <tr class="${r.resultado === 'ganó' ? 'win' : 'loss'}">
      <td><strong>${r.jugador}</strong></td>
      <td><small>${r.juego}</small></td>
      <td><small>${r.partida}</small></td>
      <td>${r.equipoElegido}</td>
      <td>${r.ganadorReal}</td>
      <td><strong>${r.puntosApostados}</strong></td>
      <td>
        ${r.resultado === 'ganó'
          ? `<span class="badge-result-win"><i class="bi bi-check2 me-1"></i>GANÓ</span>`
          : `<span class="badge-result-loss"><i class="bi bi-x me-1"></i>PERDIÓ</span>`}
      </td>
      <td class="${r.ganancia > 0 ? 'text-success' : 'text-danger'}">
        <strong>${r.ganancia > 0 ? '+' : ''}${r.ganancia}</strong>
      </td>
      <td><small class="text-muted">${r.fecha}</small></td>
    </tr>
  `).join("");
}

/**
 * Filtra el historial según los controles de búsqueda/filtro.
 */
function filtrarHistorial() {
  const buscar   = document.getElementById("buscarJugador").value.toLowerCase();
  const juego    = document.getElementById("filtroJuego").value;
  const resultado = document.getElementById("filtroResultado").value;

  let filtrado = estadoJuego.historial.filter(r => {
    const matchJugador  = r.jugador.toLowerCase().includes(buscar);
    const matchJuego    = juego    ? r.juego === juego          : true;
    const matchResult   = resultado ? r.resultado === resultado  : true;
    return matchJugador && matchJuego && matchResult;
  });

  renderizarHistorial(filtrado);
}

/** Ordena el historial por mayor ganancia y lo renderiza */
function ordenarPorGanancia() {
  const ordenado = [...estadoJuego.historial].sort((a, b) => b.ganancia - a.ganancia);
  renderizarHistorial(ordenado);
  mostrarToast('<i class="bi bi-sort-down me-1"></i>Ordenado por mayor ganancia.', "info");
}

// ─── RANKING ─────────────────────────────────

/**
 * Calcula el ranking desde el historial.
 * Agrupa por jugador, suma ganancias positivas.
 * NO quemado en HTML.
 */
function calcularRanking() {
  const mapa = {};
  estadoJuego.historial.forEach(r => {
    if (!mapa[r.jugador]) {
      mapa[r.jugador] = { jugador: r.jugador, totalGanado: 0, apuestas: 0, victorias: 0 };
    }
    mapa[r.jugador].apuestas++;
    if (r.ganancia > 0) {
      mapa[r.jugador].totalGanado += r.ganancia;
      mapa[r.jugador].victorias++;
    }
  });

  return Object.values(mapa).sort((a, b) => b.totalGanado - a.totalGanado);
}

/**
 * Renderiza el ranking dinámicamente.
 */
function renderizarRanking() {
  const container = document.getElementById("rankingContainer");
  if (!container) return;

  const ranking = calcularRanking();

  if (ranking.length === 0) {
    container.innerHTML = `<div class="text-center py-4 text-muted">
      <i class="bi bi-hourglass fs-3 d-block mb-2"></i>El ranking aparecerá al realizar apuestas.
    </div>`;
    return;
  }

  const maxPuntos = ranking[0].totalGanado || 1;
  const medallas  = ["gold", "silver", "bronze"];

  container.innerHTML = ranking.map((r, i) => {
    const posClass  = medallas[i] || "other";
    const posLabel  = i < 3 ? ["🥇","🥈","🥉"][i] : `#${i + 1}`;
    const barWidth  = Math.round((r.totalGanado / maxPuntos) * 100);
    const winRate   = r.apuestas > 0 ? Math.round((r.victorias / r.apuestas) * 100) : 0;

    return `
    <div class="ranking-item">
      <div class="rank-pos ${posClass}">${posLabel}</div>
      <div>
        <div class="rank-name">${r.jugador}</div>
        <small class="text-muted">${r.victorias}/${r.apuestas} victorias · ${winRate}% win rate</small>
      </div>
      <div class="rank-bar-wrap">
        <div class="rank-bar" style="width:${barWidth}%"></div>
      </div>
      <div class="rank-pts">+${r.totalGanado} pts</div>
    </div>`;
  }).join("");
}

// ─── MODAL DE RESULTADO ──────────────────────

/**
 * Muestra el modal con el resultado de la apuesta.
 */
function mostrarModalResultado(registro) {
  const gano = registro.resultado === "ganó";

  document.getElementById("resultIcon").textContent    = gano ? "🏆" : "💔";
  document.getElementById("resultTitle").textContent   = gano ? "¡VICTORIA!" : "DERROTA";
  document.getElementById("resultTitle").style.color   = gano ? "var(--success)" : "var(--danger)";
  document.getElementById("resultDesc").textContent    = gano
    ? `¡${registro.equipoElegido} ganó la partida! Tu predicción fue correcta.`
    : `${registro.ganadorReal} fue el ganador. Mejor suerte la próxima vez.`;

  const ptsTxt = gano ? `+${registro.ganancia} pts` : `${registro.ganancia} pts`;
  document.getElementById("resultPoints").textContent  = ptsTxt;
  document.getElementById("resultPoints").style.color  = gano ? "var(--success)" : "var(--danger)";

  document.getElementById("resultDetails").innerHTML = `
    Partida: <strong>${registro.partida}</strong><br>
    Jugaste como: <strong>${registro.jugador}</strong><br>
    Puntos actuales: <strong>${estadoJuego.puntos}</strong>
  `;

  const modal = new bootstrap.Modal(document.getElementById("resultadoModal"));
  modal.show();

  // Toast
  mostrarToast(
    gano
      ? `<i class="bi bi-trophy-fill me-1"></i>¡Ganaste ${registro.ganancia} puntos!`
      : `<i class="bi bi-x-circle me-1"></i>Perdiste ${Math.abs(registro.ganancia)} puntos.`,
    gano ? "success" : "danger"
  );
}

// ─── TOAST ───────────────────────────────────

/**
 * Muestra un toast de Bootstrap con mensaje y tipo.
 */
function mostrarToast(mensaje, tipo = "info") {
  const toastEl = document.getElementById("gameToast");
  const toastBody = document.getElementById("toastBody");
  if (!toastEl || !toastBody) return;

  toastBody.innerHTML = mensaje;
  toastEl.style.borderLeft = tipo === "success"
    ? "3px solid var(--success)"
    : tipo === "danger"
    ? "3px solid var(--danger)"
    : "3px solid var(--neon)";

  const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
  toast.show();
}

// ─── DASHBOARD / NIVEL ───────────────────────

/**
 * Actualiza todos los contadores del dashboard.
 */
function actualizarDashboard() {
  // Puntos actuales
  const puntosEl = document.getElementById("puntosDisplay");
  const puntosDispEl = document.getElementById("puntosDisp");
  const puntosBar = document.getElementById("puntosBar");
  if (puntosEl) puntosEl.textContent = estadoJuego.puntos;
  if (puntosDispEl) puntosDispEl.textContent = estadoJuego.puntos;

  // Barra de puntos (max visual = 2000 pts)
  if (puntosBar) {
    const pct = Math.min(100, (estadoJuego.puntos / 2000) * 100);
    puntosBar.style.width = pct + "%";
  }

  // Ganancias y pérdidas totales
  let ganancias = 0, perdidas = 0;
  estadoJuego.historial.forEach(r => {
    if (r.ganancia > 0) ganancias += r.ganancia;
    else                perdidas  += Math.abs(r.ganancia);
  });
  const ganEl = document.getElementById("gananciasTotales");
  const perEl = document.getElementById("perdidasTotales");
  if (ganEl) ganEl.textContent = ganancias;
  if (perEl) perEl.textContent = perdidas;

  // Nivel
  actualizarNivel();
}

/**
 * Calcula el nivel del jugador según sus puntos.
 * Bronce < 500 | Plata < 1500 | Oro < 3000 | Diamante ≥ 3000
 */
function actualizarNivel() {
  const pts = estadoJuego.puntos;
  let nivel, color, icono;

  if (pts >= 3000)      { nivel = "Diamante"; color = "#b9f2ff"; icono = "bi-gem"; }
  else if (pts >= 1500) { nivel = "Oro";      color = "var(--gold)";   icono = "bi-star-fill"; }
  else if (pts >= 500)  { nivel = "Plata";    color = "var(--silver)"; icono = "bi-shield-fill"; }
  else                  { nivel = "Bronce";   color = "var(--bronze)"; icono = "bi-shield-half"; }

  const nivelEl  = document.getElementById("nivelDisplay");
  const iconEl   = document.getElementById("nivelIcon");
  if (nivelEl) { nivelEl.textContent = nivel; nivelEl.style.color = color; }
  if (iconEl)  { iconEl.innerHTML = `<i class="bi ${icono}"></i>`; iconEl.style.color = color; }
}

// ─── REINICIAR ───────────────────────────────

/**
 * Reinicia los puntos del jugador a 1000.
 * Conserva historial.
 */
function reiniciarJuego() {
  if (!confirm("¿Seguro que quieres reiniciar tus puntos a 1000? El historial se conservará.")) return;
  estadoJuego.puntos = PUNTOS_INICIALES;
  guardarPuntos();
  actualizarDashboard();
  mostrarToast('<i class="bi bi-arrow-counterclockwise me-1"></i>Puntos reiniciados a 1000.', "info");
}

// ─── TEMA ────────────────────────────────────

/** Alterna entre modo oscuro y claro */
function toggleTheme() {
  const html = document.documentElement;
  const actual = html.getAttribute("data-theme");
  html.setAttribute("data-theme", actual === "dark" ? "light" : "dark");
  mostrarToast('<i class="bi bi-lightning-charge-fill me-1"></i>Tema cambiado.', "info");
}

// ─── UTILIDADES ──────────────────────────────

function mostrarAlerta(mensaje, tipo = "danger") {
  const alerta = document.getElementById("formAlerta");
  if (!alerta) return;
  alerta.className = `alert alert-${tipo}`;
  alerta.textContent = mensaje;
  alerta.classList.remove("d-none");
  alerta.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function ocultarAlerta() {
  const alerta = document.getElementById("formAlerta");
  if (alerta) alerta.classList.add("d-none");
}

function limpiarFormulario() {
  document.getElementById("nombreJugador").value = "";
  document.getElementById("partidaSelect").value = "";
  document.getElementById("puntosApostar").value = "";
  document.getElementById("equipoElegido").value = "";
  document.getElementById("equipo1Nombre").textContent = "--";
  document.getElementById("equipo2Nombre").textContent = "--";
  document.getElementById("equipo1Btn").classList.remove("selected");
  document.getElementById("equipo2Btn").classList.remove("selected");
  estadoJuego.equipoSeleccionadoIndex = null;
  ocultarAlerta();
}
