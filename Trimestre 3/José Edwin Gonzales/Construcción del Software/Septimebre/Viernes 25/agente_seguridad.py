"""
Actividad 9 - ADSO: Arquitectura de un Agente de IA
Archivo: agente_seguridad.py
Descripción: Agente reactivo simple para monitoreo y mitigación de tráfico de red.
"""

import random


class AgenteSeguridad:
    def __init__(self, nombre: str = "Sentinel-Guard"):
        """Inicializa el agente y su umbral privado de seguridad."""
        self.nombre = nombre
        # Atributo privado: Umbral crítico inaccesible desde el exterior
        self.__limite_intentos = 3

    # 1. SENSOR: Simula la captura de paquetes/tráfico entrante
    def percibir_intentos(self) -> int:
        """Detecta y retorna un número aleatorio de intentos fallidos de conexión."""
        intentos = random.randint(1, 10)
        print(f"[{self.nombre}] Sensor de red: Detectados {intentos} intentos fallidos.")
        return intentos

    # 2. CEREBRO / RAZONAMIENTO: Compara la métrica contra el umbral privado
    def razonar(self, intentos_detectados: int) -> str:
        """Determina si la dirección IP evaluada debe ser bloqueada o permitida."""
        if intentos_detectados > self.__limite_intentos:
            return "BLOQUEAR"
        return "PERMITIR"

    # 3. ACTUADOR: Ejecuta la acción en el entorno (consola/firewall)
    def actuar(self, decision: str):
        """Aplica la regla de filtrado y notifica en consola."""
        # Códigos de escape ANSI para resaltar la alerta en color rojo y verde
        COLOR_ROJO = "\033[91m"
        COLOR_VERDE = "\033[92m"
        COLOR_RESET = "\033[0m"

        if decision == "BLOQUEAR":
            print(
                f"{COLOR_ROJO}[ALERTA ROJA] [{self.nombre}] Acción: IP sospechosa BLOQUEADA. "
                f"Superó el límite de tolerancia.{COLOR_RESET}"
            )
        else:
            print(
                f"{COLOR_VERDE}[ESTADO SEGURO] [{self.nombre}] Acción: Tráfico PERMITIDO. "
                f"Nivel de intentos dentro de los parámetros normales.{COLOR_RESET}"
            )


# --- CICLO DE MONITOREO DEL AGENTE ---
if __name__ == "__main__":
    print("=" * 60)
    print(" INICIALIZANDO AGENTE DE SEGURIDAD PERIMETRAL ")
    print("=" * 60)

    # 6. Instanciación del agente y ejecución de 5 iteraciones
    agente = AgenteSeguridad("Firewall-ADSO")

    for iteracion in range(1, 6):
        print(f"\n--- [Monitoreo #{iteracion}] ---")
        trafico_percibido = agente.percibir_intentos()
        decision_tomada = agente.razonar(trafico_percibido)
        agente.actuar(decision_tomada)

    print("\n" + "=" * 60)
    print(" MONITOREO FINALIZADO CON ÉXITO ")
    print("=" * 60)