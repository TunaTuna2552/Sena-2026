#Realizar una calculadora 

class Calculadora:
    def __init__(self, numero):
        self.n = numero
        self.datos = [0 for i in range(numero)]

    def ingresarDatos(self):
        self.datos = [int(input("Ingresar datos: "+str(i+1)+ "=" for i in range (self.n)))]

class OpBasicas(Calculadora):
    def __init__(self):
        Calculadora.__init__(self,3)

    def suma(self):
        a,b,c, = self.datos
        s = a + b + c
        print("El resutado de la suma es: ", s)

    def resta(self):
        a,b, = self.datos
        r = a - b
        print("El resutado de la resta es ", r)

    class raiz(Calculadora):
        def __init__(self):
            Calculadora.__init_(self,1)

        def cuadrada(self):
            import math
            a, = self.datos
            print("El resultado de la Raiz es: ", math.sqrt(a))


ejemplo = OpBasicas()
print(ejemplo.ingresarDatos())
print(ejemplo.suma())
print(ejemplo.resta())
print(ejemplo.cuadrada())