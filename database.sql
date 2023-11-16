create database Obligatorio;
use Obligatorio;
CREATE TABLE login (
    LogId INT PRIMARY KEY,
    Password VARCHAR(30)
);
CREATE TABLE funcionario (
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
    PIMARY KEY (Nro, Ci),
    FOREIGN KEY (Ci) REFERENCES funcionario(Ci)
);
CREATE TABLE carnet_Salud (
    Ci INT ,
    Fch_Emision DATE,
    Fch_Vencimiento DATE,
    Comprobante VARCHAR(100),
    PRIMARY KEY (Ci, Fch_Emision),
    FOREIGN KEY (Ci) REFERENCES funcionario(Ci)
);
CREATE TABLE periodos_Actualizacion (
    Anio INT,
    Semestre INT,
    Fch_Inicio DATE,
    Fch_Fin DATE,
    PRIMARY KEY (Anio, Semestre, Fch_Inicio, Fch_Fin)
);
