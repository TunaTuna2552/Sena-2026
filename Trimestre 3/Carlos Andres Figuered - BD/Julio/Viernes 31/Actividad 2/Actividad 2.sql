-- =====================================================================
-- ACTIVIDAD: CONSULTAS CON FUNCIONES ESCALARES SQL
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Consultas Funciones de Texto
-- ---------------------------------------------------------------------

-- Mostrar los nombres y apellidos de los pacientes convertidos completamente a minúsculas (LOWER).
SELECT 
    LOWER(nombre) AS nombre_minus,
    LOWER(apellido) AS apellido_minus
FROM Pacientes;

-- Generar una columna llamada codigo_paciente que concatene el texto "PAC-" con el ID del paciente.
SELECT 
    id_paciente,
    CONCAT('PAC-', id_paciente) AS codigo_paciente,
    nombre,
    apellido
FROM Pacientes;

-- Obtener el nombre de los médicos y la cantidad de caracteres que tiene su apellido (LENGTH).
SELECT 
    nombre,
    apellido,
    LENGTH(apellido) AS longitud_apellido
FROM Medicos;

-- Extraer los primeros 5 caracteres del diagnóstico en la tabla Historiales_Medicos usando SUBSTRING.
SELECT 
    id_historial,
    diagnostico,
    SUBSTRING(diagnostico, 1, 5) AS diagnostico_corto
FROM Historiales_Medicos;

-- Mostrar los diagnósticos de los historiales médicos reemplazando la palabra "aguda" por "severa" usando REPLACE.
SELECT 
    id_historial,
    diagnostico,
    REPLACE(diagnostico, 'aguda', 'severa') AS diagnostico_modificado
FROM Historiales_Medicos;

-- Mostrar el número de teléfono de los pacientes reemplazando los guiones '-' por espacios en blanco ' '.
SELECT 
    nombre,
    telefono,
    REPLACE(telefono, '-', ' ') AS telefono_formateado
FROM Pacientes;


-- ---------------------------------------------------------------------
-- 2. Funciones de Fecha y Hora
-- ---------------------------------------------------------------------

-- Obtener la fecha y hora actual del servidor usando NOW().
SELECT NOW() AS fecha_hora_actual;

-- Mostrar solo las citas que hayan sido agendadas en el año 2026 evaluando con la función YEAR().
SELECT * 
FROM Citas
WHERE YEAR(fecha_hora) = 2026;

-- Mostrar las citas que hayan sido agendadas en el mes de mayo (Mes 5) usando MONTH().
SELECT * 
FROM Citas
WHERE MONTH(fecha_hora) = 5;

-- Obtener el día del mes (DAY) en el que nacieron todos los pacientes.
SELECT 
    nombre,
    apellido,
    fecha_nacimiento,
    DAY(fecha_nacimiento) AS dia_nacimiento
FROM Pacientes;

-- Calcular cuántos días faltan o han pasado entre la fecha de cada cita y la fecha actual usando DATEDIFF().
SELECT 
    id_cita,
    fecha_hora,
    DATEDIFF(fecha_hora, CURDATE()) AS dias_diferencia
FROM Citas;

-- Mostrar las fechas de las citas sumándole 2 horas a cada fecha original usando DATE_ADD().
SELECT 
    id_cita,
    fecha_hora AS fecha_original,
    DATE_ADD(fecha_hora, INTERVAL 2 HOUR) AS fecha_mas_2_horas
FROM Citas;

-- Filtrar las citas que corresponden al día 2 de cualquier mes usando DAY(fecha_hora) = 2.
SELECT * 
FROM Citas
WHERE DAY(fecha_hora) = 2;


-- ---------------------------------------------------------------------
-- 3. Funciones Numéricas y Operaciones
-- ---------------------------------------------------------------------

-- Calcular la edad aproximada en años restando YEAR(CURDATE()) - YEAR(fecha_nacimiento).
SELECT 
    nombre, 
    apellido, 
    fecha_nacimiento,
    (YEAR(CURDATE()) - YEAR(fecha_nacimiento)) AS edad_estimada
FROM Pacientes;

-- Dado el cálculo hipotético de un costo médico con decimales (ej. 125.786), usa ROUND() para redondearlo a 2 decimales.
SELECT ROUND(125.786, 2) AS valor_redondeado;

-- Obtener el número entero inferior (FLOOR) y superior (CEIL) de un número decimal de prueba.
SELECT 
    FLOOR(125.786) AS valor_piso,
    CEIL(125.786) AS valor_techo;

-- Obtener las citas cuyos IDs sean pares usando el operador de módulo MOD(id_cita, 2) = 0.
SELECT * 
FROM Citas
WHERE MOD(id_cita, 2) = 0;


-- ---------------------------------------------------------------------
-- 4. Manejo de Valores Nulos
-- ---------------------------------------------------------------------

-- Mostrar la lista de pacientes, y si su teléfono es NULL, mostrar la palabra 'Sin Registrar' usando IFNULL().
SELECT 
    nombre,
    apellido,
    IFNULL(telefono, 'Sin Registrar') AS telefono_contacto
FROM Pacientes;

-- Mostrar los historiales médicos usando COALESCE() para asegurar que ningún tratamiento aparezca como NULL.
SELECT 
    id_historial,
    diagnostico,
    COALESCE(tratamiento, 'No especificado') AS tratamiento_valido
FROM Historiales_Medicos;

-- Obtener los nombres de las especialidades, y si la descripción es NULL, mostrar 'Sin descripción disponible'.
SELECT 
    id_especialidad,
    nombre,
    IFNULL(descripcion, 'Sin descripción disponible') AS descripcion_limpia
FROM Especialidades;