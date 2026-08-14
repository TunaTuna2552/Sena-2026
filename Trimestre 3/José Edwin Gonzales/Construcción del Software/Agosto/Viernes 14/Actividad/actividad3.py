class DispositivoRed:
    def __init__(self, nombre_equipo, direccion_ip, tipo, estado_ping = "Desconectado"):
        self.nombre_equipo = nombre_equipo
        self.direccion_ip = direccion_ip
        self.tipo = tipo
        self.estado_ping = estado_ping

dispositivo_1 = DispositivoRed("Router FMLA SÁNCHEZ", "123456789", "Router")
dispositivo_2 = DispositivoRed("PC de Cris", "987654321", "PC")

print(
    f"Dispositivo 1: Nombre: {dispositivo_1.nombre_equipo} | IP: {dispositivo_1.direccion_ip} | ID Memoria: {id(dispositivo_1)}"
)
print(
    f"Dispositivo 2: Nombre: {dispositivo_2.nombre_equipo} | IP: {dispositivo_2.direccion_ip} | ID Memoria: {id(dispositivo_2)}"
)