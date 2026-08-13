# Código con violaciones a PEP 8 para prueba de auditoría
class mi_clase_sena:
 def __init__(self, nombre, ficha):
 self.nombre = nombre
 self.ficha = ficha
aprendiz1 = mi_clase_sena("Juan", 2871234)
print(aprendiz1.nombre)

# Código corregido bajo el estándar PEP 8
class MiClaseSena:
    def __init__(self, nombre: str, ficha: int):
        self.nombre = nombre
        self.ficha = ficha
aprendiz1 = MiClaseSena("Juan", 2871234)
print(aprendiz1.nombre)
