import numpy as np
import matplotlib.pyplot as plt

# Parámetros
x0, v0, a = 0, 2, 0.5
t = np.linspace(0, 20, 100)
limite_almacen = 50  # Límite físico en metros

# a) Modelo MRUA
x_mrua = x0 + v0*t + 0.5*a*t**2

# c) Validación de límites
x_final = np.clip(x_mrua, 0, limite_almacen)

# b) Graficar
plt.plot(t, x_mrua, 'r--', label="Modelo Ideal")
plt.plot(t, x_final, 'b', label="Modelo con Límite (50m)")
plt.axhline(y=limite_almacen, color='k', linestyle=':', label="Pared/Límite")
plt.xlabel("Tiempo (s)"); plt.ylabel("Posición (m)")
plt.legend(); plt.show()
