"""Disco Duro"""

class DiscoDuro:
    def __init__(self, marca: str, capacidad_gb: float, espacio_usado_gb: float):
        self.marca = marca
        self.capacidad_gb = capacidad_gb
        self.espacio_usado_gb = espacio_usado_gb
        
        # Cálculo automático del espacio libre
        self.espacio_libre_gb = capacidad_gb - espacio_usado_gb


# 1. Instanciar 2 discos duros con diferentes capacidades
disco_servidor_1 = DiscoDuro("Seagate Enterprise", 2000.0, 1450.5)
disco_servidor_2 = DiscoDuro("Western Digital Red", 4000.0, 850.0)


# 2. Mostrar datos en consola y verificar sus posiciones de memoria con hex(id())
print("--- MONITOREO DE DISCOS DUROS ---")
print(f"Disco 1 -> Marca: {disco_servidor_1.marca}")
print(f"Espacio Libre: {disco_servidor_1.espacio_libre_gb} GB")
print(f"Dirección de Memoria (HEX): {hex(id(disco_servidor_1))}\n")

print(f"Disco 2 -> Marca: {disco_servidor_2.marca}")
print(f"Espacio Libre: {disco_servidor_2.espacio_libre_gb} GB")
print(f"Dirección de Memoria (HEX): {hex(id(disco_servidor_2))}")
