class celular:
    def __init__(self, color, almacenamiento):
        self.color = color
        self.almacenamiento = almacenamiento

    def informacion(self):
        print(f"Color: {self.color}")
        print(f"Almacenamiento: {self.almacenamiento}")

    def encender(self):
        print("Encendiento celular")

    def apagar(self):
        print("Apagando celular")

class Android(celular):
    def expandir_almacenamiento(self):
        print("Expandiendo almacenamiento del celular")

class iphone(celular):
    def transferir_archivos(self):
        print("Transfiriendo archivos del celular")

celular_android = Android("Negro", "128GB")
celular_android.expandir_almacenamiento()

celular_android.informacion()

celular_iphone = iphone("Blanco", "256GB")
celular_iphone.transferir_archivos()
celular_iphone.informacion()