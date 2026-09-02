-- ============================================================================
-- SCRIPT DE CREACIÓN E INSERCIÓN MASIVA: hospital_universitario
-- ============================================================================
drop database if exists hospital_universitario;
create database hospital_universitario character set utf8mb4 collate utf8mb4_unicode_ci;
use hospital_universitario;

-- 1. Departamentos hospitalarios
create table departamentos (
    id_departamento int auto_increment primary key,
    nombre varchar(80) not null,
    edificio varchar(50) not null,
    presupuesto decimal(14,2) not null default 0.00
) engine=innodb;

-- 2. Especialidades médicas
create table especialidades (
    id_especialidad int auto_increment primary key,
    id_departamento int,
    nombre varchar(80) not null,
    tarifa_base decimal(10,2) not null default 50000.00,
    constraint fk_esp_departamento foreign key (id_departamento) 
        references departamentos (id_departamento) on delete set null on update cascade
) engine=innodb;

-- 3. Habitaciones / Camas de hospitalización
create table habitaciones (
    id_habitacion int auto_increment primary key,
    numero_habitacion varchar(10) not null unique,
    piso int not null,
    tipo enum('Individual', 'Doble', 'UCI', 'Suite') not null,
    costo_dia decimal(10,2) not null,
    estado enum('Disponible', 'Ocupada', 'Mantenimiento') not null default 'Disponible'
) engine=innodb;

-- 4. Personal Médico
create table medicos (
    id_medico int auto_increment primary key,
    id_especialidad int,
    nombre varchar(60) not null,
    apellido varchar(60) not null,
    documento varchar(20) not null unique,
    num_colegiado varchar(20) not null unique,
    salario decimal(12,2) not null,
    activo tinyint(1) not null default 1,
    constraint fk_med_especialidad foreign key (id_especialidad) 
        references especialidades (id_especialidad) on delete set null on update cascade
) engine=innodb;

-- 5. Pacientes
create table pacientes (
    id_paciente int auto_increment primary key,
    nombre varchar(60) not null,
    apellido varchar(60) not null,
    documento varchar(20) not null unique,
    fecha_nacimiento date not null,
    genero enum('M', 'F') not null,
    telefono varchar(20),
    ciudad varchar(50) not null,
    activo tinyint(1) not null default 1
) engine=innodb;

-- 6. Farmacia / Medicamentos
create table medicamentos (
    id_medicamento int auto_increment primary key,
    nombre varchar(100) not null,
    presentacion varchar(60) not null,
    stock int not null default 0,
    precio_unitario decimal(10,2) not null
) engine=innodb;

-- 7. Agenda de Citas Médicas
create table citas (
    id_cita int auto_increment primary key,
    id_paciente int,
    id_medico int,
    fecha_hora datetime not null,
    motivo varchar(200) not null,
    estado enum('Programada', 'Completada', 'Cancelada', 'No asistió') not null default 'Programada',
    costo decimal(10,2) not null default 0.00,
    constraint fk_citas_paciente foreign key (id_paciente) 
        references pacientes (id_paciente) on delete cascade on update cascade,
    constraint fk_citas_medico foreign key (id_medico) 
        references medicos (id_medico) on delete set null on update cascade
) engine=innodb;

-- 8. Registro de Hospitalizaciones
create table hospitalizaciones (
    id_hospitalizacion int auto_increment primary key,
    id_paciente int not null,
    id_habitacion int not null,
    fecha_ingreso datetime not null,
    fecha_alta datetime null,
    diagnostico varchar(255) not null,
    estado enum('Activa', 'Alta médica', 'Traslado') not null default 'Activa',
    constraint fk_hosp_paciente foreign key (id_paciente) 
        references pacientes (id_paciente) on delete cascade on update cascade,
    constraint fk_hosp_habitacion foreign key (id_habitacion) 
        references habitaciones (id_habitacion) on delete restrict on update cascade
) engine=innodb;

