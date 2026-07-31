#Operadores lógicos Lower

edad = int(input("Igrese su edad: "))
ciudadano = input("Eres ciudadano? (Si/No): ").lower()

if edad >= 18 and ciudadano == "Si":
    print("Puedes Votar")
else:
    print("No puedes votar")