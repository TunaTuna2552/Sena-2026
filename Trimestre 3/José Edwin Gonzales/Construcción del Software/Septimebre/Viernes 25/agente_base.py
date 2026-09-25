import random

class AgenteClima:
    def __init__(self, nombre: str):
        self.nombre = nombre
        self.energia = 100
        # Atributo privado de seguridad para encapsulamiento
        self.__temperatura_umbral = 35

    # 1. SENSOR: Percibe el entorno
    def percibir_temperatura(self) -> int:
        temp = random.randint(15, 45)
        print(f"[{self.nombre}] Percibiendo temperatura ambiente: {temp}°C")
        return temp

    # 2. RAZONAMIENTO: Evalúa la lectura contra el umbral privado
    def razonar(self, temp_actual: int) -> str:
        if temp_actual > self.__temperatura_umbral:
            return "ESPERAR"
        else:
            return "EXPLORAR"

    # 3. ACTUADOR: Modifica el estado del agente según la decisión
    def actuar(self, decision: str):
        if decision == "EXPLORAR":
            self.energia -= 10
            print(f"[{self.nombre}] Acción: Explorando zona segura. Energía restante: {self.energia}")
        else:
            print(f"[{self.nombre}] Acción: Clima peligroso. Agente en modo espera.")

# --- CICLO DE VIDA DEL AGENTE ---
if __name__ == "__main__":
    robot = AgenteClima("Wall-E")
    
    for hora in range(3):
        print(f"\n--- Hora {hora + 1} ---")
        ambiente = robot.percibir_temperatura()
        decision = robot.razonar(ambiente)
        robot.actuar(decision)