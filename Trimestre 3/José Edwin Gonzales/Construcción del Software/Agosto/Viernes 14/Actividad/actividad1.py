class VehiculoParqueadero:
    def __init__(self, placa, tipo_vehiculo, hora_ingreso, cobrado = False):
        self.placa = placa
        self.tipo_vehiculo = tipo_vehiculo
        self.hora_ingreso = hora_ingreso
        self.cobrado = cobrado
        print(f"Tu vehículo es un {tipo_vehiculo} de placa {placa} que ingresó a las {hora_ingreso} y actualmnete su cobro es {cobrado}")


carro1 = VehiculoParqueadero("ABC 123", "un Carro Ford", "14:00")
carro2 = VehiculoParqueadero("CBA 321", "un Carro KIA PICANTO", "09:00", True)
moto = VehiculoParqueadero("ABC 12D", "una moto YAMAHA", "23:00")


"""
carro1.placa = "ABC 123"
carro1.tipo_vehiculo = "Ford"
carro1.hora_ingreso = "14:00"

carro2.placa = "CBA 321"
carro2.tipo_vehiculo = "KIA PICANTO"
carro2.hora_ingreso = "09:00"
carro2.cobrado = True

moto.placa = "ABC 12D"
moto.tipo_vehiculo = "YAMAHA"
moto.hora_ingreso = "23:00"
"""
