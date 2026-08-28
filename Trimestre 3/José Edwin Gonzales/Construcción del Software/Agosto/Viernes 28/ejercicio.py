#Método constructor

class Celular:
	def __init__(self, marca, modelo, bateria=100):
		self.marca = marca
		self.modelo = modelo
		self.pila = bateria

mi_celular = Celular("Samsung", "S24")
tu_celular = Celular("Apple", "IPhone 17", 85)

print(f'Mi celular tiene {mi_celular.pila}%')
print(f'Tu celular tiene {mi_celular.pila}%')
