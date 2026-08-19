========================================================================
MÓDULO 9: OPERACIONES DE CONJUNTOS (SET OPERATIONS) - CONCEPTOS CLAVE
========================================================================

Las operaciones de conjuntos permiten combinar o comparar VERTICALMENTE
(apilando o filtrando flujos de filas) los resultados de dos o más consultas
SELECT independientes.

A diferencia de los JOINS (que unen tablas de forma HORIZONTAL agregando
columnas basadas en llaves foráneas), las operaciones de conjuntos trabajan
sobre el ÁLGEBRA DE CONJUNTOS (Unión, Intersección y Diferencia).

REGLAS DE COMPATIBILIDAD OBLIGATORIAS:
1. Mismo número de columnas en cada consulta SELECT.
2. Tipos de datos compatibles en la misma posición de columna.
3. Los nombres finales de las columnas los define la PRIMERA consulta.
4. El ORDER BY general solo se ubica al final de toda la sentencia.

OPERADORES FUNDAMENTALES:
----------------------------------
1. UNION (Unión con eliminación de duplicados - A ∪ B):
   Combina los flujos de filas de ambas consultas y elimina automáticamente
   los registros repetidos (aplica una reducción única).

2. UNION ALL (Unión preservando duplicados - A + B):
   Concatena los resultados tal cual vienen, manteniendo repeticiones.

   Es computacionalmente el más rápido al no requerir ordenamiento ni deduplicación.

3. INTERSECCIÓN DE CONJUNTOS (A ∩ B):
   Obtiene los elementos que pertenecen SIMULTÁNEAMENTE al conjunto A y al conjunto B.
   En MySQL se expresa de forma universal y robusta mediante pertenencia lógica:
   'WHERE columna IN (SELECT ...)'.

4. DIFERENCIA DE CONJUNTOS (A - B):
   Obtiene los elementos que existen en el conjunto A pero que NO están
   en el conjunto B. En MySQL se expresa mediante exclusión lógica:
   'WHERE columna NOT IN (SELECT ...)'.
========================================================================
*/

-- =====================================================================
-- MÓDULO 9: OPERACIONES DE CONJUNTOS - EJEMPLOS EXPLICADOS
-- =====================================================================

-- Ejemplo 1: UNION (Consolidación vertical sin duplicados)
-- Enunciado: Crear un directorio unificado con los nombres y apellidos de todas
--            las personas (pacientes y médicos), indicando su rol.
-- Explicación: Apila las filas de pacientes y médicos. Si existiera una persona
--              con el mismo nombre, apellido y rol en ambas tablas, UNION
--              la reducirá a una sola fila.

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
order by nombre asc, apellido asc;

-- Ejemplo 2 UNION ALL (Consolidación vertical con duplicados)
-- Enunciado: Listar todos los nombres de pila de pacientes y médicos sin deduplicar.
-- Explicacion: Conserva cada fila individualmente. Nombres repetidos (e]. Carlos, Ana)
-- apareceran tantas veces como existan en ambas tablas.

select pacientes.nombre from pacientes
union all 
select medicos.nombre from medicos
order by nombre;

-- Ejemplo 3: INTERSECCIÓN DE CONJUNTOS (Lógica de Pertenencia A ∩ B con IN)
-- Enunciado: Encontrar los nombres de pila que existen simultáneamente
--            tanto en la tabla pacientes como en la tabla médicos.
-- Explicación: Evalúa el conjunto de nombres de pacientes y conserva únicamente
--              aquellos que también forman parte del subconjunto de médicos.

select distinct pacientes.nombre
from pacientes
where pacientes.nombre in (select medicos.nombre from medicos);

-- Ejemplo 4: DIFERENCIA DE CONJUNTOS (Lógica de Exclusión A - B con NOT IN)
-- Enunciado: Encontrar los pacientes registrados que no figuran en ninguna cita.
-- Explicación: Toma el conjunto total de id_paciente de Pacientes y le resta
--              aquellos que están presentes en el conjunto de Citas.
-------------------------------------------------------------------------

select
    pacientes.id_paciente,
    pacientes.nombre,
    pacientes.apellido
from pacientes
where pacientes.id_paciente not in (
    select citas.id_paciente
    from citas
    where citas.id_paciente is not null
);