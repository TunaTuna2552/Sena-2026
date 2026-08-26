-- ========================================================================
-- MÓDULO 11: FUNCIONES DE VENTANA (WINDOW FUNCTIONS)
-- ========================================================================

-- Calculan métricas sobre un conjunto de filas relacionadas SIN colapsar la tabla:
-- - GROUP BY: Reduce filas a un resumen.
-- - OVER(): Mantiene el 100% de las filas originales y les añade el cálculo.

-- SINTAXIS BASE:
-- funcion() OVER (
--     PARTITION BY columna_agrupacion    -- Reinicia el cálculo por grupo
--     ORDER BY columna_ordenamiento       -- Orden de evaluación (clave en rankings)
--     ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW -- Para acumulados (running totals)
-- )

-- FUNCIONES CLAVE MÁS USADAS:
-- 1. Numeración y Rankings:
--    - ROW_NUMBER() : 1, 2, 3, 4 (único, continuo)
--    - RANK()       : 1, 2, 2, 4 (con saltos por empates)
--    - DENSE_RANK() : 1, 2, 2, 3 (sin saltos)
--    - NTILE(n)     : Divide en 'n' grupos iguales (cuartiles, terciles)
--
-- 2. Navegación entre Filas:
--    - LAG(col, 1)  : Trae el valor de la fila ANTERIOR
--    - LEAD(col, 1) : Trae el valor de la fila SIGUIENTE
--    - FIRST_VALUE(col) / LAST_VALUE(col) : Primer / último valor del grupo
--
-- 3. Agregaciones en Ventana:
--    - COUNT(), SUM(), AVG(), MIN(), MAX() con OVER() para totales y acumulados.


-- ------------------------------------------------------------------------
-- Ejemplo 1: ROW_NUMBER() Global
-- Enunciado: Numerar cronologicamente todas las citas del sistema.
-- Explicacion: Genera un consecutivo unico del 1 al 35 ordenado por fecha hora.
-- ------------------------------------------------------------------------

select 
	row_number() over (order by citas.fecha_hora asc) as consecutivo_global,
    citas.id_cita,
    citas.id_paciente,
    citas.id_medico,
    citas.fecha_hora,
    citas.estado
from citas;


-- ------------------------------------------------------------------------
-- Ejemplo 2: ROW_NUMBER() con PARTITION BY
-- Enunciado: Numerar las citas de cada paciente por separado cronologicamente.
-- Explicación: La numeración se reinicia en 1 cada vez que cambia el id_paciente.
-- ------------------------------------------------------------------------

select 
	row_number() over (
		partition by citas.id_paciente
		order by citas.fecha_hora asc
	) as num_cita_por_paciente,
    citas.id_paciente,
    citas.id_cita,
    citas.fecha_hora,
    citas.estado
from citas
where citas.id_paciente is not null;


-- ------------------------------------------------------------------------
-- Ejemplo 3: RANK() vs DENSE_RANK()
-- Enunciado: Comparar el comportamiento de RANK y DENSE_RANK al ordenar
--            pacientes por año de nacimiento.
-- Explicación: Pacientes que nacieron en el mismo año comparten posición;
--              RANK salta números posteriores, mientras DENSE_RANK mantiene continuidad.
-- ------------------------------------------------------------------------
select
    pacientes.id_paciente,
    concat(pacientes.nombre, ' ', pacientes.apellido) as paciente,
    year(pacientes.fecha_nacimiento) as anio_nacimiento,
    rank() over (order by year(pacientes.fecha_nacimiento) asc) as rank_con_saltos,
    dense_rank() over (order by year(pacientes.fecha_nacimiento) asc) as dense_rank_sin_saltos
from pacientes;


-- ------------------------------------------------------------------------
-- Ejemplo 4: NTILE(n) (Segmentación por Cuantiles)
-- Enunciado: Dividir el universo de pacientes en 3 grupos (terciles) según su edad.
-- Explicación: Distribuye las 18 filas en 3 grupos de 6 registros cada uno.
-- ------------------------------------------------------------------------
select
    pacientes.id_paciente,
    concat(pacientes.nombre, ' ', pacientes.apellido) as paciente,
    pacientes.fecha_nacimiento,
    ntile(3) over (order by pacientes.fecha_nacimiento asc) as tercil_edad
