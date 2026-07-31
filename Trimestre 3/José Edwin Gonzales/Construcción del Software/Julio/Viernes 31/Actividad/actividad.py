#1. Verificar si un número es positivo y menor que 100

"""num = int(input("Ingresa un número: "))

if num <= 0:
    print("Tu número es negativo o cero")
elif num > 0 and num < 100:
    print("Tu número es positivo y menor que 100")
elif num == 100:
    print("Tu número es 100")
else:
    print("Tun número es mayor que 100")"""


#2. Determinar si una persona es mayor de edad o menor

"""mayoriaEdad = 18

edad = int(input("Ingresa tu edad: "))


if edad > mayoriaEdad:
    print("La persona es mayor de edad")
elif edad == mayoriaEdad:
    print("La persona tiene 18 años")
elif edad < mayoriaEdad:
    print("La persona es menor de edad")"""


#3. Verificar si un número es par y mayor que 50

"""num = int(input("Ingresa un número: "))

if num%2 == 0:
    print("Tu número es par")
    if num > 50:
        print("Tu número es mayor que 50")
    else:
        print("Tu número es menor que 50")
else:
    print("Tu número no es par")
    if num > 50:
        print("Tu número es mayor que 50")
    else:
        print("Tu número es menor que 50")"""


#4. Comprobar si un número está entre 10 y 20 o entre 30 y 40

"""num = int(input("Ingresa un número: "))

if num > 10 and num < 20:
    print("Tu número se encuentra entre 10 y 20")
elif num > 30 and num < 40:
    print("Tu número se encuentra entre 30 y 40")
else:
    print("Tu número no se encuetra entre 10 y 20 ni entre 30 y 40")"""


#5. Validar si un usuario y contraseña son correctos

"""print("Crea una cuenta nueva, después de eso, valida tu usuario y contraseña")

usuario = input("Crea un nombre de usuario: ")
contraseña = input("Crea una contraseña: ")

print("Ahora vamos a validar tu usuario y tu contraseña")

val_u = input("Ingresa nuevamente tu usuario: ")
val_c = 0

if val_u == usuario:
    val_c = input("Ingresa tu contraseña: ")
    if contraseña == val_c:
        print("Felicidades, tu usuario y contraseña son correctos")
    else:
        print("Tu contraseña es incorrecta. Lo sentimos pero no pudimos validar tu cuenta") #Seria bonito usar un bucle para que le diera la oportunidad de volver a tratar 
else:
    print("Usuario incorrecto. Lo sentimos pero no podemos validar tu cuenta")"""


#val_u = print("Ingresa nuevamente tu usuario: ")
#val_c = input("Ingresa tu contraseña: ")
#if val_u == usuario and contraseña == val_c:
    #print("Tu usuario y contraseña con correctos :D")
    #Versión floja


#6. Determinar si un número no está en un rango de 1 a 100

num = int(input("Ingresa un número: "))

if (num > 1) and (num < 100):
    print("Tu número se encuentra en el rango de 1 a 100")
else:
    print("Tú número no se encuentra en el rango del 1 al 100")

#Este sinceramente no quedó al pie de la letra del enunciado


#7. Verificar si una letra ingresada es vocal

"""letra = input("Ingresa una letra: ").lower()

if letra == "a" or letra == "e" or letra == "i" or letra == "o" or letra == "u":
    print("Tu letra es una vocal")
else:
    print("Tu letra no es una vocal")"""


#8. Comprobar si una persona puede votar (mayor de 18 años y ciudadano)

"""edad = int(input("Igrese su edad: "))
ciudadano = input("Eres ciudadano? (Si/No): ").lower()

if edad >= 18 and ciudadano == "si":
    print("Puedes Votar")
else:
    print("No puedes votar")"""


#9. Valiar si un número es mútiplo de 3 o de 5

"""num = int(input("Ingresa un número: "))

if num%3 == 0:
    print("Tu número es múltiplo de 3")
elif num%5 == 0:
    print("Tu número es múltiplo de 5")
else:
    print("Tu número no es múltiplo de 3 ni múltiplo de 5")"""


#10. Evaluar si dos números ingresados son iguales o su suma es mayor a 100

"""num1 = int(input("Ingresa un número: "))
num2 = int(input("Ingresa un número: "))

if num1 == num2:
    print("Los dos números son iguales")
elif num1 + num2 > 100:
    print("La suma de los números es mayor a 100")
else:
    print("Los números ni son iguales ni su suma da 100")"""