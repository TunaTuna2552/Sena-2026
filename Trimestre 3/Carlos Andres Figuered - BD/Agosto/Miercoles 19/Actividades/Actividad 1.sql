-- ==========================================
-- OPERACIONES DE CONJUNTOS (SET OPERATIONS)
-- ==========================================

-- ----------------------------------------------------
-- Operaciones con UNION y UNION ALL (Fusión Vertical)
-- ----------------------------------------------------
-- 1.	Consolidar con union los nombres, apellidos y tipo de persona ('Paciente' o 'Médico') ordenados alfabéticamente por apellido.

select
    pacientes.nombre,
    pacientes.apellido,
    'Paciente' as rol
from pacientes
union
select
    medicos.nombre,
    medicos.apellido,
    'Médico' as rol
from medicos
order by apellido asc;

-- 2.	Crear un catálogo único de identificadores oficiales uniendo los documentos de identidad de pacientes y los números de colegiado de médicos.

select
    pacientes.documento_identidad as identificador_oficial,
    'paciente' as tipo_persona
from pacientes
union
select
    medicos.num_colegiado as identificador_oficial,
    'medico' as tipo_persona
from medicos;

-- 3.	Listar todos los nombres de pila de pacientes y médicos con union all para observar repeticiones completas.

select pacientes.nombre from pacientes
union all 
select medicos.nombre from medicos
order by nombre;

-- 4.	Generar un consolidado de contactos: pacientes con su número telefónico y médicos con el texto constante 'Sin registro directo'.

SELECT 
	pacientes.nombre, pacientes.apellido, pacientes.telefono AS contacto
FROM pacientes
UNION
SELECT 
	medicos.nombre, medicos.apellido, 
    'Sin registro directo' AS contacto
FROM medicos;

-- 5.	Extraer con union todos los años presentes en el sistema: años de nacimiento de pacientes y años de agendamiento de citas.

SELECT YEAR(pacientes.fecha_nacimiento) AS anio
FROM pacientes
UNION
SELECT YEAR(citas.fecha_hora) AS anio
FROM citas;

-- 6.	Unir en una sola columna descriptiva los textos informativos de las especialidades con los tratamientos de los historiales médicos.

SELECT 
    especialidades.descripcion AS texto_descriptivo,
    'Especialidad' AS origen
FROM especialidades
UNION
SELECT 
    historiales_medicos.tratamiento AS texto_descriptivo,
    'Tratamiento Historial' AS origen
FROM historiales_medicos;

-- 7.	Crear un reporte de citas por estado uniendo las citas en estado 'Completada' con las citas en estado 'Cancelada' usando union all.

SELECT 
    citas.id_cita, citas.fecha_hora, citas.estado
FROM citas
WHERE citas.estado = 'Completada'
UNION ALL
SELECT 
    citas.id_cita, citas.fecha_hora, citas.estado
FROM citas
WHERE citas.estado = 'Cancelada';

-- 8.	Listar las especialidades con ID menor o igual a 3 unidas con las especialidades con ID mayor o igual a 6 usando union.

SELECT 
    especialidades.id_especialidad, especialidades.nombre
FROM especialidades
WHERE especialidades.id_especialidad <= 3
UNION
SELECT 
    especialidades.id_especialidad, especialidades.nombre
FROM especialidades
WHERE especialidades.id_especialidad >= 6;

-- 9.	Consolidar en un listado cronológico las fechas de nacimiento de los pacientes y las fechas de registro de los historiales médicos.

SELECT 
    pacientes.fecha_nacimiento AS fecha_evento,
    'Nacimiento Paciente' AS tipo_evento
FROM pacientes
UNION
SELECT 
    historiales_medicos.fecha_registro AS fecha_evento,
    'Registro Historial' AS tipo_evento
FROM historiales_medicos
ORDER BY fecha_evento ASC;

-- 10.	Unir con union all las citas que corresponden al mes de mayo (5) con las citas que corresponden al mes de julio (7) de 2026.

SELECT 
    citas.id_cita, citas.fecha_hora, citas.estado
FROM citas
WHERE MONTH(citas.fecha_hora) = 5 AND YEAR(citas.fecha_hora) = 2026
UNION ALL
SELECT 
    citas.id_cita, citas.fecha_hora, citas.estado
