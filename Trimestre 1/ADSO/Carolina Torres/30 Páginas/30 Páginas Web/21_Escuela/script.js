function mostrar(id) {
    let p = document.getElementById('programas');
    let n = document.getElementById('noticias');
    
    p.style.display = 'none';
    n.style.display = 'none';
    
    document.getElementById(id).style.display = 'block';
}
