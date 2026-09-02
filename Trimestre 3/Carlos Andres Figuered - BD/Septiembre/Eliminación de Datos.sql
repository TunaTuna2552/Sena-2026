-- ----------------------------------------------------------------------
-- MÓDULO 13: ELIMINACIÓN DE DATOS (DELETE Y TRUNCATE) EN PROFUNDIDAD
-- BASE DE DATOS: hospital_universitario
-- ----------------------------------------------------------------------

DELETE elimina filas individuales de una tabla evaluando condiciones fila por fila.
TRUNCATE TABLE es una sentencia DDL de vaciado completo y reinicio estructural.

DIFERENCIAS TÉCNICAS FUNDAMENTALES:
---------------------------------
Aspecto              DELETE                                 TRUNCATE TABLE
-------------------------------------------------------------------------------------------
Categoría            DML (Data Manipulation Language)       DDL (Data Definition Language)
Cláusula WHERE       Permitida (borrado selectivo)          NO permitida (borra todo)
AUTO_INCREMENT       Conserva el último valor generado      Reinicia el contador en 1
Rendimiento          Lento en tablas masivas                Ultrarrápido (desasigna páginas)
Transaccionalidad    Genera logs por fila (Rollback)        No genera logs individuales
Integridad FK        Respeta restricciones y cascada        Falla si hay tablas hijas con FK

INTEGRIDAD REFERENCIAL Y BORRADO:
ON DELETE RESTRICT / NO ACTION : Impide borrar al padre si tiene hijos (Error 1451).
ON DELETE CASCADE              : Borra al padre y automáticamente elimina a los hijos.
ON DELETE SET NULL             : Borra al padre y coloca NULL en la FK de los hijos.

PATRÓN DE BORRADO LÓGICO (SOFT DELETE):
En arquitecturas de producción rara vez se ejecuta un Borrado físico (Hard Delete).
Se utiliza una columna bandera (ej. `activo TINYINT(1) DEFAULT 1` o `fecha_eliminado DATETIME NULL`).
El "borrado" se implementa como un UPDATE tabla SET activo = 0 WHERE id = 'X'.

-- =========================================================================

-- Ejemplo 1: Borrado Fisico Simple por Llave Primaria (DELETE con WHERE exacto)
create table if not exists demo_bitacora (
	id_bitacora int auto_increment primary key,
    evento varchar(100),
    fecha datetime default current_timestamp
);
insert into demo_bitacora (evento) values ('Registro de inicio de sesion');
-- inspeccionar antes:
select id_bitacora, evento, fecha from demo_bitacora where id_bitacora = 1;

-- Ejecutar borrado:
delete from demo_bitacora where id_bitacora = 1;

-- Verificar despues (0 filas):
select id_bitacora, evento, fecha from demo_bitacora where id_bitacora = 1;

-- Ejemplo 2: Borrado con Rango de Fechas (DELETE masivo condicional)

create table if not exists demo_citas_historicas as select * from citas;

-- Inspeccionar antes:
select count(*) as total_mayo from demo_citas_historicas where fecha_hora < '2026-06-01 00:00:00';

-- Borrar citas del mes de mayo:
delete from demo_citas_historicas where fecha_hora < '2026-06-01 00:00:00';

-- Verificar:
select count(*) as total_mayo from demo_citas_historicas where fecha_hora < '2026-06-01 00:00:00';

-- Ejemplo 3: Borrado Seguro Evaluando Integridad Referencial (NOT EXISTS)
-- Explicacion: Borra la especialidad 100 solo si ningun médico depende de ella.

insert into especialidades (id_especialidad, id_departamento, nombre, tarifa_base)
values (100, 1, 'Infectologia Demo', 95000.00);

-- 1. Inspeccionar antes:
select id_especialidad, nombre from especialidades where id_especialidad = 100;
 
 -- Borrar si no tiene dependencia
delete from especialidades
where id_especialidad = 100
	and not exists (select 1 from medicos where medicos.id_especialidad = especialidades.id_especialidad);
    
-- Verificar despues:
select id_especialidad, nombre from especialidades where id_especialidades = 100;


-- Ejemplo 4: DELETE con INNER JOIN (Borrado Cruzado entre Tablas Relacionadas)
-- Explicacion: Elimina recetas de la tabla temporal cuyas citas asociadas fueron canceladas.

create table if not exists demo_recetas as select * from recetas;

-- Inspeccionar:
select demo_recetas.id_receta, demo_recetas.id_cita, citas.estado
from demo_recetas
inner join citas on demo_recetas.id_cita = citas.id_cita
where citas.estado = 'Cancelada';

