-- 1
-- verificar
select * 
from recetas 
where id_receta = 20;

-- eliminar 
delete from recetas 
where id_receta = 20;

-- comprobacion 
select * 
from recetas;

-- 2
-- verificar
select *
from citas
where id_cita = 50;

-- eliminar
delete from citas
where id_cita = 50;

-- verificacion
select *
from citas;


-- 3
-- verificar
select *
from citas
where id_cita = 19;

-- eliminar
delete from citas
where id_cita = 19;

-- verificacion
select *
from citas;

-- 4
-- verificar
select citas.id_cita, citas.id_paciente, citas.id_medico, especialidades.nombre, citas.estado
from citas, medicos, especialidades
where citas.id_medico = medicos.id_medico
  and medicos.id_especialidad = especialidades.id_especialidad
  and citas.id_cita = 24;

-- eliminar
delete from citas
where id_cita = 24;


-- verificacion
select *
from citas;

-- 5
-- Verificacion
select 
pacientes.id_paciente, 
pacientes.nombre, 
pacientes.apellido, 
pacientes.telefono, 
citas.id_cita
from pacientes
left join citas on pacientes.id_paciente = citas.id_paciente
where pacientes.id_paciente = 29;

-- Borrar
delete from pacientes where id_paciente = 29;

-- Verificar otra vez
select * from pacientes where id_paciente = 29;

-- 6
-- Verificacion
select 
pacientes.id_paciente, 
pacientes.nombre, 
pacientes.apellido, 
pacientes.telefono, 
citas.id_cita
from pacientes
left join citas on pacientes.id_paciente = citas.id_paciente where pacientes.id_paciente = 30;

-- Borrar
delete from pacientes where id_paciente = 30;

-- Volver a verificar
select * from pacientes where id_paciente = 30;

-- 7: 
-- Verificar
select 
medicos.id_medico, 
medicos.nombre, 
medicos.apellido, 
citas.id_cita
from medicos
left join citas on medicos.id_medico = citas.id_medico
where medicos.id_medico = 17;

-- borrado:
delete from medicos where id_medico = 17;

-- verificar despues:
select 
medicos.id_medico, 
medicos.nombre, 
medicos.apellido, 
citas.id_cita
from medicos
left join citas on medicos.id_medico = citas.id_medico
where medicos.id_medico = 17;

-- 8
-- Verificar
select 
medicos.id_medico, 
medicos.nombre, 
medicos.apellido, 
citas.id_cita
from medicos  
left join citas on medicos.id_medico = citas.id_medico where medicos.id_medico = 18;

-- borrarlo
delete from medicos where id_medico = 18;

-- verificar despues:
select 
medicos.id_medico, 
medicos.nombre, 
medicos.apellido, 
citas.id_cita
from medicos  
left join citas on medicos.id_medico = citas.id_medico where medicos.id_medico = 18;

-- 9.
-- Veificar
select *  from citas where id_cita = 5;

-- Borrar
delete from citas
	where id_cita = 5;
    
-- Verificar de nuevo
select *  from citas where id_cita = 5;

-- 10. 
-- Veificar
select *  from citas where id_cita = 11;

-- Borrar
delete from citas
	where id_cita = 11;
    
-- Verificar de nuevo
select *  from citas where id_cita = 11;

-- 11. 
-- Veificar
select *  from citas where id_cita = 49;

-- Borrar
delete from citas 
	where id_cita = 49 and id_paciente is null;
    
-- Verificar de nuevo
select *  from citas where id_cita = 49;

-- 12.
-- Veificar
select *  from citas where id_cita = 48;

-- Borrar
delete from citas 
	where id_cita = 48 and id_paciente is null;
    
-- Verificar de nuevo
select *  from citas where id_cita = 48;

-- 13.
-- Verificar antes:
select id_receta, id_cita, id_medicamento, indicaciones from recetas where id_receta = 19;
-- Ejecutar borrado:
delete from recetas where id_receta = 19;
-- Verificar despues:
select id_receta, id_cita, id_medicamento, indicaciones from recetas where id_receta = 19;


