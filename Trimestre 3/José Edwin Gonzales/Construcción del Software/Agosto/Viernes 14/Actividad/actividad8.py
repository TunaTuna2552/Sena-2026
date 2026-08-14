"""TiqueteAereo"""

class TiqueteAereo:
    def __init__(self, pasajero: str, vuelo: str, asiento: str, clase_ejecutiva: bool = False):
        self.pasajero = pasajero
        self.vuelo = vuelo
        self.asiento = asiento
        self.clase_ejecutiva = clase_ejecutiva
        
        # Atributo automático establecido por defecto
        self.equipaje_facturado = True


# 1. Instanciar 2 tiquetes (uno en clase económica y otro en clase ejecutiva)
tiquete_economica = TiqueteAereo("Luis Martínez", "AV244", "24C")
tiquete_ejecutiva = TiqueteAereo("Elena Rostova", "LH543", "02A", clase_ejecutiva=True)


# 2. Imprimir los pases de abordaje formateados en varias líneas
print(f"""
=========================================
          BOARDING PASS / PASE DE ABORDAJE
=========================================
Pasajero:         {tiquete_economica.pasajero}
Vuelo:            {tiquete_economica.vuelo}
Asiento:          {tiquete_economica.asiento}
Clase Ejecutiva:  {"Sí" if tiquete_economica.clase_ejecutiva else "No"}
Equipaje Fact.:   {"Incluido" if tiquete_economica.equipaje_facturado else "No incluido"}
-----------------------------------------
""")

print(f"""
=========================================
          BOARDING PASS / PASE DE ABORDAJE
=========================================
Pasajero:         {tiquete_ejecutiva.pasajero}
Vuelo:            {tiquete_ejecutiva.vuelo}
Asiento:          {tiquete_ejecutiva.asiento}
Clase Ejecutiva:  {"Sí" if tiquete_ejecutiva.clase_ejecutiva else "No"}
Equipaje Fact.:   {"Incluido" if tiquete_ejecutiva.equipaje_facturado else "No incluido"}
-----------------------------------------
""")
