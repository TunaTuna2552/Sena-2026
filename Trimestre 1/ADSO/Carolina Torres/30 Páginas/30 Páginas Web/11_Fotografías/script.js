document.addEventListener('DOMContentLoaded', () => {
    let imgs = [], idx = 0;
    const $ = id => document.getElementById(id);
    const q = s => document.querySelector(s);
    const lb = $('lightbox'), lbImg = $('lightbox-img'), hero = q('.hero-container'), heroImg = q('.img-hero');

    const updateList = () => imgs = [...document.querySelectorAll('.galeria-container img')].filter(img => img.offsetParent);

    window.addEventListener('scroll', () => {
        if (heroImg && hero.style.display !== 'none') heroImg.style.transform = `translateY(${scrollY * 0.4}px)`;
    });

    window.filtrar = cat => {
        q('.Juli').style.display = (cat === 'todas' || cat === 'Juli') ? 'contents' : 'none';
        q('.Cris').style.display = (cat === 'todas' || cat === 'Cris') ? 'contents' : 'none';
        hero.style.display = (cat === 'todas') ? 'flex' : 'none';
        updateList();
    };

    $('btn-oscuro').onclick = (e) => {
        const isDark = document.body.classList.toggle('dark-mode');
        e.target.innerText = isDark ? "MODO CLARO" : "MODO OSCURO";
    };

    const showLB = i => {
        idx = (i + imgs.length) % imgs.length;
        lbImg.style.opacity = '0';
        lb.style.display = 'flex';
        setTimeout(() => { lbImg.src = imgs[idx].src; lbImg.style.opacity = '1'; }, 150);
    };

    q('.galeria-container').onclick = e => {
        if (e.target.tagName === 'IMG') { updateList(); showLB(imgs.indexOf(e.target)); }
    };

    lb.onclick = e => { if (e.target !== lbImg) lb.style.display = 'none'; };
    $('cerrar').onclick = () => lb.style.display = 'none';

    document.onkeydown = e => {
        if (lb.style.display === 'flex') {
            if (e.key === "ArrowRight") showLB(idx + 1);
            else if (e.key === "ArrowLeft") showLB(idx - 1);
            else if (e.key === "Escape") lb.style.display = 'none';
        }
    };

    updateList();
});
