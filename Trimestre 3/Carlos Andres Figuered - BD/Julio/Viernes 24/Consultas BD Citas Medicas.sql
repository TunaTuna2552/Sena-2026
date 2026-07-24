-- ============================================================================================
-- FILTRADO Y OPERADORES
-- ============================================================================================

# 1. Operadores de comparación
# Comparan una columna contra un valor (texto, número o fecha):

# = Igual 
# <> o != Diferente de
# > Mayor que
# < Menor que
# >= Mayor o igual que
# <= Menor o igual que

# 2. Operadores Lógicos
# Combinan múltiples reglas dentro de un mismo WHERE

# AND: Exige que todas las condiciones sse cumplan al mismo tiempo
# OR Permite que se cumpla al menos una de las condiciones
# NOT: Invierte el resultado de una condición

# 3. Prioridad de Operadores con Paréntesis ( )
# Al igual que en las matemáticas, los paréntesis fuerzan que condición debe evaluarse primero.


# Regla de oro: Sin paréntesis, SQL siempre evalua el AND anetes que el OR.
# Los paréntesis rompen esa regla y evitan errores graves de filtrado.alter

-- --------------------------------------------------------------------------------------------
-- Ejemplo A: Usso del operador lógico AND
-- Enunciado: Encontrar las citas que estén completadas y que correspondan al médico con ID 1
-- Explicación: Ambas ccondiciones deben ser verdaderas a la vez. Si el estado es 'Completada' pero el médico es el ID 2, la fila se descarta
-- --------------------------------------------------------------------------------------------

SELECT * FROM Citas
WHERE estado = 'Completada' AND id_medico = 1;

-- --------------------------------------------------------------------------------------------
-- Ejemplo B: Uso del operador lógico OR
-- Enunciado: Ver las citas que representen probllemas de asistencia (canceladas O no asistió).
-- Explicación:  Traerá cualquier fila donde se cumpla al menos una de las dos opciones
-- --------------------------------------------------------------------------------------------

SELECT * FROM citas
WHERE estado = 'Cancelada' OR estado = 'No asistió';

-- --------------------------------------------------------------------------------------------
-- Ejemplo C: La trampa de no usar Paréntesis ( )
-- Enunciado: Buscar citas del médico 1 O del médico 3 Y que estén completadas
-- --------------------------------------------------------------------------------------------
-- FORMA INCORRECTA (Produce reusltados no deseados)
SELECT * FROM Citas
WHERE id_medico = 1 OR id_medico = 3 AND estado = 'Completado';

-- FORMA CORRECTA (Usando paréntesis para forzar el agripamiento del OR primero)
SELECT * FROM Citas
WHERE (id_medico = 1 OR id_medico = 3) AND estado = 'Completado';

-- --------------------------------------------------------------------------------------------
-- Ejemplo D: Uso del operador lógico NO con fechas
-- Enunciado: Ver todos los pacientes EXCEPTO los qeue nacieron en la decada de los 80.
-- Explicación: El 'NOT' invierte la condición completa entre paréntesis, devolviendo unicamente a los naciedos antes de 1980 o a partir de 1990.
-- --------------------------------------------------------------------------------------------

SELECT * FROM Pacientes
WHERE NOT (fecha de naciemiento >= '1980-01-01' AND fecha_nacimiento <= '1989-12-31');

-- --------------------------------------------------------------------------------------------
-- Ejemplo E: Operador diferente
-- Enunciado: Ver las citas que representen probllemas de asistencia (canceladas O no asistió).
-- General: (ID 1)
-- Explicación: Filtra excluyendo un valor exacto.
-- --------------------------------------------------------------------------------------------





