-- -----------------------------------------
-- FUNCIONES DE VENTANA (WINDOW FUNCTIONS)
-- -----------------------------------------

-- ========================================================================
-- nivel 1: numeración, rankings y segmentación
-- ========================================================================

select 
    row_number() over (order by medicos.apellido asc, medicos.nombre asc) as consecutivo,
    medicos.id_medico,
    medicos.nombre,
    medicos.apellido,
    medicos.num_colegiado
from medicos;

-- 2. numeración de citas por médico: numerar secuencialmente en orden cronológico las citas asignadas a cada médico, reiniciando la numeración por cada id_medico con partition by.
select 
    row_number() over (
        partition by citas.id_medico 
        order by citas.fecha_hora asc
    ) as num_cita_medico,
    citas.id_medico,
    citas.id_cita,
    citas.fecha_hora,
    citas.estado
from citas
where citas.id_medico is not null;

-- 3. podio con empates (rank vs dense_rank): construir una consulta que calcule el total de citas por médico y asigne un ranking olímpico (rank) y un ranking continuo sin huecos (dense_rank) ordenado de mayor a menor volumen de atención.
select 
    concat(medicos.nombre, ' ', medicos.apellido) as medico,
    count(citas.id_cita) as total_citas,
    rank() over (order by count(citas.id_cita) desc) as ranking_olimpico,
    dense_rank() over (order by count(citas.id_cita) desc) as ranking_sin_huecos
from medicos
left join citas on medicos.id_medico = citas.id_medico
group by medicos.id_medico, medicos.nombre, medicos.apellido
order by total_citas desc;

-- 4. ranking cronológico de citas por médico: asignar un ranking con rank() a las citas de cada médico ordenadas cronológicamente por fecha_hora.
select 
    rank() over (
        partition by citas.id_medico 
        order by citas.fecha_hora asc
    ) as posicion_cita,
    citas.id_medico,
    citas.id_cita,
    citas.fecha_hora,
    citas.estado
from citas
where citas.id_medico is not null;

-- 5. segmentación etaria en cuartiles: dividir el universo de pacientes en 4 grupos balanceados (ntile (4)) en función de su fecha de nacimiento (de mayor a menor edad).
select 
    ntile(4) over (order by pacientes.fecha_nacimiento asc) as cuartil_edad,
    pacientes.id_paciente,
    concat(pacientes.nombre, ' ', pacientes.apellido) as paciente,
    pacientes.fecha_nacimiento
from pacientes;

-- 6. distribución balanceada de médicos: dividir el listado de médicos en 2 grupos de trabajo equitativos (ntile(2)) ordenados por su id_medico.
select 
    ntile(2) over (order by medicos.id_medico asc) as grupo_trabajo,
    medicos.id_medico,
    concat(medicos.nombre, ' ', medicos.apellido) as medico
from medicos;

-- 7. primera cita histórica por paciente (filtro con cte): utilizar una cte con row_number() para obtener únicamente el registro de la primera cita médica que tuvo cada paciente en la historia del sistema.
with primera_cita_por_paciente as (
    select 
        pacientes.id_paciente,
        concat(pacientes.nombre, ' ', pacientes.apellido) as paciente,
        citas.id_cita,
        citas.fecha_hora,
        citas.estado,
        row_number() over (
            partition by pacientes.id_paciente 
            order by citas.fecha_hora asc
        ) as numero_fila
    from pacientes
    inner join citas on pacientes.id_paciente = citas.id_paciente
)
select 
    primera_cita_por_paciente.id_paciente,
    primera_cita_por_paciente.paciente,
    primera_cita_por_paciente.id_cita,
    primera_cita_por_paciente.fecha_hora,
    primera_cita_por_paciente.estado
from primera_cita_por_paciente
where primera_cita_por_paciente.numero_fila = 1;

