CREATE TABLE admin (
                    admin_id VARCHAR(10) PRIMARY KEY ,
                    first_name VARCHAR(30) NOT NULL,
                    last_name VARCHAR(30),
                    email VARCHAR(30) UNIQUE NOT NULL ,
                    password VARCHAR(255) NOT NULL

);

CREATE TABLE departments (
                             department_id VARCHAR(10) PRIMARY KEY ,
                             department_name VARCHAR(255) NOT NULL,
                             capacity INT NOT NULL,
                             current_count INT NOT NULL DEFAULT 0
);

CREATE TABLE employees (
                           employee_id VARCHAR(10) PRIMARY KEY,
                           first_name VARCHAR(255) NOT NULL,
                           last_name VARCHAR(255),
                           email VARCHAR(255) NOT NULL UNIQUE,
                           title VARCHAR(255) NOT NULL,
                           photograph_path VARCHAR(255) NOT NULL UNIQUE,
                           department VARCHAR(255) DEFAULT NULL
);