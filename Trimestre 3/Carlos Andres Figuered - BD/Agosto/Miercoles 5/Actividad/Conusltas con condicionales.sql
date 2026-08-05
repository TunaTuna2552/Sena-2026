use citas_medicas2;

-- 1. Categorizar a los pacientes con CASE según su año de nacimiento
SELECT 
    id_paciente,
    nombre,
    apellido,
    fecha_nacimiento,
    CASE 
        WHEN YEAR(fecha_nacimiento) < 1980 THEN 'Mayor de Edad / Senior'
        WHEN YEAR(fecha_nacimiento) BETWEEN 1980 AND 1999 THEN 'Adulto'
        WHEN YEAR(fecha_nacimiento) >= 2000 THEN 'Joven'
    END AS Categoria_Edad
FROM Pacientes;

-- 2. Asignar niveles de urgencia a las citas usando CASE
SELECT 
    id_cita,
    estado,
    CASE 
        WHEN estado = 'Completada' THEN 'Baja'
        WHEN estado = 'Programada' THEN 'Media'
        WHEN estado IN ('Cancelada', 'No asistió') THEN 'Alta'
        ELSE 'Sin clasificar'
    END AS Nivel_Urgencia
FROM Citas;

-- 3. Usar IF() para marcar a los pacientes cuyo documento de identidad empiece por '101' como 'Local' y al resto como 'Foráneo'
SELECT 
    id_paciente,
    nombre,
    apellido,
    documento_identidad,
    IF(documento_identidad LIKE '101%', 'Local', 'Foráneo') AS Tipo_Origen
FROM Pacientes;

-- 4. Clasificar las especialidades usando CASE
SELECT 
    nombre,
    apellido,
    id_especialidad,
    CASE id_especialidad
        WHEN 1 THEN 'Planta Baja - Consultorio A'
        WHEN 2 THEN 'Piso 1 - Pediatría'
        WHEN 3 THEN 'Piso 2 - Cardiología'
        ELSE 'Piso 3 - Especialidades Varias'
    END AS Ubicacion_Consultorio
FROM Medicos;

-- 5. Crear una columna en Pacientes con IF() según la fecha_nacimiento
SELECT 
    id_paciente,
    nombre,
    apellido,
    fecha_nacimiento,
    IF(YEAR(fecha_nacimiento) < 1990, 'Registrado antes del 1990', 'Registrado después de 1990') AS Categoria_Registro
FROM Pacientes;

-- 6. Usar CASE para asignarle un turno hipotético a la cita según la hora de fecha_hora
SELECT 
    id_cita,
    fecha_hora,
    CASE 
        WHEN HOUR(fecha_hora) < 12 THEN 'Mañana'
        ELSE 'Tarde'
    END AS Turno
FROM Citas;

-- 7. Mostrar el nombre de los médicos y usar IF() para marcar el tipo de colegiado
SELECT 
    nombre,
    apellido,
    num_colegiado,
    IF(num_colegiado LIKE 'COL-001%' OR num_colegiado LIKE 'COL-002%', 'Colegiado Antiguo', 'Colegiado Nuevo') AS Tipo_Colegiado
FROM Medicos;

-- 8. Crear una etiqueta condicional para los historiales médicos usando CASE
SELECT 
    id_historial,
    diagnostico,
    CASE 
        WHEN diagnostico LIKE '%aguda%' THEN 'Atención Inmediata'
        ELSE 'Control de Rutina'
    END AS Prioridad_Atencion
FROM Historiales_Medicos;

-- 9. Clasificar a los médicos según su ID usando CASE
SELECT 
    id_medico,
    nombre,
    apellido,
    CASE 
        WHEN id_medico BETWEEN 1 AND 3 THEN 'Grupo A'
        WHEN id_medico BETWEEN 4 AND 6 THEN 'Grupo B'
        WHEN id_medico > 6 THEN 'Grupo C'
    END AS Grupo_Medico
FROM Medicos;

-- 10. Mostrar los pacientes y usar IF() para verificar si cuentan con teléfono
SELECT 
    nombre,
    apellido,
    telefono,
    IF(telefono IS NOT NULL, 'Contacto Disponible', 'Sin Teléfono') AS Estado_Contacto
FROM Pacientes;

-- 11. Evaluar con CASE la columna tratamiento en Historiales_Medicos
SELECT 
    id_historial,
    tratamiento,
    CASE 
        WHEN tratamiento IS NULL THEN 'Sin tratamiento'
        WHEN tratamiento LIKE '%dieta%' THEN 'Tratamiento Básico'
        ELSE 'Tratamiento Médico'
    END AS Categoria_Tratamiento
FROM Historiales_Medicos;

-- 12. Usar IF() sobre las citas para mostrar si es del Médico 1 u otro
SELECT 
    id_cita,
    id_medico,
    IF(id_medico = 1, 'Cita del Médico 1', 'Otro Médico') AS Tipo_Medico_Cita
FROM Citas;

-- 13. Crear un clasificador de diagnósticos con CASE
SELECT 
    id_historial,
    diagnostico,
    CASE 
        WHEN diagnostico LIKE '%Control%' THEN 'Chequeo'
        WHEN diagnostico LIKE '%Fiebre%' OR diagnostico LIKE '%Gripe%' THEN 'Infeccioso'
        ELSE 'General'
    END AS Clasificacion_Diagnostico
FROM Historiales_Medicos;

-- 14. Usar IF() para evaluar si la fecha de las citas es futura o pasada
SELECT 
    id_cita,
    fecha_hora,
    IF(fecha_hora > NOW(), 'Futura', 'Pasada') AS Estado_Temporal
FROM Citas;

-- 15. Clasificar el mes de nacimiento de los pacientes con CASE
SELECT 
    id_paciente,
    nombre,
    apellido,
    fecha_nacimiento,
    CASE 
        WHEN MONTH(fecha_nacimiento) BETWEEN 1 AND 6 THEN 'Primer Semestre'
        ELSE 'Segundo Semestre'
    END AS Semestre_Nacimiento
FROM Pacientes;

-- 16. Usar CASE dentro de funciones de agregación para contar estados de citas
SELECT 
    COUNT(CASE WHEN estado = 'Completada' THEN 1 END) AS total_completadas,
    COUNT(CASE WHEN estado = 'Cancelada' THEN 1 END) AS total_canceladas,
    COUNT(CASE WHEN estado = 'Programada' THEN 1 END) AS total_programadas
FROM Citas;

-- 17. Usar IF() para verificar si el apellido del paciente termina en 'ez'
SELECT 
    id_paciente,
    nombre,
    apellido,
    IF(apellido LIKE '%ez', 'Apellido Patronímico', 'Otro Apellido') AS Tipo_Apellido
FROM Pacientes;

-- 18. Crear un indicador condicional para citas usando CASE
SELECT 
    id_cita,
    id_paciente,
    CASE 
        WHEN id_paciente IN (1, 2, 3) THEN 'Paciente VIP'
        ELSE 'Paciente Regular'
    END AS Categoria_Paciente
FROM Citas;

-- 19. Evaluar las especialidades usando IFNULL() para la descripción limpia
SELECT 
    id_especialidad,
    nombre,
    IFNULL(descripcion, 'Sin descripción disponible') AS descripcion_limpia
FROM Especialidades;

-- 20. Usar IF() para mostrar si la cita es del mes de mayo
SELECT 
    id_cita,
    fecha_hora,
    IF(MONTH(fecha_hora) = 5, 'Cita de Mayo', 'Otro Mes') AS Es_Mayo
FROM Citas;