-- 8. última cita agendada por médico (filtro con cte): utilizar una cte con row_number() para extraer de forma precisa la cita médica más reciente o futura que tiene programada cada médico.
with ultima_cita_por_medico as (
    select 
        medicos.id_medico,
        concat(medicos.nombre, ' ', medicos.apellido) as medico,
        citas.id_cita,
        citas.fecha_hora,
        citas.estado,
        row_number() over (
            partition by medicos.id_medico 
            order by citas.fecha_hora desc
        ) as numero_fila
    from medicos
    inner join citas on medicos.id_medico = citas.id_medico
)
select 
    ultima_cita_por_medico.id_medico,
    ultima_cita_por_medico.medico,
    ultima_cita_por_medico.id_cita,
    ultima_cita_por_medico.fecha_hora,
    ultima_cita_por_medico.estado
from ultima_cita_por_medico
where ultima_cita_por_medico.numero_fila = 1;


-- ========================================================================
-- nivel 2: desplazamiento y navegación temporal (lag, lead, first_value, last_value)
-- ========================================================================

-- 9. identificador de cita anterior: mostrar para cada cita el id_cita de la cita inmediatamente anterior del mismo paciente utilizando lag().
select 
    citas.id_paciente,
    citas.id_cita as id_cita_actual,
    citas.fecha_hora,
    lag(citas.id_cita, 1) over (
        partition by citas.id_paciente 
        order by citas.fecha_hora asc
    ) as id_cita_anterior
from citas
where citas.id_paciente is not null;

-- 10. seguimiento del estado de la siguiente cita: mostrar cada cita junto con el estado de la cita siguiente del mismo paciente utilizando lead().
select 
    citas.id_paciente,
    citas.id_cita,
    citas.fecha_hora,
    citas.estado as estado_actual,
    lead(citas.estado, 1) over (
        partition by citas.id_paciente 
        order by citas.fecha_hora asc
    ) as estado_proxima_cita
from citas
where citas.id_paciente is not null;

-- 11. análisis de intervalos y variación de costo: para las citas consecutivas del paciente 1, calcular mediante lag() los días transcurridos entre citas (timestampdiff) y la diferencia de costo (costo_actual - costo_previo).
select 
    citas.id_cita,
    citas.fecha_hora as fecha_actual,
    especialidades.costo as costo_actual,
    lag(citas.fecha_hora, 1) over (
        order by citas.fecha_hora asc
    ) as fecha_previa,
    timestampdiff(
        day, 
        lag(citas.fecha_hora, 1) over (order by citas.fecha_hora asc), 
        citas.fecha_hora
    ) as dias_desde_cita_anterior,
    especialidades.costo - lag(especialidades.costo, 1) over (
        order by citas.fecha_hora asc
    ) as variacion_costo
from citas
inner join medicos on citas.id_medico = medicos.id_medico
inner join especialidades on medicos.id_especialidad = especialidades.id_especialidad
where citas.id_paciente = 1;

-- 12. fecha de inauguración médica: mostrar para cada cita la fecha de la primera cita histórica de ese médico utilizando first_value() particionado por id_medico.
select 
    citas.id_medico,
    citas.id_cita,
    citas.fecha_hora as fecha_cita_actual,
    first_value(citas.fecha_hora) over (
        partition by citas.id_medico 
        order by citas.fecha_hora asc
    ) as fecha_primera_cita_medica
from citas
where citas.id_medico is not null;

-- 13. última cita agendada del paciente (marco extendido): mostrar para cada paciente la fecha de su última cita agendada utilizando last_value() con el marco de ventana completo (rows between unbounded preceding and unbounded following).
select 
    citas.id_paciente,
    citas.id_cita,
    citas.fecha_hora as fecha_cita_actual,
    last_value(citas.fecha_hora) over (
        partition by citas.id_paciente 
        order by citas.fecha_hora asc 
        rows between unbounded preceding and unbounded following
    ) as fecha_ultima_cita_paciente
from citas
where citas.id_paciente is not null;

-- 14. trazabilidad de diagnósticos: en la tabla historiales_medicos, mostrar el diagnóstico actual junto con el diagnóstico emitido en la consulta anterior utilizando lag().
select 
    historiales_medicos.id_historial,
    historiales_medicos.id_cita,
    historiales_medicos.diagnostico as diagnostico_actual,
    lag(historiales_medicos.diagnostico, 1) over (
        partition by citas.id_paciente 
        order by historiales_medicos.fecha_registro asc
    ) as diagnostico_previo
