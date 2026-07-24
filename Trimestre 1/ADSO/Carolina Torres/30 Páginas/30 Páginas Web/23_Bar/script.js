function reservar() {
    let nombrePersona = prompt("¿A nombre de quién hacemos la reserva?");
    
    if (nombrePersona) {
        alert("¡Hola " + nombrePersona + "! Tu reserva ha sido registrada con éxito.");
    } else {
        alert("Reserva cancelada.");
    }
}