-- 
delete demo_recetas
from demo_recetas
inner join citas on demo_recetas.id_cita = citas.id_cita
where citas.estado = 'Cancelada';

-- 
select demo_recetas.id_receta, demo_recetas.id_cita
from demo_recetas
inner join cita on demo_recetas.id_cita = citas.id_cita
where citas.estado = 'Cancelada';



-- ---------------------------------------------------------------------
-- Ejemplo 5: DELETE con Subconsulta NOT IN (Limpieza de Padres sin Hijos)
-- ---------------------------------------------------------------------
insert into especialidades (id_especialidad, id_departamento, nombre, tarifa_base)
values (101, 1, 'Toxicología Demo', 88000.00);

-- 1. Inspeccionar antes:
select id_especialidad, nombre from especialidades where id_especialidad = 101;

-- 2. Borrado con NOT IN:
delete from especialidades
where id_especialidad not in (select distinct id_especialidad from medicos where id_especialidad is not null)
  and id_especialidad = 101;

-- 3. Verificar después:
select id_especialidad, nombre from especialidades where id_especialidad = 101;


-- ---------------------------------------------------------------------
-- Ejemplo 6: DELETE con Subconsulta Correlacionada (Pacientes sin actividad)
-- ---------------------------------------------------------------------
create table if not exists demo_pacientes as select * from pacientes;

-- 1. Inspeccionar antes:
select id_paciente, nombre, apellido from demo_pacientes
where not exists (select 1 from citas where citas.id_paciente = demo_pacientes.id_paciente);

-- 2. Borrado:
delete from demo_pacientes
where not exists (select 1 from citas where citas.id_paciente = demo_pacientes.id_paciente);

-- 3. Verificar después:
select id_paciente, nombre, apellido from demo_pacientes
where not exists (select 1 from citas where citas.id_paciente = demo_pacientes.id_paciente);


-- ---------------------------------------------------------------------
-- Ejemplo 7: Borrado Acotado con ORDER BY y LIMIT
-- Explicación: Elimina únicamente el registro más antiguo por fecha.
-- ---------------------------------------------------------------------
create table if not exists demo_logs (
    id_log int auto_increment primary key,
    nivel varchar(10),
    fecha datetime
);

insert into demo_logs (nivel, fecha) values
('WARNING', '2026-01-01 08:00:00'),
('ERROR',   '2026-01-02 09:00:00'),
('INFO',    '2026-01-03 10:00:00');

-- 1. Inspeccionar antes:
select * from demo_logs order by fecha asc limit 1;

-- 2. Borrado acotado al primer registro:
delete from demo_logs order by fecha asc limit 1;

-- 3. Verificar después:
select * from demo_logs;


-- ---------------------------------------------------------------------
-- Ejemplo 8: Vaciado Instantáneo con TRUNCATE TABLE (DDL)
-- ---------------------------------------------------------------------
create table if not exists demo_auditoria_recaudo (
    id_auditoria int auto_increment primary key,
    monto decimal(10,2)
);

insert into demo_auditoria_recaudo (monto) values (50000.00), (120000.00), (85000.00);

-- 1. Inspeccionar antes:
select * from demo_auditoria_recaudo;

-- 2. Vaciado completo y reseteo estructural:
truncate table demo_auditoria_recaudo;

-- 3. Verificar después (Tabla vacía):
select * from demo_auditoria_recaudo;


-- ---------------------------------------------------------------------
-- Ejemplo 9: Verificación de Reinicio de AUTO_INCREMENT tras TRUNCATE
-- ---------------------------------------------------------------------
-- 1. Insertar nuevo registro tras el TRUNCATE:
insert into demo_auditoria_recaudo (monto) values (99000.00);

-- 2. Verificar que el ID generado vuelve a ser 1:
select id_auditoria, monto from demo_auditoria_recaudo;


-- ---------------------------------------------------------------------
-- Ejemplo 10: Patrón de Borrado Lógico (Soft Delete) y Restauración
-- Explicación: Se cambia la bandera de disponibilidad sin destruir el registro físico.
-- ---------------------------------------------------------------------
-- 1. Inspeccionar estado activo original:
select id_paciente, nombre, apellido, activo from pacientes where id_paciente = 28;

-- 2. Ejecutar baja lógica:
update pacientes set activo = 0 where id_paciente = 28;

-- 3. Verificar baja lógica:
select id_paciente, nombre, apellido, activo from pacientes where id_paciente = 28;

-- 4. Reactivación / Restauración operativa:
update pacientes set activo = 1 where id_paciente = 28;

-- 5. Comprobación final:
select id_paciente, nombre, apellido, activo from pacientes where id_paciente = 28;