-- 14.
-- Verificar antes:
select id_hospitalizacion, id_paciente, fecha_ingreso, fecha_alta, diagnostico, estado from hospitalizaciones where id_hospitalizacion = 1;
-- Ejecutar borrado:
delete from hospitalizaciones where id_hospitalizacion = 1;
-- Verificar despues:
select id_hospitalizacion, id_paciente, fecha_ingreso, fecha_alta, diagnostico, estado from hospitalizaciones where id_hospitalizacion = 1;

-- 15.
-- Verificar antes:
select id_hospitalizacion, id_paciente, fecha_ingreso, fecha_alta, diagnostico, estado from hospitalizaciones where id_hospitalizacion = 2 and estado = 'Alta médica';
-- Ejecutar borrado:
delete from hospitalizaciones where id_hospitalizacion = 2 and estado = 'Alta médica';
-- Verificar despues:
select id_hospitalizacion, id_paciente, fecha_ingreso, fecha_alta, diagnostico, estado from hospitalizaciones where id_hospitalizacion = 2;

-- 16.
create table if not exists auditoria_tarifas (
    id_auditoria int auto_increment primary key,
    especialidad varchar(80) not null,
    tarifa_anterior decimal(10,2) not null,
    fecha_cambio datetime default current_timestamp
) engine=innodb;

insert into auditoria_tarifas (especialidad, tarifa_anterior) values
('Medicina General', 45000.00),
('Pediatría', 65000.00),
('Cardiología', 100000.00);

-- Verificar antes:
select * from auditoria_tarifas;

-- Ejecutar:
truncate table auditoria_tarifas;

-- Verificar después:
select * from auditoria_tarifas;


-- 17
-- 1. Validar antes 
SELECT * FROM auditoria_tarifas;

-- 2. Modificación
INSERT INTO auditoria_tarifas (especialidad, tarifa_anterior) 
VALUES ('Dermatología', 75000.00);

-- 3. Validar nuevamente 
SELECT id_auditoria, especialidad, tarifa_anterior, fecha_cambio 
FROM auditoria_tarifas;

-- 18
-- 1. Validar antes 
SELECT id_medico, nombre, apellido, activo 
FROM medicos 
WHERE id_medico = 16;

-- 2. Modificación 
UPDATE medicos 
SET activo = 0 
WHERE id_medico = 16;

-- 3. Validar nuevamente 
SELECT id_medico, nombre, apellido, activo 
FROM medicos 
WHERE id_medico = 16;

-- 19
--  Validar antes
SELECT citas.id_cita, citas.id_medico, medicos.nombre, medicos.apellido, medicos.activo
FROM citas
INNER JOIN medicos ON citas.id_medico = medicos.id_medico
WHERE medicos.activo = 0;

--  Consulta 
SELECT 
    citas.id_cita,
    citas.id_paciente,
    citas.fecha_hora,
    citas.motivo,
    citas.estado,
    medicos.id_medico,
    medicos.nombre AS nombre_medico,
    medicos.apellido AS apellido_medico
FROM citas
INNER JOIN medicos ON citas.id_medico = medicos.id_medico
WHERE medicos.activo = 1;

-- 3. Validar nuevamente
SELECT citas.id_cita, medicos.id_medico, medicos.activo
FROM citas
INNER JOIN medicos ON citas.id_medico = medicos.id_medico
WHERE medicos.activo = 1 AND medicos.id_medico = 16;

-- 20
-- 1. Validar antes 
SELECT id_medico, nombre, apellido, activo 
FROM medicos 
WHERE id_medico = 16;

-- 2. Modificación 
UPDATE medicos 
SET activo = 1 
WHERE id_medico = 16;

-- 3. Validar nuevamente
SELECT id_medico, nombre, apellido, activo 
FROM medicos 
WHERE id_medico = 16;