#Crear una nueva clase a partir de una o mas clases existentes

class pokemon:
    def __init__(self, nombre, tipo):
        self.nombre = nombre
        self.tipo = tipo
        
    def descripcion(self):
        return f'{self.nombre} Es un pokemon de tipo: {self.tipo}'

class pikachu(pokemon):
    
    def ataque(self, tipoataque):
        return f'{self.nombre} Tipo de ataque: {tipoataque}'
    
class charmander(pokemon):
    
    def ataque(self, tipoataque):
        return f'{self.nombre} Tipo de ataque: {tipoataque}'
    
    
nuevo_pokemon = pikachu("body", "Electrico")
print(nuevo_pokemon.descripcion())
print(nuevo_pokemon.ataque("Impacto trueno"))