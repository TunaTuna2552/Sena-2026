-- ============================================================
-- BASE DE DATOS: citas_medicas2
-- SOLUCIÓN CON MÉTODOS DE FILTRADO ALTERNATIVOS
-- (IN, BETWEEN, NOT IN, <>, LIKE, DATE, ETC.)
-- ============================================================

USE citas_medicas2;

-- ============================================================
-- CONSULTAS EN PACIENTES
-- ============================================================

-- 1. Obtener todos los pacientes que se llamen "Ana" Y su apellido sea "Martínez".
SELECT * FROM Pacientes 
WHERE nombre LIKE 'Ana' AND apellido LIKE 'Martínez';

-- 2. Buscar pacientes nacidos estrictamente antes de '1980-01-01'.
SELECT * FROM Pacientes 
WHERE YEAR(fecha_nacimiento) < 1980;

-- 3. Buscar pacientes nacidos a partir de '2000-01-01' QUE NO se llamen "María".
SELECT * FROM Pacientes 
WHERE YEAR(fecha_nacimiento) >= 2000 AND nombre <> 'María';

-- 4. Obtener los pacientes cuyo teléfono sea '555-0101' O '555-0105'.
SELECT * FROM Pacientes 
WHERE telefono IN ('555-0101', '555-0105');

-- 5. Buscar pacientes nacidos entre '1990-01-01' y '1995-12-31' usando únicamente AND y los operadores >= y <=.
-- (El enunciado exige explícitamente el uso de AND, >= y <=).
SELECT * FROM Pacientes 
WHERE fecha_nacimiento >= '1990-01-01' AND fecha_nacimiento <= '1995-12-31';

-- 6. Obtener todos los pacientes EXCEPTO los que tengan el documento de identidad '101010101' o '101010102'.
SELECT * FROM Pacientes 
WHERE documento_identidad NOT IN ('101010101', '101010102');


-- ============================================================
-- CONSULTAS EN MÉDICOS Y ESPECIALIDADES
-- ============================================================

-- 7. Buscar todos los médicos que pertenezcan a la especialidad 1 O a la especialidad 2.
SELECT * FROM Medicos 
WHERE id_especialidad IN (1, 2);

-- 8. Obtener los médicos que NO pertenezcan a la especialidad 3 Y cuyo nombre sea "Laura".
SELECT * FROM Medicos 
WHERE id_especialidad <> 3 AND nombre = 'Laura';

-- 9. Buscar el médico que tenga el número de colegiado 'COL-003' O el colegiado 'COL-007'.
SELECT * FROM Medicos 
WHERE num_colegiado IN ('COL-003', 'COL-007');

-- 10. Obtener las especialidades con un ID mayor a 2 Y menor o igual a 5.
SELECT * FROM Especialidades 
WHERE id_especialidad BETWEEN 3 AND 5;


-- ============================================================
-- CONSULTAS EN CITAS
-- ============================================================

-- 11. Buscar todas las citas del médico ID 1 que estén en estado 'Completada'.
SELECT * FROM Citas 
WHERE id_medico = 1 AND estado LIKE 'Completada';

-- 12. Obtener todas las citas del paciente ID 1 O del paciente ID 2 que estén en estado 'Programada'. (Usa paréntesis).
SELECT * FROM Citas 
WHERE id_paciente IN (1, 2) AND estado = 'Programada';

-- 13. Buscar las citas que NO tengan el estado 'Completada'.
SELECT * FROM Citas 
WHERE estado <> 'Completada';

-- 14. Obtener las citas con estado 'Cancelada' O 'No asistió' que pertenezcan al médico ID 3.
SELECT * FROM Citas 
WHERE estado IN ('Cancelada', 'No asistió') AND id_medico = 3;

-- 15. Obtener las citas programadas exactamente para el día '2026-05-02' (evalúa desde las 00:00:00 hasta las 23:59:59 usando AND).
SELECT * FROM citas 
WHERE fecha_cita BETWEEN '2026-05-02 00:00:00' AND '2026-05-02 23:59:59';

-- 16. Buscar citas del paciente ID 5 donde el estado NO sea 'Cancelada'.
SELECT * FROM Citas 
WHERE id_paciente = 5 AND estado NOT LIKE 'Cancelada';

-- 17. Obtener las citas asignadas al médico ID 4 o ID 9, SIEMPRE QUE su estado sea 'Completada'.
SELECT * FROM Citas 
WHERE id_medico IN (4, 9) AND estado = 'Completada';

-- 18. Buscar citas programadas a partir del '2026-06-01 00:00:00' que pertenezcan al paciente ID 1 Y estén en estado 'Programada'.
SELECT * FROM Citas 
WHERE DATE(fecha_hora) >= '2026-06-01' AND id_paciente = 1 AND estado = 'Programada';


-- ============================================================
-- CONSULTAS EN HISTORIALES_MEDICOS
-- ============================================================

-- 19. Buscar el historial médico donde la cita asociada sea la ID 1 O la ID 2.
SELECT * FROM Historiales_Medicos 
WHERE id_cita IN (1, 2);

-- 20. Obtener los historiales médicos registrados después de la fecha '2026-05-05 00:00:00' Y que correspondan a una cita con ID menor a 10.
SELECT * FROM Historiales_Medicos 
WHERE DATE(fecha_registro) > '2026-05-05' AND id_cita < 10;
