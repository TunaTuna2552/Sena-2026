#Polimorfismo
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
        super(android, self).__init__(color, almacenamiento)

    def expandir_almacenamiento(self):
        print("Expandiendo el almacenamiento del celular")

class iphone(celular):
    def __init__(self, color, almacenamiento):
        super(iphone, self).__init__color, almacenamiento

    def tranferir_archivos(self):
        print("Transfiriendo archivos del celular")

celular_android = android("Negro", "128GB")
celular_android.encender()

celular_iphone = android("Negro", "256GB")
celular_iphone.encender()
celular_iphone.informacion()