-- 9. Prescripciones y Recetas
create table recetas (
    id_receta int auto_increment primary key,
    id_cita int not null,
    id_medicamento int not null,
    cantidad int not null,
    indicaciones varchar(255) not null,
    constraint fk_rec_cita foreign key (id_cita) 
        references citas (id_cita) on delete cascade on update cascade,
    constraint fk_rec_medicamento foreign key (id_medicamento) 
        references medicamentos (id_medicamento) on delete restrict on update cascade
) engine=innodb;

-- 10. Facturación y Recaudos
create table facturas (
    id_factura int auto_increment primary key,
    id_paciente int not null,
    id_cita int null,
    fecha_emision datetime not null default current_timestamp,
    monto_total decimal(12,2) not null,
    metodo_pago enum('Efectivo', 'Tarjeta Débito', 'Tarjeta Crédito', 'Transferencia', 'Seguro Médico') not null,
    estado enum('Pagada', 'Pendiente', 'Anulada') not null default 'Pagada',
    constraint fk_fac_paciente foreign key (id_paciente) 
        references pacientes (id_paciente) on delete cascade on update cascade,
    constraint fk_fac_cita foreign key (id_cita) 
        references citas (id_cita) on delete set null on update cascade
) engine=innodb;

-- 11. Auditoría y Registro Transaccional (Para TCL, Triggers y DCL)
create table auditoria_log (
    id_log int auto_increment primary key,
    tabla_afectada varchar(50) not null,
    accion varchar(20) not null,
    registro_id int not null,
    usuario varchar(60) not null default (current_user()),
    fecha_hora datetime not null default current_timestamp,
    detalle text
) engine=innodb;


-- ============================================================================
-- POBLADO MASIVO DE DATOS (SEEDING)
-- ============================================================================

-- 1. Departamentos
insert into departamentos (id_departamento, nombre, edificio, presupuesto) values
(1, 'Medicina Interna y Especialidades', 'Edificio Central A', 450000000.00),
(2, 'Cirugía y Traumatología', 'Torre Quirúrgica B', 800000000.00),
(3, 'Pediatría y Neonatología', 'Pabellón Infantil C', 350000000.00),
(4, 'Gineco-Obstetricia y Maternidad', 'Pabellón Materno D', 400000000.00),
(5, 'Urgencias y Cuidados Críticos', 'Módulo de Urgencias', 950000000.00),
(6, 'Servicios de Diagnóstico y Apoyo', 'Edificio Anexo E', 280000000.00);

-- 2. Especialidades
insert into especialidades (id_especialidad, id_departamento, nombre, tarifa_base) values
(1, 1, 'Medicina General', 50000.00),
(2, 3, 'Pediatría', 70000.00),
(3, 1, 'Cardiología', 110000.00),
(4, 1, 'Dermatología', 85000.00),
(5, 4, 'Ginecología', 90000.00),
(6, 1, 'Neurología', 130000.00),
(7, 2, 'Ortopedia y Traumatología', 100000.00),
(8, 2, 'Oftalmología', 80000.00),
(9, 1, 'Psiquiatría', 95000.00),
(10, 5, 'Medicina de Urgencias', 120000.00),
(11, 6, 'Nutrición y Dietética', 60000.00),      -- Especialidad sin médicos asignados para pruebas
(12, 6, 'Fisioterapia y Rehabilitación', 75000.00); -- Especialidad sin médicos asignados para pruebas

