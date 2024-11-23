ALTER TABLE employees ADD CONSTRAINT fk_department FOREIGN KEY (department) REFERENCES departments(department_id) ON DELETE SET NULL;
