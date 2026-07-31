-- ============================================================================
-- 1. CONSULTAS DE ORDENAMIENTO Y UNICIDAD EN PACIENTES
-- ============================================================================

-- Obtener todos los pacientes ordenados alfabéticamente por apellido (ASC)
SELECT * FROM Pacientes
ORDER BY apellido ASC;

-- Obtener todos los pacientes ordenados alfabéticamente por nombre (DESC)
SELECT * FROM Pacientes
ORDER BY nombre DESC;

-- Mostrar pacientes ordenados por fecha de nacimiento de mayor a menor edad
SELECT * FROM Pacientes
ORDER BY fecha_nacimiento ASC;

-- Obtener los 5 primeros pacientes registrados según id_paciente
SELECT * FROM Pacientes
ORDER BY id_paciente ASC
LIMIT 5;

-- Obtener los 3 pacientes más viejos de la clínica
SELECT * FROM Pacientes
ORDER BY fecha_nacimiento ASC
LIMIT 3;

-- Paginación: Mostrar Página 3 de pacientes (4 registros por página -> OFFSET = (3-1)*4 = 8)
SELECT * FROM Pacientes
ORDER BY id_paciente ASC
LIMIT 4 OFFSET 8;


-- ============================================================================
-- 2. ORDENAMIENTO Y UNICIDAD EN MÉDICOS Y ESPECIALIDADES
-- ============================================================================

-- Mostrar todas las especialidades ordenadas alfabéticamente por su nombre
SELECT * FROM Especialidades
ORDER BY nombre ASC;

-- Mostrar todos los médicos ordenados por apellido (A-Z) y luego por nombre (A-Z)
SELECT * FROM Medicos
ORDER BY apellido ASC, nombre ASC;

-- Obtener los últimos 3 médicos registrados descendentemente por id_medico
SELECT * FROM Medicos
ORDER BY id_medico DESC
LIMIT 3;

-- Obtener la lista de IDs de especialidad únicos asignados actualmente a algún médico
SELECT DISTINCT id_especialidad FROM Medicos;


-- ============================================================================
-- 3. ORDENAMIENTO, LÍMITES Y UNICIDAD EN CITAS
-- ============================================================================

-- Mostrar todas las citas ordenadas cronológicamente (más antigua a más reciente)
SELECT * FROM Citas
ORDER BY fecha_hora ASC;

-- Mostrar lista de IDs de médicos únicos que tienen al menos una cita agendada
SELECT DISTINCT id_medico FROM Citas;

-- Mostrar lista de IDs de pacientes únicos que tienen al menos una cita agendada
SELECT DISTINCT id_paciente FROM Citas;

-- Obtener las 5 citas más recientes que tengan el estado 'Completada'
SELECT * FROM Citas
WHERE estado = 'Completada'
ORDER BY fecha_hora DESC
LIMIT 5;

-- Obtener las 3 primeras citas en estado 'Programada', de la más cercana a la más lejana
SELECT * FROM Citas
WHERE estado = 'Programada'
ORDER BY fecha_hora ASC
LIMIT 3;

-- Obtener las citas del paciente ID 1 ordenadas de la más reciente a la más antigua
SELECT * FROM Citas
WHERE id_paciente = 1
ORDER BY fecha_hora DESC;

-- Obtener la lista de combinaciones únicas de id_medico e id_paciente en Citas
SELECT DISTINCT id_medico, id_paciente FROM Citas;


-- ============================================================================
-- 4. ORDENAMIENTO Y LÍMITES EN HISTORIALES_MEDICOS
-- ============================================================================

-- Mostrar todos los historiales médicos ordenados por fecha_registro descendente
SELECT * FROM Historiales_Medicos
ORDER BY fecha_registro DESC;

-- Obtener el primer registro histórico de la tabla (fecha de registro más antigua)
SELECT * FROM Historiales_Medicos
ORDER BY fecha_registro ASC
LIMIT 1;

-- Obtener los 3 últimos historiales médicos registrados en el sistema
SELECT * FROM Historiales_Medicos
ORDER BY fecha_registro DESC
LIMIT 3;