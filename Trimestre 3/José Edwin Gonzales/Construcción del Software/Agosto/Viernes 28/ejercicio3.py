#Herencia - Reutilizando codigo entre clases
class Persona:
    def __init__(self, nombre, documento):
        self.nombre = nombre
        self.documento = documento

    def presentarse(self):
        print(f"Hola, mi nombre es {self.nombre} y mi documento es {self.documento}")

class Instructor(Persona):
    def __init__(self, nombre, documento, area):
        #Super () Llama a contructor padre para no repetir código
        super().__init__(nombre, documento)
        self.area = area 

    def dar_clase(self):
        print(f"El intructor {self.nombre} esta dictando clases de {self.area}")

class Aprendiz(Persona):
    def __init__(self, nombre, documento, ficha):
        super().__init__(nombre, documento)
        self.ficha = ficha

    def estudiar(self):
        print(f"El aprendiz {self.nombre} de la ficha {self.ficha} esta estudiando")

profe = Instructor("Jose Gonzalez", 123456789, "Programación")
estudiante = Aprendiz("Claudia", 987654321, 3409609)

profe.presentarse()
profe.dar_clase()

estudiante.presentarse()
estudiante.estudiar()

"""
Desafio Practico: "Mundo Animal"
1. Crea una clase padre llamada Animal con el atributo nombre y un método respirar().
2. Crea una clase hija Perro que herede de Animal y tenga un metodo ladrar().
3. Crea una clase hija Pez que herede de Animal y tenga un metodo nadar().
4. Instancia un perro y un pez, y demuestra que ambos pueden llamar al método respirar(), I
pero solo el perro puede ladrar().
"""

class Animal:
    def __init__(self, nombre):
        self.n = nombre

    def respirar(self):
        print(f"{self.n} puede respirar")

class Perro(Animal):
    def __init__(self, nombre):
        super().__init__(nombre)

    def ladrar(self):
        print(f"El perrito {self.n} está ladrando")

class Pez(Animal):
    def __init__(self, nombre):
        super().__init__(nombre)

    def nadar(self):
        print(f"El pecesito {self.n} sabe  nadar")

chandoso = Perro("Argos")
mojarra = Pez("Nemo")

chandoso.respirar()
chandoso.ladrar()
mojarra.respirar()
mojarra.nadar()