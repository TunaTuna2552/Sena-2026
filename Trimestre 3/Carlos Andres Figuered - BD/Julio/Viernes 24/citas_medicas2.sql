-- ============================================================
-- 1. CREACIÓN DE LA BD
-- ============================================================

CREATE DATABASE citas_medicas2;
use citas_medicas2;
-- ============================================================
-- 2. CREACIÓN DE LAS TABLAS
-- ============================================================

CREATE TABLE Especialidades (
    id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200)
);

CREATE TABLE Pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    documento_identidad VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(15)
);

CREATE TABLE Medicos (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    num_colegiado VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    id_especialidad INT NOT NULL,
    CONSTRAINT fk_medicos_especialidad 
        FOREIGN KEY (id_especialidad) REFERENCES Especialidades(id_especialidad)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_medico INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    estado VARCHAR(20) DEFAULT 'Programada',
    CONSTRAINT fk_citas_paciente 
        FOREIGN KEY (id_paciente) REFERENCES Pacientes(id_paciente)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_citas_medico 
        FOREIGN KEY (id_medico) REFERENCES Medicos(id_medico)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Historiales_Medicos (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_cita INT NOT NULL UNIQUE,
    diagnostico TEXT NOT NULL,
    tratamiento TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_historiales_cita 
        FOREIGN KEY (id_cita) REFERENCES Citas(id_cita)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================
-- 3. INSERCIÓN DE DATOS
-- ============================================================

INSERT INTO Especialidades (nombre, descripcion) VALUES
('Medicina General', 'Atención médica primaria e integral'),
('Pediatría', 'Atención médica de bebés, niños y adolescentes'),
('Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón'),
('Dermatología', 'Cuidado y tratamiento de afecciones en la piel'),
('Traumatología', 'Lesiones traumáticas del sistema musculoesquelético'),
('Neurología', 'Trastornos del sistema nervioso');

INSERT INTO Pacientes (documento_identidad, nombre, apellido, fecha_nacimiento, telefono) VALUES
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
('101010115', 'Andrés', 'Mendoza', '1988-09-27', '555-0115');

INSERT INTO Medicos (num_colegiado, nombre, apellido, id_especialidad) VALUES
('COL-001', 'Roberto', 'Navarro', 1),
('COL-002', 'Laura', 'Méndez', 1),
('COL-003', 'Patricia', 'Ríos', 2),
('COL-004', 'Fernando', 'Soto', 2),
('COL-005', 'Javier', 'Ortega', 3),
('COL-006', 'Carmen', 'Delgado', 3),
('COL-007', 'Gonzalo', 'Vega', 4),
('COL-008', 'Beatriz', 'Marín', 4),
('COL-009', 'Hugo', 'Peña', 5),
('COL-010', 'Silvia', 'Guerrero', 6);

INSERT INTO Citas (id_paciente, id_medico, fecha_hora, estado) VALUES
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
(2, 9, '2026-07-13 16:00:00', 'Programada');

INSERT INTO Historiales_Medicos (id_cita, diagnostico, tratamiento) VALUES
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
(22, 'Lumbalgia por esfuerzo físico.', 'Analgésicos y fisioterapia preventiva.');










-- Ejemplo B: Uso del operador lógico OR
-- Enunciado: Ver las citas que representen probllemas de asistencia (canceladas O no asistió).
-- Explicación: 


-- Enunciado
