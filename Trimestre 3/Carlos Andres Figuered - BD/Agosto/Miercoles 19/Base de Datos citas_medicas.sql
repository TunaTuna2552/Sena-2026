-- ============================================================
-- 1. CREACIÓN DE LA BD
-- ============================================================
drop database if exists citas_medicas2;
create database citas_medicas2;
use citas_medicas2;

-- ============================================================
-- 2. CREACIÓN DE LAS TABLAS (SIN RESTRICCIONES FK)
-- ============================================================

create table especialidades (
    id_especialidad int auto_increment primary key,
    nombre varchar(50) not null unique,
    descripcion varchar(200)
);

create table pacientes (
    id_paciente int auto_increment primary key,
    documento_identidad varchar(20) not null unique,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    fecha_nacimiento date not null,
    telefono varchar(15)
);

create table medicos (
    id_medico int auto_increment primary key,
    num_colegiado varchar(20) not null unique,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    id_especialidad int -- Sin FK: permite especialidades inexistentes
);

create table citas (
    id_cita int auto_increment primary key,
    id_paciente int, -- Sin FK: permite citas con pacientes inexistentes
    id_medico int,   -- Sin FK: permite citas con médicos inexistentes
    fecha_hora datetime not null,
    estado varchar(20) default 'Programada'
);

create table historiales_medicos (
    id_historial int auto_increment primary key,
    id_cita int,     -- Sin FK: permite historiales de citas inexistentes
    diagnostico text not null,
    tratamiento text,
    fecha_registro timestamp default current_timestamp
);

-- ============================================================
-- 3. INSERCIÓN DE DATOS PEDAGÓGICOS
-- ============================================================

-- Especialidades: 1 al 6 tienen médicos. 7 y 8 NO tienen médicos.
insert into especialidades (nombre, descripcion) values
('Medicina General', 'Atención médica primaria e integral'),
('Pediatría', 'Atención médica de bebés, niños y adolescentes'),
('Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón'),
('Dermatología', 'Cuidado y tratamiento de afecciones en la piel'),
('Traumatología', 'Lesiones traumáticas del sistema musculoesquelético'),
('Neurología', 'Trastornos del sistema nervioso'),
('Oftalmología', 'Cuidado de la visión y salud ocular'),
('Psiquiatría', 'Salud mental y trastornos emocionales');

-- Pacientes: 1 al 15 tienen citas. 16, 17 y 18 NO tienen citas.
insert into pacientes (documento_identidad, nombre, apellido, fecha_nacimiento, telefono) values
('101010101', 'Carlos', 'Gómez', '1985-04-12', '555-0101'),
('101010102', 'Ana', 'Martínez', '1992-08-25', '555-0102'),
('101010103', 'Luis', 'Rodríguez', '1978-11-03', '555-0103'),
('101010104', 'María', 'Fernández', '2005-01-15', '555-0104'),
('101010105', 'Jorge', 'López', '1990-06-30', '555-0105'),
('101010106', 'Lucía', 'Pérez', '2012-09-18', '555-0106'),
('101010107', 'Pedro', 'Sánchez', '1965-03-22', '555-0107'),
('101010108', 'Sofia', 'Torres', '1998-12-05', '555-0108'),
('101010109', 'Diego', 'Ramírez', '2018-07-10', '555-0109'),
('101010110', 'Elena', 'Flores', '1983-05-19', '555-0110'),
('101010111', 'Gabriel', 'Castro', '1975-10-08', '555-0111'),
('101010112', 'Valentina', 'Morales', '2001-02-28', '555-0112'),
('101010113', 'Mateo', 'Herrera', '1995-11-14', '555-0113'),
('101010114', 'Isabella', 'Vargas', '2010-04-03', '555-0114'),
('101010115', 'Andrés', 'Mendoza', '1988-09-27', '555-0115'),
('101010116', 'Camila', 'Rojas', '1999-03-14', '555-0116'),
('101010117', 'Felipe', 'Navas', '2003-11-20', null),
('101010118', 'Diana', 'Cárdenas', '1972-07-08', '555-0118');

-- Médicos: 
-- 1 al 10: tienen especialidades válidas y citas.
-- 11 y 12: especialidades válidas pero SIN citas.
-- 13 y 14: especialidades INEXISTENTES (99 y 100) para probar cruces huérfanos.
insert into medicos (num_colegiado, nombre, apellido, id_especialidad) values
('COL-001', 'Roberto', 'Navarro', 1),
('COL-002', 'Laura', 'Méndez', 1),
('COL-003', 'Patricia', 'Ríos', 2),
('COL-004', 'Fernando', 'Soto', 2),
('COL-005', 'Javier', 'Ortega', 3),
('COL-006', 'Carmen', 'Delgado', 3),
('COL-007', 'Gonzalo', 'Vega', 4),
('COL-008', 'Beatriz', 'Marín', 4),
('COL-009', 'Hugo', 'Peña', 5),
('COL-010', 'Silvia', 'Guerrero', 6),
('COL-011', 'Ernesto', 'Duarte', 1),
('COL-012', 'Mónica', 'Salazar', 2),
('COL-013', 'Andrés', 'Pastrana', 99),
('COL-014', 'Claudia', 'López', 100);