-- 3. Habitaciones
insert into habitaciones (id_habitacion, numero_habitacion, piso, tipo, costo_dia, estado) values
(1, 'HAB-101', 1, 'Individual', 180000.00, 'Ocupada'),
(2, 'HAB-102', 1, 'Individual', 180000.00, 'Disponible'),
(3, 'HAB-103', 1, 'Doble', 120000.00, 'Ocupada'),
(4, 'HAB-201', 2, 'Individual', 190000.00, 'Ocupada'),
(5, 'HAB-202', 2, 'Doble', 130000.00, 'Disponible'),
(6, 'HAB-203', 2, 'Suite', 320000.00, 'Ocupada'),
(7, 'HAB-301', 3, 'UCI', 650000.00, 'Ocupada'),
(8, 'HAB-302', 3, 'UCI', 650000.00, 'Disponible'),
(9, 'HAB-303', 3, 'UCI', 650000.00, 'Mantenimiento'),
(10, 'HAB-401', 4, 'Individual', 200000.00, 'Disponible'),
(11, 'HAB-402', 4, 'Doble', 140000.00, 'Disponible'),
(12, 'HAB-403', 4, 'Suite', 350000.00, 'Disponible'),
(13, 'HAB-501', 5, 'Individual', 210000.00, 'Disponible'),
(14, 'HAB-502', 5, 'Doble', 150000.00, 'Mantenimiento'),
(15, 'HAB-503', 5, 'Suite', 380000.00, 'Disponible');

-- 4. Médicos (18 profesionales)
insert into medicos (id_medico, id_especialidad, nombre, apellido, documento, num_colegiado, salario, activo) values
(1, 1, 'Roberto', 'Navarro', 'DOC-M101', 'COL-001', 5800000.00, 1),
(2, 1, 'Laura', 'Méndez', 'DOC-M102', 'COL-002', 5900000.00, 1),
(3, 2, 'Patricia', 'Ríos', 'DOC-M103', 'COL-003', 6400000.00, 1),
(4, 2, 'Fernando', 'Soto', 'DOC-M104', 'COL-004', 6200000.00, 1),
(5, 3, 'Javier', 'Ortega', 'DOC-M105', 'COL-005', 8500000.00, 1),
(6, 3, 'Carmen', 'Delgado', 'DOC-M106', 'COL-006', 8700000.00, 1),
(7, 4, 'Gonzalo', 'Vega', 'DOC-M107', 'COL-007', 6900000.00, 1),
(8, 4, 'Beatriz', 'Marín', 'DOC-M108', 'COL-008', 7100000.00, 1),
(9, 5, 'Hugo', 'Peña', 'DOC-M109', 'COL-009', 7800000.00, 1),
(10, 6, 'Silvia', 'Guerrero', 'DOC-M110', 'COL-010', 9200000.00, 1),
(11, 7, 'Mauricio', 'Castaño', 'DOC-M111', 'COL-011', 7500000.00, 1),
(12, 8, 'Valeria', 'Osorio', 'DOC-M112', 'COL-012', 6800000.00, 1),
(13, 9, 'Esteban', 'Pardo', 'DOC-M113', 'COL-013', 7200000.00, 1),
(14, 10, 'Adriana', 'Guzmán', 'DOC-M114', 'COL-014', 8900000.00, 1),
(15, 1, 'Ernesto', 'Duarte', 'DOC-M115', 'COL-015', 5600000.00, 1),
(16, 2, 'Mónica', 'Salazar', 'DOC-M116', 'COL-016', 6100000.00, 1),
(17, 1, 'Andrés', 'Pastrana', 'DOC-M117', 'COL-017', 5500000.00, 1), -- Médico sin citas para pruebas
(18, 2, 'Claudia', 'López', 'DOC-M118', 'COL-018', 6000000.00, 1);    -- Médico sin citas para pruebas

