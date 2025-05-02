-- Crear la base de datos
CREATE DATABASE HotelDB;

-- Seleccionar la base de datos
USE HotelDB;

-- Crear la tabla EMPLEADOS
CREATE TABLE EMPLEADOS (
    Id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Cargo VARCHAR(255) NOT NULL,
    Telefono VARCHAR(20),
    Email VARCHAR(255)
);

INSERT INTO EMPLEADOS (Id_empleado, Nombre, Apellido, Cargo, Telefono, Email)
VALUES 
    (500, 'Juan', 'Romero', 'Recepcionista', '3564586947', 'juanrom@live.com'),
    (501, 'César', 'Bustos', 'Conserje', '3564123456', 'cesar@outlook.com'),
    (502, 'Rosana', 'Cabrera', 'Mucama', '3564808586', 'rosanac@gmail.com');

-- Crear la tabla HABITACIONES
CREATE TABLE HABITACIONES (
    Id_habitacion INT AUTO_INCREMENT PRIMARY KEY,
    Num_habitacion INT NOT NULL,
    Tipo_habitacion VARCHAR(255) NOT NULL,
    Precio_noche DECIMAL(10, 2) NOT NULL,
    Estado VARCHAR(255) NOT NULL
);

INSERT INTO HABITACIONES (Id_habitacion, Num_habitacion, Tipo_habitacion, Precio_noche, Estado)
VALUES 
    (200, 20, 'Simple', 10000.00, 'Ocupada'),
    (201, 21, 'Doble', 20000.00, 'A confirmar'),
    (202, 22, 'Suite', 40000.00, 'Disponible'),
    (203, 23, 'Familiar', 30000.00, 'Ocupada');

-- Crear la tabla HUESPEDES
CREATE TABLE HUESPEDES (
    Id_huesped INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Direccion VARCHAR(255),
    Telefono VARCHAR(20),
    Mail VARCHAR(255)
);

INSERT INTO HUESPEDES (Id_huesped, Nombre, Apellido, Direccion, Telefono, Mail)
VALUES 
    (100, 'Sofia', 'Villa', 'San Fco', '3564-123456', 'sofivilla@gmail.com'),
    (101, 'Carlos', 'Castro', 'Córdoba', '351-654321', 'carloscastro@gmail.com'),
    (102, 'Emma', 'Pérez', 'Rosario', '3412-987654', 'emmaperez@gmail.com'),
    (103, 'Liliana', 'Castaño', 'Mendoza', '2612-112233', 'liliana@gmail.com');

-- Crear la tabla RESERVAS
CREATE TABLE RESERVAS (
    Id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    Id_huesped INT NOT NULL,
    Id_habitacion INT NOT NULL,
    Fecha_llegada DATE NOT NULL,
    Fecha_salida DATE NOT NULL,
    Num_noches INT NOT NULL,
    Precio_total DECIMAL(10, 2) NOT NULL,
    Estado_reserva VARCHAR(255) NOT NULL,
    FOREIGN KEY (Id_huesped) REFERENCES HUESPEDES(Id_huesped),
    FOREIGN KEY (Id_habitacion) REFERENCES HABITACIONES(Id_habitacion)
);

INSERT INTO RESERVAS (Id_reserva, Id_huesped, Id_habitacion, Fecha_llegada, Fecha_salida, Num_noches, Precio_total, Estado_reserva)
VALUES 
    (50, 100, 200, '2024-10-15', '2024-10-18', 3, 30000.00, 'CONFIRMADO'),
    (51, 101, 201, '2024-10-18', '2024-10-20', 2, 40000.00, 'PENDIENTE'),
    (52, 102, 202, '2024-10-20', '2024-10-23', 3, 120000.00, 'CANCELADO'),
    (53, 103, 203, '2024-10-25', '2024-10-28', 3, 90000.00, 'CONFIRMADO');

-- Crear la tabla PAGOS
CREATE TABLE PAGOS (
    Id_pago INT AUTO_INCREMENT PRIMARY KEY,
    Id_reserva INT NOT NULL,
    Fecha_pago DATE NOT NULL,
    Monto_pago DECIMAL(10, 2) NOT NULL,
    Metodo_pago VARCHAR(255) NOT NULL,
    Id_empleado INT,
    FOREIGN KEY (Id_reserva) REFERENCES RESERVAS(Id_reserva),
    FOREIGN KEY (Id_empleado) REFERENCES EMPLEADOS(Id_empleado)
);

INSERT INTO PAGOS (Id_pago, Id_reserva, Fecha_pago, Monto_pago, Metodo_pago, Id_empleado)
VALUES 
    (20, 50, '2024-10-18', 30000.00, 'EFECTIVO', 501),
    (21, 51, '2024-10-20', 40000.00, 'DÉBITO', 501),
    (22, 52, '2024-10-23', 120000.00, 'EFECTIVO', 501),
    (23, 53, '2024-10-28', 90000.00, 'TRANSFERENCIA', 502);