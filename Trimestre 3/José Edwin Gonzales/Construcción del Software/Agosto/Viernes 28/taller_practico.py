"""#Ejercicio 1: Herencia Múltiple y Gestión de Recursos (Smartwatch)

class Reloj:
    def mostrar_hora(self):
        print("La hora actual es: 10:30 AM")

class Podometro:
    def contar_pasos(self):
        print("Pasos registrados hoy: 5000")

class Reproductor:
    def reproducir_musica(self):
        print("Reproduciendo lista de reproducción favorita")

class Smartwatch(Reloj, Podometro, Reproductor):
    def __del__(self):
        print("Ahorro de energia activado: Desconectando sensores de salud y apagando pantalla.")

mi_reloj = Smartwatch()
mi_reloj.mostrar_hora()
mi_reloj.contar_pasos()
mi_reloj.reproducir_musica()
del mi_reloj"""


#Ejercicio 2: Representación de Objetos y f-strings (Gestión de Aprendices)


class Aprendiz:
    def __init__(self, nombre: str, numero_ficha: int, programa_formacion: str, promedio: float):
        self.nombre = nombre
        self.numero_ficha = numero_ficha
        self.programa_formacion = programa_formacion
        self.promedio = promedio

    def __str__(self) -> str:
        return f"Aprendiz: {self.nombre} del programa {self.programa_formacion} (Ficha: {self.numero_ficha})."

    def __repr__(self) -> str:
        return f"Aprendiz({self.nombre!r}, {self.numero_ficha}, {self.programa_formacion!r}, {self.promedio})"

aprendiz_1 = Aprendiz(
    nombre="Cristian Fabian Tunaroza Rodríguez",
    numero_ficha=3409609,
    programa_formacion="Analisis y Desarrollo de Software",
    promedio=4.8
)

print(aprendiz_1)
print(repr(aprendiz_1))

