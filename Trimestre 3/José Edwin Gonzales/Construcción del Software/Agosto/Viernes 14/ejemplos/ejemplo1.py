class Aprendiz:
    pass #Se usa para definir que la clase está vacia 


#Creas una instancia con un objeto de la clas aprendiz
aprendiz_1 = Aprendiz()
aprendiz_2 = Aprendiz()

print(f"Obejto 1: {aprendiz_1}")
print(f"Objeto_2: {aprendiz_2}")

aprendiz_1.nombre = "Juan"
aprendiz_1.ficha = 3409609

print(f"El aprendiz {aprendiz_1.nombre} pertenece a la ficha: {aprendiz_1.ficha} ")