-- 5. Pacientes (30 pacientes)
insert into pacientes (id_paciente, nombre, apellido, documento, fecha_nacimiento, genero, telefono, ciudad, activo) values
(1, 'Carlos', 'Gómez', 'CC-1001', '1985-04-12', 'M', '3101112233', 'Bogotá', 1),
(2, 'Ana', 'Martínez', 'CC-1002', '1992-08-25', 'F', '3102223344', 'Mosquera', 1),
(3, 'Luis', 'Rodríguez', 'CC-1003', '1978-01-15', 'M', '3103334455', 'Madrid', 1),
(4, 'María', 'Fernández', 'CC-1004', '1983-11-03', 'F', '3104445566', 'Funza', 1),
(5, 'Jorge', 'López', 'CC-1005', '1990-06-30', 'M', '3105556677', 'Facatativá', 1),
(6, 'Lucía', 'Pérez', 'CC-1006', '1990-06-30', 'F', '3106667788', 'Mosquera', 1),
(7, 'Pedro', 'Sánchez', 'CC-1007', '1965-03-22', 'M', '3107778899', 'Bogotá', 1),
(8, 'Sofia', 'Torres', 'CC-1008', '1995-11-23', 'F', '3108889900', 'Soacha', 1),
(9, 'Diego', 'Ramírez', 'CC-1009', '1995-11-23', 'M', '3109990011', 'Madrid', 1),
(10, 'Elena', 'Flores', 'CC-1010', '1995-11-23', 'F', '3110001122', 'Funza', 1),
(11, 'Gabriel', 'Castro', 'CC-1011', '2000-02-14', 'M', '3111112233', 'Bogotá', 1),
(12, 'Valentina', 'Morales', 'CC-1012', '1998-07-09', 'F', '3112223344', 'Mosquera', 1),
(13, 'Mateo', 'Herrera', 'TI-1013', '2005-12-01', 'M', '3113334455', 'Facatativá', 1),
(14, 'Isabella', 'Vargas', 'TI-1014', '2010-05-18', 'F', '3114445566', 'Madrid', 1),
(15, 'Andrés', 'Mendoza', 'CC-1015', '1988-09-27', 'M', '3115556677', 'Bogotá', 1),
(16, 'Camila', 'Rojas', 'CC-1016', '1993-04-05', 'F', null, 'Funza', 1),         -- Sin teléfono para pruebas
(17, 'Felipe', 'Navas', 'CC-1017', '1980-10-30', 'M', null, 'Mosquera', 1),      -- Sin teléfono para pruebas
(18, 'Diana', 'Cárdenas', 'CC-1018', '1987-12-19', 'F', '3118889900', 'Bogotá', 1),
(19, 'Santiago', 'Bermúdez', 'CC-1019', '1974-05-11', 'M', '3121112233', 'Madrid', 1),
(20, 'Natalia', 'Salcedo', 'CC-1020', '1996-03-08', 'F', '3122223344', 'Soacha', 1),
(21, 'Alejandro', 'Velandia', 'CC-1021', '1982-09-14', 'M', '3123334455', 'Funza', 1),
(22, 'Mariana', 'Duque', 'CC-1022', '1991-12-28', 'F', '3124445566', 'Mosquera', 1),
(23, 'Gustavo', 'Pinzón', 'CC-1023', '1968-07-04', 'M', '3125556677', 'Bogotá', 1),
(24, 'Paola', 'Rincón', 'CC-1024', '1986-02-19', 'F', '3126667788', 'Facatativá', 1),
(25, 'Julián', 'Mora', 'CC-1025', '2002-10-15', 'M', '3127778899', 'Madrid', 1),
(26, 'Carolina', 'Chaparro', 'CC-1026', '1994-08-22', 'F', '3128889900', 'Bogotá', 1),
(27, 'Daniel', 'Gaitán', 'CC-1027', '1976-11-09', 'M', '3129990011', 'Funza', 1),
(28, 'Sara', 'Montenegro', 'CC-1028', '2008-04-17', 'F', '3130001122', 'Mosquera', 1),
(29, 'Hernando', 'Acosta', 'CC-1029', '1959-01-30', 'M', null, 'Bogotá', 1),      -- Paciente inactivo/prueba
(30, 'Lina', 'Barreto', 'CC-1030', '1999-06-14', 'F', null, 'Madrid', 1);        -- Paciente inactivo/prueba

