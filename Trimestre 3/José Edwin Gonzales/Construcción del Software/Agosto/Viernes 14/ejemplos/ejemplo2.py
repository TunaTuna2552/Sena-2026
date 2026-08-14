class Celular:
    #El contructor define qué necesita el objeto para existir
    def __init__(self, marca, modelo, bateria=100):
        self.marca = marca      #Atributos de instancia
        self.modelo = modelo
        self.bateria = bateria
        print(f"Se ha fabricado un {self.marca}, un {self.modelo} de {self.bateria}")

#Ahora creamos los objetos pasando los datos entre paréntesis
mi_celular = Celular("VIVO", "X300 ULTRA")
tu_celular = Celular("OPPO", "FIND X9 ULTRA", 95)
print(f"Mi bateria: {mi_celular.bateria}")
print(f"Tu bateria: {tu_celular.bateria}")