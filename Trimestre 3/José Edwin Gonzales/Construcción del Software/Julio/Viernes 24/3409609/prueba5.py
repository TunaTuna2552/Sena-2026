#Abstracción
"""
La abstracción es un principio de la programación orientada a objetos que permite ocultar los detalles"""

from abc import ABC, abstractmethod
class celular(ABC):
    @abstractmethod
    def __init__(self, color, almacenamiento):
        self.color = color
        self.almacenamiento = almacenamiento

    def informacion(self):
        print(f"Color: {self.color}")
        print(f"Almacenamiento: {self.almacenamiento}")

    def encender(self):
        print("El celular está encendido.")

    def apagar(self):
        print("El celular está apagado.")

class android(celular):
    def __init__(self, color, almacenamiento):
        super().__init__(color, almacenamiento)

    def expandir_almacenamiento(self):
        print("Expandiendo almacenamiento del celular")

class iphone(celular):
    def transferir_archivos(self):
        print("Transfiriendo archivos del celular")


celular_android = android("Negro", "128GB")
celular_android.informacion()