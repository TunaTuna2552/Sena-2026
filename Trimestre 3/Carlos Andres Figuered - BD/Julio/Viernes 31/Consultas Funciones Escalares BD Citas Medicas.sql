-- =====================================================================
-- CONSULTAS - (FUNCIONES ESCALARES INCORPORADAS)
-- =====================================================================

-- ---------------------------------------------------------------------
-- Funciones de Texto
-- ---------------------------------------------------------------------

-- 1. Nombres y apellidos de los pacientes en minúsculas
SELECT 
    LOWER(nombre) AS nombre_minus,
    LOWER(apellido) AS apellido_minus
FROM Pacientes;

-- 2. Columna codigo_paciente concatenando "PAC-" con el ID
SELECT 
    id_paciente,
    CONCAT('PAC-', id_paciente) AS codigo_paciente,
    nombre,
    apellido
FROM Pacientes;

-- 3. Nombre del médico y longitud de su apellido
SELECT 
    nombre,
    apellido,
    LENGTH(apellido) AS longitud_apellido
FROM Medicos;

-- 4. Primeros 5 caracteres del diagnóstico
SELECT 
    id_historial,
    diagnostico,
    SUBSTRING(diagnostico, 1, 5) AS diagnostico_corto
FROM Historiales_Medicos;

-- 5. Reemplazar la palabra "aguda" por "severa" en el diagnóstico
SELECT 
    id_historial,
    diagnostico,
    REPLACE(diagnostico, 'aguda', 'severa') AS diagnostico_modificado
FROM Historiales_Medicos;

-- 6. Teléfono de pacientes reemplazando guiones por espacios
SELECT 
    nombre,
    telefono,
    REPLACE(telefono, '-', ' ') AS telefono_formateado
FROM Pacientes;


-- ---------------------------------------------------------------------
-- Funciones de Fecha y Hora
-- ---------------------------------------------------------------------

-- 7. Obtener la fecha y hora actual del sistema
SELECT NOW() AS fecha_hora_actual;

-- 8. Citas agendadas en el año 2026 usando YEAR()
SELECT * FROM Citas
WHERE YEAR(fecha_hora) = 2026;

-- 9. Citas agendadas en el mes de mayo (Mes 5) usando MONTH()
SELECT * FROM Citas
WHERE MONTH(fecha_hora) = 5;

-- 10. Día del mes en que nacieron los pacientes
SELECT 
    nombre,
    apellido,
    fecha_nacimiento,
    DAY(fecha_nacimiento) AS dia_nacimiento
FROM Pacientes;

-- 11. Diferencia en días entre la fecha de cada cita y la fecha actual
SELECT 
    id_cita,
    fecha_hora,
    DATEDIFF(fecha_hora, CURDATE()) AS dias_diferencia
FROM Citas;

-- 12. Sumar 2 horas a la fecha original de la cita
SELECT 
    id_cita,
    fecha_hora AS fecha_original,
    DATE_ADD(fecha_hora, INTERVAL 2 HOUR) AS fecha_mas_2_horas
FROM Citas;

-- 13. Citas correspondientes al día 2 del mes
SELECT * FROM Citas
WHERE DAY(fecha_hora) = 2;


-- ---------------------------------------------------------------------
-- Funciones Numéricas y Operaciones
-- ---------------------------------------------------------------------

-- 14. Calcular edad aproximada en años restando el año actual menos el año de nacimiento
SELECT 
    nombre, apellido, fecha_nacimiento,
    (YEAR(CURDATE()) - YEAR(fecha_nacimiento)) AS edad_estimada
FROM Pacientes;

-- 15. Redondear un costo o número decimal a 2 decimales
SELECT ROUND(125.786, 2) AS valor_redondeado;

-- 16. Entero inferior (FLOOR) y superior (CEIL) de un decimal
SELECT 
    FLOOR(125.786) AS valor_piso,
    CEIL(125.786) AS valor_techo;

-- 18. Reemplazar teléfono NULL por 'Sin Registrar' usando IFNULL
SELECT 
    nombre,
    apellido,
    IFNULL(telefono, 'Sin Registrar') AS telefono_contacto
FROM Pacientes;

-- 19. Asegurar que el tratamiento no sea NULL usando COALESCE
SELECT 
    id_historial,
    diagnostico,
    COALESCE(tratamiento, 'No especificado') AS tratamiento_valido
FROM Historiales_Medicos;

-- 20. Reemplazar descripción NULL de especialidad por 'Sin descripción disponible'
SELECT 
    id_especialidad,
    nombre,
    IFNULL(descripcion, 'Sin descripción disponible') AS descripcion_limpia
FROM Especialidades;