FROM citas
WHERE MONTH(citas.fecha_hora) = 7 AND YEAR(citas.fecha_hora) = 2026;


-- ----------------------------------------------------
-- Intersección de Conjuntos (IN / Pertenencia  A  ∩ B)
-- ----------------------------------------------------

-- 11.	Obtener los nombres de pila que existen tanto en la tabla pacientes como en la tabla medicos.

SELECT DISTINCT pacientes.nombre
FROM pacientes
WHERE pacientes.nombre IN (
    SELECT medicos.nombre 
    FROM medicos
);

-- 12.	Obtener los id_paciente que agendaron al menos una cita en mayo y que también agendaron al menos una cita en julio de 2026.

SELECT DISTINCT citas.id_paciente
FROM citas
WHERE MONTH(citas.fecha_hora) = 5 
  AND YEAR(citas.fecha_hora) = 2026
  AND citas.id_paciente IN (
      SELECT c2.id_paciente
      FROM citas c2
      WHERE MONTH(c2.fecha_hora) = 7 
        AND YEAR(c2.fecha_hora) = 2026
  );

-- 13.	Obtener los id_medico que tienen citas en estado 'Completada' y que a la vez tienen citas en estado 'Programada'.

SELECT DISTINCT citas.id_medico
FROM citas
WHERE citas.estado = 'Completada'
  AND citas.id_medico IN (
      SELECT c2.id_medico
      FROM citas c2
      WHERE c2.estado = 'Programada'
  );

-- 14.	Encontrar las especialidades (id_especialidad, nombre) que están asignadas a médicos en ejercicio.

SELECT 
    especialidades.id_especialidad, especialidades.nombre
FROM especialidades
WHERE especialidades.id_especialidad IN (
    SELECT medicos.id_especialidad
    FROM medicos
    WHERE medicos.id_especialidad IS NOT NULL
);

-- 15.	Obtener los id_cita de la tabla citas que cuentan con un diagnóstico registrado en historiales_medicos.

SELECT citas.id_cita
FROM citas
WHERE citas.id_cita IN (
    SELECT historiales_medicos.id_cita
    FROM historiales_medicos
    WHERE historiales_medicos.diagnostico IS NOT NULL
);


-- ----------------------------------------------------
-- Diferencia de Conjuntos (NOT IN / Exclusión A - B)
-- ----------------------------------------------------

-- 16.	Obtener los pacientes (id_paciente, nombre, apellido) que no tienen ninguna cita agendada en el sistema.

SELECT 
    pacientes.id_paciente, pacientes.nombre, pacientes.apellido
FROM pacientes
WHERE pacientes.id_paciente NOT IN (
    SELECT citas.id_paciente
    FROM citas
    WHERE citas.id_paciente IS NOT NULL
);

-- 17.	Obtener los médicos (id_medico, nombre, apellido) que no tienen asignada ninguna cita en la tabla citas.

SELECT 
    medicos.id_medico, medicos.nombre, medicos.apellido
FROM medicos
WHERE medicos.id_medico NOT IN (
    SELECT citas.id_medico
    FROM citas
    WHERE citas.id_medico IS NOT NULL
);

-- 18.	Encontrar las especialidades (id_especialidad, nombre) que no tienen ningún médico asignado.

SELECT 
    especialidades.id_especialidad, especialidades.nombre
FROM especialidades
WHERE especialidades.id_especialidad NOT IN (
    SELECT medicos.id_especialidad
    FROM medicos
    WHERE medicos.id_especialidad IS NOT NULL
);

-- 19.	Encontrar las citas (id_cita, fecha_hora, estado) que no cuentan con un historial médico registrado.

SELECT 
    citas.id_cita, citas.fecha_hora, citas.estado
FROM citas
WHERE citas.id_cita NOT IN (
    SELECT historiales_medicos.id_cita
    FROM historiales_medicos
    WHERE historiales_medicos.id_cita IS NOT NULL
);

-- 20.	Obtener los nombres de pila de pacientes que no se repiten en ningún médico del sistema.

SELECT DISTINCT pacientes.nombre
FROM pacientes
WHERE pacientes.nombre NOT IN (
    SELECT medicos.nombre
    FROM medicos
    WHERE medicos.nombre IS NOT NULL
);