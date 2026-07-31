


-- ============================================================================
-- ORDEN, LÍMITES Y UNICIDAD
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TEMA 1: ORDENAMIENTO SIMPLE (ORDER BY - ASC / DESC)
-- ----------------------------------------------------------------------------

-- Ejemplo 1.1: Ordenamiento Ascendente implícito y explícito (A-Z, Menor a Mayor)
-- Enunciado: Mostrar los pacientes ordenados alfabéticamente por apellido.
-- Explicación: Por defecto, 'ORDER BY' ordena de forma Ascendente (ASC) de la A a la Z.

SELECT * FROM Pacientes
ORDER BY apellido ASC;

-- Explicación: 'DESC' invierte el orden, colocando los valores mayores (o fechas más recientes) primero.

SELECT * FROM Citas
ORDER BY fecha_hora DESC;


-- ----------------------------------------------------------------------------
-- TEMA 2: ORDENAMIENTO MÚLTIPLE (Múltiples Columnas)
-- ----------------------------------------------------------------------------

-- Ejemplo 2.1: Criterio principal y secundario en la misma dirección
-- Enunciado: Listar los pacientes ordenados por apellido (A-Z) y luego por nombre (A-Z).
-- Explicación: Si dos personas comparten el mismo apellido, SQL usa el nombre para desempatar.

SELECT * FROM Pacientes
ORDER BY apellido ASC, nombre ASC;

-- Ejemplo 2.2: Criterios con direcciones opuestas (ASC y DESC mezclados)
-- Enunciado: Ordenar médicos por su id_especialidad (1 a 6) y luego por su apellido (Z a A).
-- Explicación: Los ordena primero por la especialidad en orden ascendente, y dentro de cada
--              especialidad los desempata por el apellido en orden descendente.

SELECT * FROM Medicos
ORDER BY id_especialidad ASC, apellido DESC;


-- ----------------------------------------------------------------------------
-- TEMA 3: LIMITAR RESULTADOS (LIMIT / TOP / FETCH FIRST)
-- ----------------------------------------------------------------------------

-- Ejemplo 3.1: Estándar MySQL / PostgreSQL / SQLite (Uso de LIMIT)
-- Enunciado: Obtener los 3 pacientes más jóvenes de la clínica.
-- Explicación: Combina 'ORDER BY' descendente por fecha para tener primero a los más jóvenes
--              y frena la salida en las primeras 3 filas.

SELECT * FROM Pacientes
ORDER BY fecha_nacimiento DESC
LIMIT 3;

-- Ejemplo 3.2: Sintaxis SQL Server (Uso de TOP)
-- Enunciado: La misma consulta equivalente para motores Microsoft SQL Server.
-- Explicación: 'TOP 3' se escribe inmediatamente después del SELECT.

-- SELECT TOP 3 * FROM Pacientes ORDER BY fecha_nacimiento DESC;

-- Ejemplo 3.3: Sintaxis Estándar ANSI / Oracle (Uso de FETCH FIRST)
-- Enunciado: La misma consulta equivalente según el estándar oficial ANSI SQL.
-- Explicación: Se agrega al final de la consulta 'FETCH FIRST N ROWS ONLY'.

-- SELECT * FROM Pacientes ORDER BY fecha_nacimiento DESC FETCH FIRST 3 ROWS ONLY;


-- ----------------------------------------------------------------------------
-- TEMA 4: PAGINACIÓN DE RESULTADOS (LIMIT + OFFSET)
-- ----------------------------------------------------------------------------

-- Ejemplo 4.1: Primera Página (Página 1 de 5 registros)
-- Enunciado: Obtener los primeros 5 pacientes del listado.
-- Explicación: 'OFFSET 0' indica que no se salta ninguna fila, empieza desde el inicio.

SELECT * FROM Pacientes
ORDER BY id_paciente ASC
LIMIT 5 OFFSET 0;

-- Ejemplo 4.2: Segunda Página (Página 2 de 5 registros)
-- Enunciado: Obtener del registro 6 al 10 en la paginación de pacientes.
-- Explicación: 'OFFSET 5' le dice a SQL que ignore los primeros 5 resultados ya vistos.

SELECT * FROM Pacientes
ORDER BY id_paciente ASC
LIMIT 5 OFFSET 5;

-- Ejemplo 4.3: Tercera Página (Página 3 de 5 registros)
-- Enunciado: Obtener del registro 11 al 15.
-- Explicación: La fórmula es OFFSET = (Número_Pagina - 1) * Tamaño_Pagina.
--              Página 3 ---> (3 - 1) * 5 = OFFSET 10.

SELECT * FROM Pacientes
ORDER BY id_paciente ASC
LIMIT 5 OFFSET 10;


-- ----------------------------------------------------------------------------
-- TEMA 5: ELIMINACIÓN DE DUPLICADOS (DISTINCT)
-- ----------------------------------------------------------------------------

-- Ejemplo 5.1: Distinct sobre una sola columna
-- Enunciado: Obtener la lista de los distintos estados de cita registrados (sin repeticiones).
-- Explicación: Evalúa la columna 'estado' y colapsa los miles de valores repetidos a solo sus valores.

SELECT DISTINCT estado FROM Citas;

-- Ejemplo 5.2: Distinct sobre múltiples columnas
-- Enunciado: Obtener la lista única de médicos que han atendido a qué pacientes.
-- Explicación: Evalúa la combinación de 'id_medico' + 'id_paciente'. Si el Médico 1 atendió
--              3 veces al Paciente 1, esa pareja solo aparecerá 1 sola vez en el resultado.

SELECT DISTINCT id_medico, id_paciente FROM Citas;


-- ----------------------------------------------------------------------------
-- TEMA 6: COMBINANDO TODO EL MÓDULO 4 (WHERE + DISTINCT + ORDER BY + LIMIT)
-- ----------------------------------------------------------------------------

-- Ejemplo 6.1: Consulta avanzada combinada
-- Enunciado: Obtener las 3 fechas únicas más recientes en las que el Médico ID 1
--            atendió citas con estado 'Completada'.
-- Explicación: 1. Filtra con WHERE las citas completadas del médico 1.
--              2. Extrae solo los valores únicos con DISTINCT.
--              3. Ordena descendentemente con ORDER BY para ver lo más reciente primero.
--              4. Recorta el resultado final a los primeros 3 registros con LIMIT.

SELECT DISTINCT fecha_hora FROM Citas
WHERE id_medico = 1 AND estado = 'Completada'
ORDER BY fecha_hora DESC
LIMIT 3;