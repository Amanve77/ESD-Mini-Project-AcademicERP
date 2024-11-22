CREATE TABLE admin (
                    admin_id VARCHAR(10) PRIMARY KEY ,
                    first_name VARCHAR(30) NOT NULL,
                    last_name VARCHAR(30),
                    email VARCHAR(30) UNIQUE NOT NULL ,
                    password VARCHAR(255) NOT NULL

);