from historiales_medicos
inner join citas on historiales_medicos.id_cita = citas.id_cita;


-- ========================================================================
-- nivel 3: agregaciones en ventana, totales acumulados y analítica (sum, count, avg, min, max)
-- ========================================================================

-- 15. distribución por estado de cita: mostrar cada cita junto con el conteo total de citas que pertenecen a su mismo estado (count sobre partición por estado).
select 
    citas.id_cita,
    citas.fecha_hora,
    citas.estado,
    count(citas.id_cita) over (
        partition by citas.estado
    ) as total_citas_mismo_estado
from citas;

-- 16. facturación acumulada progresiva (running total): calcular la recaudación financiera acumulada en el tiempo de las citas completadas sumando el costo de la especialidad (sum(costo) over(order by fecha_hora rows between unbounded preceding and current row)).
select 
    citas.id_cita,
    citas.fecha_hora,
    especialidades.nombre as especialidad,
    especialidades.costo as valor_consulta,
    sum(especialidades.costo) over (
        order by citas.fecha_hora asc 
        rows between unbounded preceding and current row
    ) as recaudacion_acumulada
from citas
inner join medicos on citas.id_medico = medicos.id_medico
inner join especialidades on medicos.id_especialidad = especialidades.id_especialidad
where citas.estado = 'completada';

-- 17. total de colegas por especialidad: listar cada médico junto con el número total de profesionales que ejercen en su misma especialidad (count particionado por id_especialidad).
select 
    medicos.id_medico,
    concat(medicos.nombre, ' ', medicos.apellido) as medico,
    medicos.id_especialidad,
    count(medicos.id_medico) over (
        partition by medicos.id_especialidad
    ) as total_profesionales_especialidad
from medicos;

-- 18. límites temporales del sistema: listar las citas mostrando en dos columnas calculadas paralelas la fecha de la primera cita global (min) y la fecha de la última cita global (max) de la clínica.
select 
    citas.id_cita,
    citas.fecha_hora,
    min(citas.fecha_hora) over () as primera_cita_historica_global,
    max(citas.fecha_hora) over () as ultima_cita_programada_global
from citas;

-- 19. gasto histórico por paciente: mostrar cada cita junto con el total global de dinero invertido históricamente por ese paciente (sum(costo) over(partition by id_paciente)).
select 
    citas.id_cita,
    citas.id_paciente,
    citas.fecha_hora,
    especialidades.costo as valor_cita_actual,
    sum(especialidades.costo) over (
        partition by citas.id_paciente
    ) as gasto_total_historico_paciente
from citas
inner join medicos on citas.id_medico = medicos.id_medico
inner join especialidades on medicos.id_especialidad = especialidades.id_especialidad;

-- 20. médicos de alto rendimiento (cte + ventana): utilizar una cte con funciones de ventana para clasificar y filtrar a los médicos cuya facturación total acumulada supera el promedio general de ingresos por médico en la clínica.
with facturacion_por_medico as (
    select 
        medicos.id_medico,
        concat(medicos.nombre, ' ', medicos.apellido) as medico,
        sum(especialidades.costo) as total_facturado
    from medicos
    inner join citas on medicos.id_medico = citas.id_medico
    inner join especialidades on medicos.id_especialidad = especialidades.id_especialidad
    where citas.estado = 'completada'
    group by medicos.id_medico, medicos.nombre, medicos.apellido
),
analisis_promedio_clinica as (
    select 
        facturacion_por_medico.id_medico,
        facturacion_por_medico.medico,
        facturacion_por_medico.total_facturado,
        avg(facturacion_por_medico.total_facturado) over () as promedio_general
    from facturacion_por_medico
)
select 
    analisis_promedio_clinica.id_medico,
    analisis_promedio_clinica.medico,
    analisis_promedio_clinica.total_facturado,
    analisis_promedio_clinica.promedio_general as promedio_clinica
from analisis_promedio_clinica
where analisis_promedio_clinica.total_facturado > analisis_promedio_clinica.promedio_general
order by analisis_promedio_clinica.total_facturado desc;