use citas_medicas2;

-- -------------------------------------------------------------------
-- FUNCIONES DE AGREGACIÓN Y AGRUPAMIENTO BÁSICO
-- -------------------------------------------------------------------

-- 1. Obtener la cantidad total de citas registradas en la tabla Citas.
SELECT COUNT(*) AS total_citas
FROM Citas;

-- 2. Obtener el total de médicos asignados por cada id_especialidad.
SELECT id_especialidad, COUNT(*) AS total_medicos
FROM Medicos
GROUP BY id_especialidad;

-- 3. Contar la cantidad de citas agendadas por cada id_medico.
SELECT id_medico, COUNT(*) AS total_citas
FROM Citas
GROUP BY id_medico;

-- 4. Obtener la cantidad total de citas que ha tenido cada id_paciente.
SELECT id_paciente, COUNT(*) AS total_citas
FROM Citas
GROUP BY id_paciente;

-- 5. Mostrar la primera (MIN) y la última (MAX) fecha_hora de cita agendada en la clínica.
SELECT 
    MIN(fecha_hora) AS primera_cita,
    MAX(fecha_hora) AS ultima_cita
FROM Citas;

-- 6. Contar cuántos pacientes están registrados en la tabla Pacientes.
SELECT COUNT(*) AS total_pacientes
FROM Pacientes;

-- 7. Contar cuántos historiales médicos están asociados a cada id_cita.
SELECT id_cita, COUNT(*) AS total_historiales
FROM Historiales_Medicos
GROUP BY id_cita;

-- 8. Mostrar la cantidad de médicos cuya columna num_colegiado no sea nula usando COUNT(num_colegiado).
SELECT COUNT(num_colegiado) AS medicos_con_colegiado
FROM Medicos;

-- 9. Obtener el número de especialidades registradas en la tabla Especialidades.
SELECT COUNT(*) AS total_especialidades
FROM Especialidades;

-- 10. Mostrar la cantidad de citas agendadas por cada año usando GROUP BY YEAR(fecha_hora).
SELECT 
    YEAR(fecha_hora) AS anio,
    COUNT(*) AS total_citas
FROM Citas
GROUP BY YEAR(fecha_hora);


-- -------------------------------------------------------------------
-- AGRUPAMIENTO MÚLTIPLE Y CON FUNCIONES
-- -------------------------------------------------------------------

-- 11. Obtener el número de citas agendadas por cada mes del año usando GROUP BY MONTH(fecha_hora).
SELECT 
    MONTH(fecha_hora) AS mes,
    COUNT(*) AS total_citas
FROM Citas
GROUP BY MONTH(fecha_hora);

-- 12. Mostrar la cantidad de citas que tiene cada paciente agrupadas por id_paciente y por estado.
SELECT 
    id_paciente,
    estado,
    COUNT(*) AS total_citas
FROM Citas
GROUP BY id_paciente, estado;

-- 13. Obtener cuántos pacientes nacieron por cada año de nacimiento usando GROUP BY YEAR(fecha_nacimiento).
SELECT 
    YEAR(fecha_nacimiento) AS anio_nacimiento,
    COUNT(*) AS total_pacientes
FROM Pacientes
GROUP BY YEAR(fecha_nacimiento);

-- 14. Contar cuántos pacientes tienen registrado teléfono versus cuántos no.
SELECT 
    IF(telefono IS NULL, 'Sin Teléfono', 'Con Teléfono') AS estado_telefono,
    COUNT(*) AS total_pacientes
FROM Pacientes
GROUP BY IF(telefono IS NULL, 'Sin Teléfono', 'Con Teléfono');

-- 15. Obtener los estados de cita junto con el total de citas para cada uno, ordenados de mayor a menor cantidad.
SELECT 
    estado,
    COUNT(*) AS total_citas
FROM Citas
GROUP BY estado
ORDER BY COUNT(*) DESC;


-- -------------------------------------------------------------------
-- AGRUPAMIENTO CON FILTROS AGREGADOS (HAVING)
-- -------------------------------------------------------------------

-- 16. Mostrar los médicos (id_medico) que tengan más de 3 citas en total en la tabla Citas.
SELECT 
    id_medico,
    COUNT(*) AS total_citas
FROM Citas
GROUP BY id_medico
HAVING COUNT(*) > 3;

-- 17. Mostrar los pacientes (id_paciente) que tengan al menos 2 citas en estado 'Programada'.
SELECT 
    id_paciente,
    COUNT(*) AS citas_programadas
FROM Citas
WHERE estado = 'Programada'
GROUP BY id_paciente
HAVING COUNT(*) >= 2;

-- 18. Mostrar los años que tengan más de 5 citas agendadas en la historia de la clínica.
SELECT 
    YEAR(fecha_hora) AS anio,
    COUNT(*) AS total_citas
FROM Citas
GROUP BY YEAR(fecha_hora)
HAVING COUNT(*) > 5;

-- 19. Obtener las especialidades (id_especialidad) que tengan más de 1 médico asignado.
SELECT 
    id_especialidad,
    COUNT(*) AS total_medicos
FROM Medicos
GROUP BY id_especialidad
HAVING COUNT(*) > 1;

-- 20. Obtener los médicos que tengan citas completadas, mostrando únicamente aquellos cuya primera cita completada (MIN(fecha_hora)) haya sido después del '2026-01-01'.
SELECT 
    id_medico,
    MIN(fecha_hora) AS primera_cita_completada
FROM Citas
WHERE estado = 'Completada'
GROUP BY id_medico
HAVING MIN(fecha_hora) > '2026-01-01';

