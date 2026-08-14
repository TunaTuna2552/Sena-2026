"""class EvaluacionModulo:
    def __init__(self, nombre_aprendiz, nota_1, nota_2, aprobado):
        self.nombre_aprendiz = nombre_aprendiz
        self.nota_1 = float(nota_1)
        self.nota_2 = float(nota_2)
        self.promedio = (nota_1 + nota_2) / 2. 
        self.aprobado = aprobado

evaluacion1 = EvaluacionModulo("Karol Velasco", 3.5, 5)
evaluacion2 = EvaluacionModulo("Edwin Gonzales", 1.7, 3.1)


for evaluacion in lista_asistentes:
    if evaluacion.aprobado == True:
        print(f"{asistente.nombre} se encontraba presente en el evento")




print("====== ASISTENTES DEL EVENTO ======")

lista_asistentes = [asistente1, asistente2, asistente3]

for asistente in lista_asistentes:
    if asistente.confirmado == True:
        print(f"{asistente.nombre} se encontraba presente en el evento")"""

class EvaluacionModulo:
    def __init__(self, nombre_aprendiz: str, nota_1: float, nota_2: float):
        self.nombre_aprendiz = nombre_aprendiz
        self.nota_1 = nota_1
        self.nota_2 = nota_2
        
        # Calcular el promedio de las dos notas
        self.promedio = (nota_1 + nota_2) / 2
        
        # Determinar de forma automática si el aprendiz aprobó o no
        if self.promedio >= 3.5:
            self.aprobado = True
        else:
            self.aprobado = False


# Instanciación de las dos evaluaciones requeridas

# Caso 1: Aprendiz aprobado
aprendiz_aprobado = EvaluacionModulo("Carlos Pérez", 4.0, 3.8)

# Caso 2: Aprendiz no aprobado
aprendiz_no_aprobado = EvaluacionModulo("Ana Gómez", 3.0, 2.8)


# Impresión de los resultados en consola
print(f"Aprendiz: {aprendiz_aprobado.nombre_aprendiz}")
print(f"Promedio: {aprendiz_aprobado.promedio} | ¿Aprobó?: {aprendiz_aprobado.aprobado}\n")

print(f"Aprendiz: {aprendiz_no_aprobado.nombre_aprendiz}")
print(f"Promedio: {aprendiz_no_aprobado.promedio} | ¿Aprobó?: {aprendiz_no_aprobado.aprobado}")
