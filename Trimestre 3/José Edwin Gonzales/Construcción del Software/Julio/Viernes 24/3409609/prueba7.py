#Encapsulamiento
"""
El encapsulamiento es la capacidad de un objeto paara ocultar parte de su estado y comportamiento de otros objetos, exponiendo solo una clase limitada al resto de programa.
"""
from abc import ABC, abstractmethod

class celular(ABC):
    @abstractmethod
    def __init__(self, color, almacenamiento):
        self.__color = color
        self.__almacenamiento = almacenamiento
        self.__volumen = 5

    def informacion(self):
        print(f"Color: {self.__color}")
        print(f"Almacenamiento: {self.__almacenamiento}")
        print(f"Nivel del volumen: {self.__volumen}")

    def subir_volumen(self):
        self.__volumen +=1
        print(f"Nivel del volumen es: {self.__volumen}")

    def bajar_volumen(self):
        self.__volumen -=1
        print(f"Nivel del volumen es: {self.__volumen}")
    

    def encender(self):
        print("El celular está encendido.")

    def apagar(self):
        print("El celular está apagado.")

    def obtener_volumen(self):
        return self.__volumen

    @property
    def volumen(self):
        return self.__volumen

    @volumen.setter
    def volumen(self, valor):
        self.__volumen = valor

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

    def informacion(self):
        return super(iphone, self).informacion()

    def encender(self):
        return super(iphone, self).encender()

    def apagar(self):
            return super(iphone, self).apagar()


"""
celular_android = android("Negro", "128GB")
celular_android.encender()
"""
celular_iphone = android("Blanco", "256GB")

"""celular_iphone.encender()
celular_iphone.informacion()
celular_iphone.color = "Azul"
celular_iphone.informacion()
print(celular_iphone.obtener_volumen())
"""

celular_iphone.volumen = 12
print(celular_iphone.volumen)