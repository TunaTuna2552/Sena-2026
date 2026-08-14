class AsistenteEvento:
    def __init__(self, nombre, correo, rol, confirmado = False):
        self.nombre = nombre
        self.correo = correo
        self.rol = rol
        self.confirmado = confirmado


asistente1 = AsistenteEvento("Karol Velasco", "karolvelasco@gmail.com", "Aprendiz", True)
asistente2 = AsistenteEvento("Edwin Gonzales", "edwingonzales@gmail.com", "Instructor", True)
asistente3 = AsistenteEvento("Cristian Tunaroza", "cristiantunaroza@gmail.com", "Aprendiz")

print("====== ASISTENTES DEL EVENTO ======")

lista_asistentes = [asistente1, asistente2, asistente3]

for asistente in lista_asistentes:
    if asistente.confirmado == True:
        print(f"{asistente.nombre} se encontraba presente en el evento")