def suma(valor_a = 5, valor_b =2):
    resultado = valor_a + valor_b
    return resultado

print(suma(12,10))

"Poliformos"
from abc import ABC, abstractmethod

class celular(ABC):
    @abstractmethod
    def __inint__(self, color, almacenamiento):
        self.__color = color
        self.__almacenamiento = almacenamiento
        self.volumen = 5

    def informacion(self):
        print(f"__color: {self.__color}")

    def encender(self):
        print("Encendido celular")

    def apagado(self):
        print("Apagando celular")

class android(celular):
    def informacion(self):
        print(f"El __color: {self.__color}")
        print(f"El __almacenamiento: {self.__almacenamiento}")
        print(f"Nivel de volumen: {self.volumen}")

    def encender(self):
        print("Encendido celular")

    def apagado(self):
        print("Apagando celular")

    def subir_volumen(self):
        self.volumen +=1
        print(f"Nivel de volumen actual: {self.volumen}")

class iphone(celular):
    def __inint__(self, color, almacenamiento):
        super(iphone, self).__init____color(color, almacenamiento)

    def informacion(self):
        super(iphone, self).informacion()

    def encender(self):
        super(iphone, self).encender()

    def apagar(self):
        super(iphone, self).apagado()


    def transferir_informacion(self):
        print("Transfieriendo archivos a la computadora")


celular_android = android("Rojo", 128)
celular_android.informacion()
celular_android.____color = "Azul"
celular_android.____almacenamiento = 128
celular_android.subir_volumen


"""
celular_iphone = iphone("Azul", 128)
celular_iphone.informacion8()"""