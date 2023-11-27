create database Obligatorio;
use Obligatorio;
CREATE TABLE login (
    LogId INT PRIMARY KEY,
    Password VARCHAR(100)
);
CREATE TABLE funcionarios (
    Ci INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Apellido VARCHAR(255),
    Fch_Nacimiento DATE,
    Direccion VARCHAR(255),
    Telefono VARCHAR(20),
    Email VARCHAR(255),
    LogId INT,
    FOREIGN KEY (LogId) REFERENCES login(LogId)
);

CREATE TABLE agenda (
    Nro INT,
    Ci INT,
    Fch_Agenda DATE,
    PRIMARY KEY (Nro,Ci),
    FOREIGN KEY (Ci) REFERENCES funcionarios(Ci)
);
CREATE TABLE carnet_Salud (
    Ci INT ,
    Fch_Emision DATE,
    Fch_Vencimiento DATE,
    Comprobante LONGBLOB,
    PRIMARY KEY (Ci, Fch_Emision),
    FOREIGN KEY (Ci) REFERENCES funcionarios(Ci)
);
CREATE TABLE periodos_Actualizacion (
    Anio INT,
    Semestre INT,
    Fch_Inicio DATE,
    Fch_Fin DATE,
    PRIMARY KEY (Anio, Semestre, Fch_Inicio, Fch_Fin)
);



INSERT INTO agenda (Nro, Ci, Fch_Agenda) VALUES
                                             (1, NULL, '2023-01-20'),
                                             (2, NULL, '2023-01-21'),
                                             (3, NULL, '2023-01-22');
insert into periodos_Actualizacion value (2023,2,'2023-11-01','2023-11-30');
