from abc import ABC, abstractmethod

class animales(ABC):
    @abstractmethod
    def __init__(self, perros, croquetas):
        self.perros = perros
        self.croquetas = croquetas

    def informacion(self):
        print(f"Perros: {self.perros}, Croquetas: {self.croquetas}")

class Refugio(animales):
    def __init__(self, perros, croquetas):
        super().__init__(perros, croquetas)



refugio = Refugio(135, 0)

print(refugio.perros)

refugio.perros = 160

refugio.croquetas = refugio.perros

print(f"Perros: {refugio.perros}, Croquetas: {refugio.croquetas}")

refugio.perros = 300
print(f"Perros: {refugio.perros}, Croquetas: {refugio.croquetas}")