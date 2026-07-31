#Funciones condicionales anidadas
numero = int(input("Escribe un número: "))

if numero > 10:
    print("El número es mayor a 10")
    if numero > 30:
        print("Además el número el mayor a 30")
    elif numero > 20:
        print("Además el número es mayor que 20")
        if True:
            print("Linea de ejemplo")
    else:
        print("Además el número es menor que 21")
else:
    print("El numero es menor que 10")