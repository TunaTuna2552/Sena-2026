#Actividad 2: La Flota de Transporte (Herencia Multinivel)

"""class Vehículo:
    def __init__(self, placa, modelo):
        self.p = placa
        self.m = modelo
        print(f'La placa del vehículo es {self.p} y el modelo es {self.m}')

Vehículo("123 ABC", "Camión HINO")

class Carga(Vehículo):
    def __init__(self, capacidad_toneladas):
        self.ct = capacidad_toneladas
        print(f'Su capacidad en toneladas son {self.ct}')

Carga("5 Toneladas")

class CamionFriogorifico(Carga):
    def __init__(self, temperatura_minima):
        self.t = temperatura_minima
        print(f'La temperatura mínima a la que se debe encontrar {self.t}')

print(CamionFriogorifico("-10°C"))

Sale con mensajito raro al final
"""

class Vehículo:
    def __init__(self, placa, modelo):
        self.p = placa
        self.m = modelo

class Carga(Vehículo):
    def __init__(self, placa, modelo, capacidad_toneladas):
        Vehículo.__init__(self, placa, modelo)
        self.ct = capacidad_toneladas

class CamionFriogorifico(Carga):
    def __init__(self, placa, modelo, capacidad_toneladas, temperatura_minima):
        Carga.__init__(self, placa, modelo, capacidad_toneladas)
        self.t = temperatura_minima

    def __str__(self):
        return f"Camión {self.m} (Placa: {self.p}) | Carga: {self.ct} | Temp: {self.t}"

todo = CamionFriogorifico("123 ABC", "Camión HINO", "5 Toneladas", "-10°C")

print(todo)