-- 6. Medicamentos de Farmacia (15 referencias)
insert into medicamentos (id_medicamento, nombre, presentacion, stock, precio_unitario) values
(1, 'Acetaminofén 500mg', 'Tabletas Caja x 30', 250, 8500.00),
(2, 'Ibuprofeno 800mg', 'Cápsulas Caja x 20', 180, 14000.00),
(3, 'Amoxicilina 500mg', 'Cápsulas Caja x 21', 95, 22000.00),
(4, 'Enalapril 10mg', 'Tabletas Caja x 30', 140, 18500.00),
(5, 'Losartán 50mg', 'Tabletas Caja x 30', 200, 21000.00),
(6, 'Atorvastatina 20mg', 'Tabletas Caja x 30', 110, 32000.00),
(7, 'Metformina 850mg', 'Tabletas Caja x 30', 160, 19500.00),
(8, 'Omeprazol 20mg', 'Cápsulas Frasco x 30', 220, 16000.00),
(9, 'Loratadina 10mg', 'Tabletas Caja x 10', 85, 9500.00),
(10, 'Salbutamol Inhalador 100mcg', 'Inhalador Aerosol 200 dosis', 60, 28000.00),
(11, 'Tramadol 50mg/ml', 'Ampolla Inyectable x 5', 45, 36000.00),
(12, 'Diclofenaco 75mg', 'Ampolla Inyectable x 5', 70, 18000.00),
(13, 'Insulina Glargina 100UI', 'Pluma precargada 3ml', 30, 85000.00),
(14, 'Ciprofloxacino 500mg', 'Tabletas Caja x 14', 50, 29000.00),
(15, 'Complejo B Forte', 'Grageas Frasco x 60', 130, 24000.00);

-- 7. Agenda de Citas (50 registros estructurados cronológicamente)
insert into citas (id_cita, id_paciente, id_medico, fecha_hora, motivo, estado, costo) values
-- Históricas Mayo 2026
(1, 1, 1, '2026-05-02 09:00:00', 'Chequeo rutinario de hipertensión', 'Completada', 50000.00),
(2, 2, 3, '2026-05-02 10:00:00', 'Control de desarrollo y crecimiento', 'Completada', 70000.00),
(3, 3, 5, '2026-05-03 11:30:00', 'Evaluación de palpitaciones y arritmia', 'Completada', 110000.00),
(4, 4, 7, '2026-05-03 14:00:00', 'Brote alérgico y dermatitis atópica', 'Completada', 85000.00),
(5, 5, 9, '2026-05-04 08:30:00', 'Control prenatal primer trimestre', 'Cancelada', 90000.00),
(6, 6, 10, '2026-05-04 09:30:00', 'Cefalea intensa y mareos frecuentes', 'Completada', 130000.00),
(7, 7, 11, '2026-05-05 10:30:00', 'Dolor agudo en articulación de rodilla', 'Completada', 100000.00),
(8, 8, 12, '2026-05-05 11:00:00', 'Disminución de agudeza visual ojo izquierdo', 'Completada', 80000.00),
(9, 9, 13, '2026-05-06 12:00:00', 'Cuadro de ansiedad generalizada e insomnio', 'Completada', 95000.00),
(10, 10, 14, '2026-05-06 15:00:00', 'Dolor abdominal agudo y vómito', 'Completada', 120000.00),
(11, 11, 1, '2026-05-07 09:00:00', 'Exámenes ocupacionales de ingreso', 'Cancelada', 50000.00),
(12, 12, 3, '2026-05-07 10:00:00', 'Fiebre persistente y tos seca', 'Completada', 70000.00),
(13, 13, 4, '2026-05-08 11:00:00', 'Control pediátrico y esquema de vacunas', 'Completada', 70000.00),
(14, 14, 3, '2026-05-08 16:00:00', 'Cuadro respiratorio asmático leve', 'Completada', 70000.00),
(15, 15, 5, '2026-05-09 08:00:00', 'Valoración cardiovascular preoperatoria', 'Completada', 110000.00),

