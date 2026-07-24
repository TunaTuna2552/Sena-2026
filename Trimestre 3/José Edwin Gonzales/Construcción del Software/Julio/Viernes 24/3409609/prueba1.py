class celular():
    variable_ejemplo = "Ejemplo"
    def __init__(self,color):
        self.color = color

    def encender(self, contrasena):
        print(f"Encendido Celular lacontraeña es: {contrasena}")
        print(self.color)

    def apagar(self):
        print("El celular está apagado")


#celular_blanco = celular("blanco")
#celular_azul = celular("azul")
#celular_negro = celular("negro")

#print(celular_blanco.color)
#celular_blanco.encender()


objeto_celular = celular("Blanco")
print(objeto_celular.color)
objeto_celular.encender("2345")