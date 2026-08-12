/*
===================================================================
MÓDULO 7: AGREGACIÓN Y AGRUPAMIENTO - CONCEPTOS CLAVE
===================================================================

1. FUNCIONES DE AGREGACIÓN PRINCIPALES:
--------------------------------------
  - COUNT(*) / COUNT(columna) : Cuenta el total de filas. COUNT(*) incluye nulos;
                                COUNT(columna) cuenta solo celdas con datos (no nulos).
  - SUM(columna)              : Suma los valores numéricos de una columna.
  - AVG(columna)              : Calcula el promedio de una columna numérica.
  - MIN(columna)              : Encuentra el valor mínimo (sirve para números,
                                textos en orden alfabético o fechas más antiguas).
  - MAX(columna)              : Encuentra el valor máximo (números, Z-A o fechas
                                más recientes).


2. AGRUPAR DATOS (GROUP BY):
---------------------------
  Divide las filas de la tabla en subgrupos basados en los valores idénticos de
  una o varias columnas. Las funciones de agregación se calculan para cada
  grupo individualmente.


3. FILTRAR GRUPOS (HAVING vs WHERE):
-----------------------------------
  - WHERE  : Se ejecuta antes de agrupar. Filtra filas individuales. No admite
             funciones de agregación (por ejemplo, WHERE COUNT(*) > 2 da un error).
  - HAVING : Se ejecuta después de agrupar. Filtra los resúmenes calculados
             (por ejemplo, HAVING COUNT(*) > 2).
===================================================================
*/

-- -------------------------------------------------------------------
-- Ejemplo A: Funciones de agregación globales (Sin GROUP BY)
-- Enunciado: Obtener el número total de pacientes, la fecha de nacimiento más antigua
--            y la fecha de nacimiento más reciente.
-- Explicación: Al no usar GROUP BY, las funciones operan sobre toda la tabla devolviendo 1 fila.
-- -------------------------------------------------------------------

SELECT 
    COUNT(*) AS Total_Pacientes,
    MIN(fecha_nacimiento) AS fecha_nacimiento_mas_antigua,
    MAX(fecha_nacimiento) AS fecha_nacimiento_mas_reciente
FROM Pacientes;


-- -------------------------------------------------------------------
-- Ejemplo B: Agrupamiento simple (GROUP BY por una columna)
-- Enunciado: Mostrar la cantidad total de citas asignadas por cada estado ('Completada', 'Programada', etc.).
-- Explicación: SQL agrupa las filas que tienen el mismo texto en 'estado' y calcula el COUNT para cada bloque.
-- -------------------------------------------------------------------

SELECT 
    estado,
    COUNT(*) AS total_citas
FROM Citas
GROUP BY estado;


-- -------------------------------------------------------------------
-- Ejemplo C: Agrupamiento múltiple (GROUP BY por varias columnas)
-- Enunciado: Saber cuántas citas tiene cada médico desglosadas por cada estado.
-- Explicación: Crea subgrupos combinando 'id_medico' y 'estado' (Ej: Médico 1 - Completada, Médico 1 - Programada).
-- -------------------------------------------------------------------

SELECT 
    id_medico,
    estado,
    COUNT(*) AS total_citas
FROM Citas
GROUP BY id_medico, estado
ORDER BY id_medico ASC;


-- -------------------------------------------------------------------
-- Ejemplo D: Diferencia entre WHERE y HAVING (Combinados)
-- Enunciado: Mostrar únicamente los médicos que tengan más de 2 citas en estado 'Completada'.
-- Explicación:
-- 1. WHERE elimina primero las citas que no están completadas.
-- 2. GROUP BY agrupa por médico.
-- 3. HAVING descarta los médicos cuyo conteo final no supere 2.
-- -------------------------------------------------------------------

SELECT 
    id_medico,
    COUNT(*) AS citas_completadas
FROM Citas
WHERE estado = 'Completada'
GROUP BY id_medico
HAVING COUNT(*) > 2;


-- ===================================================================
-- RESOLUCIÓN DE LAS 20 CONSULTAS - MÓDULO 7
-- (AGREGACIÓN Y AGRUPAMIENTO)
-- ===================================================================