-- Históricas Junio 2026
(16, 1, 2, '2026-06-01 09:00:00', 'Seguimiento de perfil lipídico y tensión', 'Completada', 50000.00),
(17, 2, 4, '2026-06-01 10:30:00', 'Vacunación y revisión nutricional', 'Completada', 70000.00),
(18, 3, 6, '2026-06-02 11:00:00', 'Lectura de monitoreo Holter 24 horas', 'Completada', 110000.00),
(19, 4, 8, '2026-06-02 14:30:00', 'Revisión de manchas solares y lunares', 'No asistió', 85000.00),
(20, 5, 1, '2026-06-03 15:00:00', 'Molestias lumbares y dolor postural', 'Completada', 50000.00),
(21, 6, 3, '2026-06-03 16:00:00', 'Control pediátrico de alergias', 'Completada', 70000.00),
(22, 7, 5, '2026-06-04 09:00:00', 'Prueba de esfuerzo y electrocardiograma', 'Completada', 110000.00),
(23, 8, 7, '2026-06-04 10:00:00', 'Dermatitis por contacto en manos', 'Completada', 85000.00),
(24, 9, 9, '2026-06-05 11:30:00', 'Revisión ecografía ginecológica', 'No asistió', 90000.00),
(25, 10, 10, '2026-06-05 12:30:00', 'Control de migraña y ajuste medicación', 'Completada', 130000.00),
(26, 19, 11, '2026-06-08 08:30:00', 'Esguince de tobillo grado II', 'Completada', 100000.00),
(27, 20, 12, '2026-06-08 09:30:00', 'Revisión anual y fondo de ojo', 'Completada', 80000.00),
(28, 21, 13, '2026-06-09 10:00:00', 'Terapia de seguimiento y bienestar', 'Completada', 95000.00),
(29, 22, 14, '2026-06-09 11:00:00', 'Dolor torácico atípico', 'Completada', 120000.00),
(30, 23, 1, '2026-06-10 14:00:00', 'Chequeo general preventivo', 'Completada', 50000.00),

-- Citas de Julio 2026
(31, 24, 2, '2026-07-02 08:30:00', 'Control de glicemia y hemoglobina', 'Completada', 50000.00),
(32, 25, 3, '2026-07-02 09:30:00', 'Evaluación por bajo peso infantil', 'Completada', 70000.00),
(33, 26, 5, '2026-07-03 10:00:00', 'Ecocardiograma transtorácico', 'Completada', 110000.00),
(34, 27, 7, '2026-07-03 11:00:00', 'Tratamiento para acné severo', 'Completada', 85000.00),
(35, 28, 9, '2026-07-04 14:00:00', 'Chequeo preventivo ginecológico', 'Completada', 90000.00),
(36, 1, 1, '2026-07-10 08:30:00', 'Control mensual de presión arterial', 'Completada', 50000.00),
(37, 2, 3, '2026-07-10 09:30:00', 'Revisión pediátrica trimestral', 'Completada', 70000.00),
(38, 3, 5, '2026-07-11 10:00:00', 'Chequeo cardiológico regular', 'Completada', 110000.00),
(39, 4, 7, '2026-07-11 11:00:00', 'Seguimiento tratamiento dérmico', 'Completada', 85000.00),
(40, 5, 9, '2026-07-12 14:00:00', 'Control ginecológico', 'Completada', 90000.00),

