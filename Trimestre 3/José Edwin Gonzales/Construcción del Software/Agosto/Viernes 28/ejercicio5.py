#Concepto __sts__ y __repr__

class AprendizSena:
    def __init__(self, nombre:str, documento:str, ficha:int):
        self.nombre = nombre
        self.documento = documento
        self.ficha = ficha

    def __str__(self):
        return f"Aprendiz: {self.nombre} | Ficha: {self.ficha}"

    def __repr__(self):
        return f"Aprendiz: {self.nombre!r}, {self.documento!r}, {self.ficha!r}"

    @classmethod
    def desde_cvs(cls, linea_csv:str):
        nombre,documento,ficha = linea_csv.split(",")
        return cls(nombre.strip(),documento.strip(),int(ficha.strip()))

#Uso de la clase
aprendiz1 = AprendizSena("Laura Gomez", "123456789", 3409609)
print(str(aprendiz1)) # Muestra una versión informal
print(repr(aprendiz1)) # Muestra una versión técnica

#Creación mediante el método de clase
aprendiz2 = AprendizSena.desde_cvs("Carlos Ruiz, 123456789, 3409609")
print(aprendiz2)