from pacientes;


-- ------------------------------------------------------------------------
-- Ejemplo 5: LAG() (Acceso a la Fila Anterior)
-- Enunciado: Mostrar cada cita junto con la fecha de la cita previa del mismo paciente.
-- Explicación: LAG consulta el valor del registro anterior dentro de la partición.
-- ------------------------------------------------------------------------
select
    citas.id_paciente,
    citas.id_cita,
    citas.fecha_hora as fecha_cita_actual,
    lag(citas.fecha_hora, 1) over (
        partition by citas.id_paciente
        order by citas.fecha_hora asc
    ) as fecha_cita_anterior
from citas
where citas.id_paciente is not null;


-- ------------------------------------------------------------------------
-- Ejemplo 6: LEAD() (Acceso a la Fila Posterior)
-- Enunciado: Mostrar cada cita junto con el ID y estado de la próxima cita del médico.
-- Explicación: LEAD inspecciona la fila siguiente sin necesidad de auto-uniones
-- ------------------------------------------------------------------------
select
    citas.id_medico,
    citas.id_cita,
    citas.fecha_hora as fecha_actual,
    citas.estado as estado_actual,
    lead(citas.estado, 1) over (
        partition by citas.id_medico
        order by citas.fecha_hora asc
    ) as estado_siguiente_cita
from citas
where citas.id_medico is not null;


-- ------------------------------------------------------------------------
-- Ejemplo 7: FIRST_VALUE() y LAST_VALUE() con Window Frame
-- Enunciado: Mostrar en cada fila la primera y la última cita agendada de cada médico.
-- Explicación: 'ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING' expande
--              el marco para que LAST_VALUE evalúe toda la partición completa.
-- ------------------------------------------------------------------------
select
    citas.id_medico,
    citas.id_cita,
    citas.fecha_hora,
    first_value(citas.fecha_hora) over (
        partition by citas.id_medico
        order by citas.fecha_hora asc
    ) as primera_cita_medico,
    last_value(citas.fecha_hora) over (
        partition by citas.id_medico
        order by citas.fecha_hora asc
        rows between unbounded preceding and unbounded following
    ) as ultima_cita_medico
from citas
where citas.id_medico is not null;


-- ------------------------------------------------------------------------
-- Ejemplo 8: Agregación Global como Ventana (COUNT() OVER())
-- Enunciado: Mostrar cada cita junto al total absoluto de citas registradas.
-- Explicación: Devuelve todas las filas individuales agregando la constante total.
-- ------------------------------------------------------------------------
select
    citas.id_cita,
    citas.id_paciente,
    citas.fecha_hora,
    citas.estado,
    count(citas.id_cita) over () as total_citas_clinica
from citas;


-- ------------------------------------------------------------------------
-- Ejemplo 9: Agregación Particionada (COUNT() OVER(PARTITION BY))
-- Enunciado: Mostrar cada médico y el total de médicos que comparten su especialidad.
-- Explicación: Realiza el conteo agrupado por especialidad sin colapsar filas.
-- ------------------------------------------------------------------------
select
    medicos.id_medico,
    concat(medicos.nombre, ' ', medicos.apellido) as medico,
    medicos.id_especialidad,
    count(medicos.id_medico) over (
        partition by medicos.id_especialidad
    ) as total_colegas_especialidad
from medicos;


-- ------------------------------------------------------------------------
-- Ejemplo 10: Facturación Acumulada Progresiva (Running Total)
-- Enunciado: Calcular el total de dinero recaudado acumulado a lo largo del tiempo
--            a medida que se van realizando las citas completadas.
-- ------------------------------------------------------------------------
select
    citas.id_cita,
    citas.fecha_hora,
    especialidades.nombre as especialidad,
    especialidades.costo as valor_cita,
    sum(especialidades.costo) over (
        order by citas.fecha_hora asc
        rows between unbounded preceding and current row
    ) as recaudacion_acumulada
from citas
inner join medicos on citas.id_medico = medicos.id_medico
inner join especialidades on medicos.id_especialidad = especialidades.id_especialidad
where citas.estado = 'Completada';