-- Agenda Futura / Programadas (Agosto y Septiembre 2026)
(41, 6, 10, '2026-09-01 08:30:00', 'Control neurológico y resonancia', 'Programada', 130000.00),
(42, 7, 11, '2026-09-01 09:30:00', 'Infiltración articular de rodilla', 'Programada', 100000.00),
(43, 8, 12, '2026-09-02 10:00:00', 'Control oftalmológico postoperatorio', 'Programada', 80000.00),
(44, 9, 13, '2026-09-02 11:00:00', 'Sesión de terapia de apoyo', 'Programada', 95000.00),
(45, 10, 14, '2026-09-03 14:00:00', 'Revisión de evolución en urgencias', 'Programada', 120000.00),
(46, 11, 1, '2026-09-03 15:00:00', 'Chequeo de laboratorio clínico', 'Programada', 50000.00),
(47, 12, 3, '2026-09-04 16:00:00', 'Vacunación de refuerzo infantil', 'Programada', 70000.00),
(48, null, 1, '2026-09-10 10:00:00', 'Cupo de guardia general', 'Programada', 50000.00), -- Cupo libre para pruebas
(49, null, 2, '2026-09-10 11:00:00', 'Cupo de guardia general', 'Programada', 50000.00), -- Cupo libre para pruebas
(50, null, 15, '2026-09-12 12:00:00', 'Cupo de contingencia', 'Cancelada', 50000.00);    -- Cita huérfana de prueba

-- 8. Hospitalizaciones (10 estancias)
insert into hospitalizaciones (id_hospitalizacion, id_paciente, id_habitacion, fecha_ingreso, fecha_alta, diagnostico, estado) values
(1, 1, 1, '2026-05-10 08:00:00', '2026-05-15 14:00:00', 'Crisis hipertensiva controlada', 'Alta médica'),
(2, 3, 3, '2026-05-12 11:00:00', '2026-05-18 10:00:00', 'Infarto agudo de miocardio sin elevación ST', 'Alta médica'),
(3, 7, 4, '2026-06-10 09:30:00', '2026-06-16 11:00:00', 'Reemplazo total de rodilla derecha', 'Alta médica'),
(4, 10, 6, '2026-06-15 14:00:00', '2026-06-20 16:00:00', 'Apendicectomía laparoscópica de urgencia', 'Alta médica'),
(5, 15, 7, '2026-06-22 06:00:00', '2026-06-28 18:00:00', 'Insuficiencia respiratoria aguda en UCI', 'Alta médica'),
(6, 19, 1, '2026-08-10 08:00:00', null, 'Fractura de fémur en observación prequirúrgica', 'Activa'),
(7, 21, 3, '2026-08-12 10:30:00', null, 'Neumonía bacteriana adquirida en comunidad', 'Activa'),
(8, 23, 4, '2026-08-14 14:00:00', null, 'Postoperatorio bypass coronario', 'Activa'),
(9, 25, 6, '2026-08-15 16:00:00', null, 'Trauma craneoencefálico leve en suite', 'Activa'),
(10, 27, 7, '2026-08-18 05:00:00', null, 'Choque séptico en UCI adultos', 'Activa');

-- 9. Recetas Médicas (20 prescripciones vinculadas a citas)
insert into recetas (id_receta, id_cita, id_medicamento, cantidad, indicaciones) values
(1, 1, 4, 1, 'Tomar 1 tableta cada 24 horas por la mañana'),
(2, 1, 5, 1, 'Tomar 1 tableta cada 12 horas en caso de presión alta'),
(3, 2, 1, 1, 'Tomar 5ml cada 8 horas si presenta fiebre'),
(4, 3, 6, 2, 'Tomar 1 tableta en la noche con la cena'),
(5, 4, 9, 1, 'Tomar 1 tableta diaria por 10 días'),
(6, 6, 8, 1, 'Tomar 1 cápsula en ayunas por 30 días'),
(7, 7, 2, 2, 'Tomar 1 cápsula cada 8 horas por 5 días tras alimentos'),
(8, 7, 12, 1, 'Aplicar 1 ampolla intramuscular cada 24 horas por 3 días'),
(9, 9, 15, 1, 'Tomar 1 gragea al día con el desayuno'),
(10, 10, 8, 1, 'Tomar 1 cápsula 30 minutos antes del desayuno'),
(11, 12, 3, 1, 'Tomar 1 cápsula cada 8 horas por 7 días completos'),
(12, 14, 10, 1, 'Realizar 2 inhalaciones cada 6 horas según crisis'),
(13, 15, 5, 2, 'Tomar 1 tableta diaria como control cardiovascular'),
(14, 16, 4, 1, 'Continuar con 1 tableta diaria de Enalapril'),
(15, 18, 6, 1, 'Tomar 1 tableta diaria para control de colesterol'),
(16, 20, 2, 1, 'Tomar 1 tableta cada 12 horas si hay dolor lumbar'),
(17, 22, 5, 1, 'Tomar 1 tableta al día por 3 meses'),
(18, 25, 8, 1, 'Tomar 1 cápsula diaria como protector gástrico'),
(19, 26, 2, 2, 'Tomar 1 cápsula cada 8 horas para desinflamar'),
(20, 29, 11, 1, 'Aplicar 1 ampolla intravenosa lenta en urgencias');

