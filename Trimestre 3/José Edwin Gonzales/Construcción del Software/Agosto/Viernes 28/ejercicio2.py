# Comportamiento, definición de métodos y el parámetro self


class CuentaBancaria:
    def __init__(self, titular, saldo_inicial):
        self.titular = titular
        self.saldo = saldo_inicial


# Método para mostrar información
def consulta_saldo(self):
    print(f"Titular: {self.titular} | Saldo actual: {self.saldo}")


# Método para modificar el atributo del saldo
def depositar(self, monto):
    if monto > 0:
        self.saldo += monto
        print("Depósito exitoso")
        print("El monto debe ser positivo")


# Metodo con logica de validacion


def retirar(self, monto):
    if 0 < monto <= self.saldo:
        self.saldo -= monto
        print("Retiro exitoso de ${monto}")
    else:
        print("Feondos insuficientes o monto inválido")


mi_cuenta = CuentaBancaria("Juan Pererz", 1000)
mi_cuenta.consulta_saldo()
mi_cuenta.depositar(500)
mi_cuenta.retirare(200)
mi_cuenta.consulta_saldo()


"""Desafio Practico: "Entrenando a tu Mascota
1. Retoma la clase Mascota o crea una nueva llamada Perro
2. Atributos: nombre y energia (que inicia en 100).
3. Crea un método jugar(tiempo): cada minuto de juego resta 5 de energia.
4. Crea un metodo comer(cantidad): cada gramo de comida suma 2 de energia.
5. Crea un metodo dormir(): restaura la energia a 10b.
6. Validacion: Si la energia es menor a 10, el perro no puede jugar y debe mostrar un mensaje:
"'Estoy muy cansado para jugar".
"""


class Perro: 
    def __init__(self, nombre): 
        self.nombre = nombre 
        self.energia = 100 

    def jugar(self, tiempo): 
        if self.energia < 10: 
            print(f"{self.nombre}: Estoy muy cansado para jugar.") 
            return
            
        energia_gastada = tiempo * 5 
        self.energia -= energia_gastada 
        
        if self.energia < 0: 
            self.energia = 0 
            print(f"{self.nombre} jugó por {tiempo} minutos. Energía actual: {self.energia}") 

    def comer(self, cantidad): 
        self.energia += cantidad * 2 
        if self.energia > 100: 
            self.energia = 100 
            print(f"{self.nombre} comió {cantidad} gramos. Energía actual: {self.energia}") 

    def dormir(self): 
        self.energia = 100 
        print(f"{self.nombre} durmió profundamente. Energía restaurada a: {self.energia}")

mi_perro = Perro("Argos")

mi_perro.jugar(15)
mi_perro.jugar(10)
mi_perro.jugar(5)
mi_perro.comer(20)
mi_perro.dormir()

