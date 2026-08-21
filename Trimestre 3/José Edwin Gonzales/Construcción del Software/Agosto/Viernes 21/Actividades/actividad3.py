#Herencias Multiples
class Telefono:
    def __init__(self):
        pass

    def llamar(self):
        print("Llamando")

    def ocupado(self):
        print("Ocupado")

class Camara:
    def _init_(self):
        pass

    def fotografia(self):
        print("Tomando fotos")

class Reproduccion:
    def init_(self):
        pass

    def reproduccionmusica(self):
        print("Reproduciendo Musica")

    def reproducirvideo(self):
        print("Reproduciendo Video")


class smartphone(Telefono, Camara, Reproduccion):
    def __del__(self):
        print("Telefono Apgado")

movil = smartphone()
print(movil.fotografia())
print(movil.llamar())