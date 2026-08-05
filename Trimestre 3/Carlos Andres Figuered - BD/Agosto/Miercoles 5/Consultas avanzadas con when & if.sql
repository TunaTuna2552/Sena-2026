-- ============================================================================
-- MÓDULO 6: CONDICIONALES EN LA CONSULTA
-- ============================================================================

-------------------------------------------------------------------------------
-- Ejemplo A: CASE Buscado con Rangos y Lógica Compleja
-- Enunciado: Clasificar las citas por estado agregando una columna con un mensaje descriptivo.
-- Explicación: Evalúa cada fila y asigna la categoría correspondiente. Si no coincide
--              con ninguna regla del 'WHEN', toma el valor del 'ELSE'.
-------------------------------------------------------------------------------
SELECT 
    id_cita,
    estado,
    CASE 
        WHEN estado = 'Completada' THEN 'El paciente fue atendido con éxito'
        WHEN estado = 'Programada' THEN 'Cita pendiente en agenda'
        WHEN estado IN ('Cancelada', 'No asistió') THEN 'Cita no realizada'
        ELSE 'Estado sin clasificar'
    END AS Estado_Descriptivo
FROM Citas;


-------------------------------------------------------------------------------
-- Ejemplo B: CASE Simple (Comparación directa de una columna)
-- Enunciado: Asignar el nombre del piso o área según el id_especialidad del médico.
-- Explicación: Evalúa directamente la columna 'id_especialidad'.
-------------------------------------------------------------------------------
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


-------------------------------------------------------------------------------
-- Ejemplo C: Condicional Simple en Línea con IF()
-- Enunciado: Crear una columna que indique si el paciente cuenta o no con teléfono registrado.
-- Explicación: Evalúa si 'telefono IS NOT NULL'. Si es verdadero devuelve el primer texto,
--              si es falso devuelve el segundo.
-------------------------------------------------------------------------------
SELECT 
    nombre,
    apellido,
    telefono,
    IF(telefono IS NOT NULL, 'Contacto Disponible', 'Sin Teléfono') AS Estado_Contacto
FROM Pacientes;


-------------------------------------------------------------------------------
-- Ejemplo D: Agregación Condicional (CASE dentro de Funciones de Agregación)
-- Enunciado: Contar en una sola consulta cuántas citas están completadas y cuántas canceladas.
-- Explicación: El CASE devuelve 1 solo cuando se cumple la regla, y COUNT() suma esas coincidencias.
-------------------------------------------------------------------------------
SELECT 
    COUNT(CASE WHEN estado = 'Completada' THEN 1 END) AS total_completadas,
    COUNT(CASE WHEN estado = 'Cancelada' THEN 1 END) AS total_canceladas,
    COUNT(CASE WHEN estado = 'Programada' THEN 1 END) AS total_programadas
FROM Citas;