-- 10. Facturación (25 facturas registradas)
insert into facturas (id_factura, id_paciente, id_cita, fecha_emision, monto_total, metodo_pago, estado) values
(1, 1, 1, '2026-05-02 10:00:00', 50000.00, 'Efectivo', 'Pagada'),
(2, 2, 2, '2026-05-02 11:00:00', 70000.00, 'Tarjeta Débito', 'Pagada'),
(3, 3, 3, '2026-05-03 12:30:00', 110000.00, 'Tarjeta Crédito', 'Pagada'),
(4, 4, 4, '2026-05-03 15:00:00', 85000.00, 'Transferencia', 'Pagada'),
(5, 6, 6, '2026-05-04 10:30:00', 130000.00, 'Seguro Médico', 'Pagada'),
(6, 7, 7, '2026-05-05 11:30:00', 100000.00, 'Tarjeta Débito', 'Pagada'),
(7, 8, 8, '2026-05-05 12:00:00', 80000.00, 'Efectivo', 'Pagada'),
(8, 9, 9, '2026-05-06 13:00:00', 95000.00, 'Seguro Médico', 'Pagada'),
(9, 10, 10, '2026-05-06 16:00:00', 120000.00, 'Tarjeta Crédito', 'Pagada'),
(10, 12, 12, '2026-05-07 11:00:00', 70000.00, 'Efectivo', 'Pagada'),
(11, 13, 13, '2026-05-08 12:00:00', 70000.00, 'Transferencia', 'Pagada'),
(12, 14, 14, '2026-05-08 17:00:00', 70000.00, 'Tarjeta Débito', 'Pagada'),
(13, 15, 15, '2026-05-09 09:00:00', 110000.00, 'Seguro Médico', 'Pagada'),
(14, 1, 16, '2026-06-01 10:00:00', 50000.00, 'Efectivo', 'Pagada'),
(15, 2, 17, '2026-06-01 11:30:00', 70000.00, 'Tarjeta Débito', 'Pagada'),
(16, 3, 18, '2026-06-02 12:00:00', 110000.00, 'Tarjeta Crédito', 'Pagada'),
(17, 5, 20, '2026-06-03 16:00:00', 50000.00, 'Transferencia', 'Pagada'),
(18, 6, 21, '2026-06-03 17:00:00', 70000.00, 'Seguro Médico', 'Pagada'),
(19, 7, 22, '2026-06-04 10:00:00', 110000.00, 'Tarjeta Débito', 'Pagada'),
(20, 8, 23, '2026-06-04 11:00:00', 85000.00, 'Efectivo', 'Pagada'),
(21, 10, 25, '2026-06-05 13:30:00', 130000.00, 'Seguro Médico', 'Pagada'),
(22, 19, 26, '2026-06-08 09:30:00', 100000.00, 'Tarjeta Crédito', 'Pagada'),
(23, 20, 27, '2026-06-08 10:30:00', 80000.00, 'Transferencia', 'Pagada'),
(24, 21, 28, '2026-06-09 11:00:00', 95000.00, 'Seguro Médico', 'Pagada'),
(25, 22, 29, '2026-06-09 12:00:00', 120000.00, 'Tarjeta Débito', 'Pagada');

create table if not exists backup_citas as select * from citas;