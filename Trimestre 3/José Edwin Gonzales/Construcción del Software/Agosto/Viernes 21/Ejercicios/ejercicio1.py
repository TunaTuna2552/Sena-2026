#Actividad 1: Sistema de Gestión de Talento Humano (Herenci Simple)


"""class Colaborador:
    def __init__(self, nombre, cedula, salario_base):
        self.n = nombre
        self.c = cedula
        self.s = salario_base

    def ingresarDatos(self):
        self.datos[self.n] = input("Ingrese el nombre del colaborador: ")
        self.datos[self.c] = int("Ingrese el número de documento del colaborador: ")
        self.datos[self.s] = int("Ingrese el salario base de Colaborador: ")

    def mostrar_datos(self):
        print('Ficha básica del empleado:')
        print(f'Nombre del colaborador: {self.n}')
        print(f'El número de documento del colaborador es: {self.c}')
        print(f'El salario base del colaborador es: {self.s}')

class Vendedor(Colaborador):
    def __init__(self, comision):
        self.porcentaje = comision

    def calcular_pago_total(self):
        total = self.s + self.porcentaje"""


class Colaborador:
    def __init__(self, nombre, cedula, salario_base):
        self.nombre = nombre
        self.cedula = cedula
        self.salario_base = salario_base

    def mostrar_datos(self):
        return f"Empleado: {self.nombre} | Cédula: {self.cedula} | Salario Base: ${self.salario_base}"


class Vendedor(Colaborador):
    def calcular_pago_total(self, comision):
        total = self.salario_base + comision
        return f"{self.nombre} recibirá a fin de mes un total de: ${total}"


nuevo_vendedor = Vendedor("Carlos Pérez", "1020304050", 1300000)

print(nuevo_vendedor.mostrar_datos())
print(nuevo_vendedor.calcular_pago_total(350000))