-- Citas:
-- 1 al 32: Citas normales con pacientes y médicos válidos.
-- 33 y 34: Citas con Pacientes INEXISTENTES (99 y 100) -> para evidenciar RIGHT JOIN.
-- 35: Cita con Médico INEXISTENTE (99) y Paciente INEXISTENTE (99).
insert into citas (id_paciente, id_medico, fecha_hora, estado) values
(1, 1, '2026-05-02 09:00:00', 'Completada'),
(2, 3, '2026-05-02 10:00:00', 'Completada'),
(3, 5, '2026-05-03 11:30:00', 'Completada'),
(4, 7, '2026-05-03 14:00:00', 'Completada'),
(5, 9, '2026-05-04 08:30:00', 'Cancelada'),
(6, 3, '2026-05-04 09:30:00', 'Completada'),
(7, 5, '2026-05-05 10:30:00', 'Completada'),
(8, 1, '2026-05-05 11:00:00', 'Completada'),
(9, 4, '2026-05-06 12:00:00', 'Completada'),
(10, 8, '2026-05-06 15:00:00', 'Completada'),
(11, 10, '2026-05-07 09:00:00', 'Cancelada'),
(12, 2, '2026-05-07 10:00:00', 'Completada'),
(13, 6, '2026-05-08 11:00:00', 'Completada'),
(14, 4, '2026-05-08 16:00:00', 'Completada'),
(15, 9, '2026-05-09 08:00:00', 'Completada'),
(1, 2, '2026-06-01 09:00:00', 'Completada'),
(2, 8, '2026-06-01 10:30:00', 'Completada'),
(3, 6, '2026-06-02 11:00:00', 'Completada'),
(4, 1, '2026-06-02 14:30:00', 'No asistió'),
(5, 10, '2026-06-03 15:00:00', 'Completada'),
(6, 4, '2026-06-03 16:00:00', 'Completada'),
(7, 9, '2026-06-04 09:00:00', 'Completada'),
(8, 5, '2026-06-04 10:00:00', 'Completada'),
(9, 3, '2026-06-05 11:30:00', 'No asistió'),
(10, 7, '2026-06-05 12:30:00', 'Completada'),
(11, 1, '2026-07-10 08:30:00', 'Programada'),
(12, 5, '2026-07-10 09:30:00', 'Programada'),
(13, 3, '2026-07-11 10:00:00', 'Programada'),
(14, 7, '2026-07-11 11:00:00', 'Programada'),
(15, 2, '2026-07-12 14:00:00', 'Programada'),
(1, 6, '2026-07-12 15:00:00', 'Programada'),
(2, 9, '2026-07-13 16:00:00', 'Programada'),
(99, 1, '2026-08-01 10:00:00', 'Programada'),  -- Paciente 99 NO existe
(100, 2, '2026-08-02 11:00:00', 'Programada'), -- Paciente 100 NO existe
(99, 99, '2026-08-03 12:00:00', 'Cancelada');  -- Paciente 99 y Médico 99 NO existen

-- Historiales Médicos:
insert into historiales_medicos (id_cita, diagnostico, tratamiento) values
(1, 'Chequeo general preventivo. Cuadro de salud estable.', 'Mantener dieta balanceada y ejercicio moderado.'),
(2, 'Control pediátrico de rutina. Crecimiento adecuado.', 'Continuar con esquema de vacunación.'),
(3, 'Hipertensión leve detectada.', 'Dieta baja en sodio y control de presión en 15 días.'),
(4, 'Dermatitis de contacto en antebrazo.', 'Aplicar crema con hidrocortisona por 7 días.'),
(6, 'Faringitis aguda.', 'Paracetamol 500mg cada 8 horas por 5 días.'),
(7, 'Arritmia leve en evaluación.', 'Se solicita electrocardiograma de control.'),
(8, 'Infección respiratoria alta.', 'Reposo y consumo abundante de líquidos.'),
(9, 'Bronquitis leve.', 'Inhalador de salbutamol según necesidad.'),
(10, 'Acné vulgar moderado.', 'Gel tópico de peróxido de benzoilo.'),
(12, 'Cuadro viral febril.', 'Antipiréticos y control si persiste la fiebre.'),
(13, 'Soplos cardíacos inocentes.', 'Sin tratamiento requerido, revisión en 1 año.'),
(14, 'Gastroenteritis aguda.', 'Suero oral y dieta blanda por 3 días.'),
(15, 'Esguince de tobillo grado 1.', 'Inmovilización ligera y hielo local.'),
(16, 'Control de peso y rutina.', 'Recomendaciones nutricionales.'),
(17, 'Cicatrización adecuada post-tratamiento.', 'Uso diario de protector solar.'),
(18, 'Evaluación de hipertensión. Presión controlada.', 'Continuar con tratamiento previo.'),
(20, 'Cefalea tensional.', 'Ejercicios de postura y analgésicos suaves.'),
(22, 'Lumbalgia por esfuerzo físico.', 'Analgésicos y fisioterapia preventiva.'),
(999, 'Diagnóstico huérfano de prueba.', 'Tratamiento huérfano.'); -- id_cita 999 NO existe