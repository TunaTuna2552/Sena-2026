#Metodos de Clases y Estaticos
class CalculadoraFinanciera:
    # Atributo de clase (compartido por todas las operaciones)
    conteo_operaciones = 0

    #Método de clases
    @classmethod
    def registrar_operacion(cls):
        # Modifica el.atributo de clase usando .cls
        cls.conteo_operaciones += 1

    #Método estático
    @staticmethod
    def convertir_dolar_a_cop(dolares):
        # Funcion estatica pura: no recibe ni self ni cls
        tasa_fija = 3169
        return dolares * tasa_fija

# Prueba de Funcionamiento
if __name__ == "__main__":
    print(" --- 1. USO DE MÉTODO ESTÁTICO (Sin instanciar) --- ")
    monto_dolares = 146
    resultado_cop = CalculadoraFinanciera.convertir_dolar_a_cop(monto_dolares)
    print(f"${monto_dolares} USD equivalen a ${resultado_cop:,.0f} COP.")

    print("\n --- 2. USO DE METODO DE CLASE (Sin instanciar) --- ")
    # Llamamos al método de clase dos veces directamente desde la Clase
    CalculadoraFinanciera.registrar_operacion()
    CalculadoraFinanciera.registrar_operacion()

    print(f"Total de operaciones registradas globalmente: {CalculadoraFinanciera.conteo_operaciones}")