import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../../hooks/useEmployees';
import { deleteEmployeeById } from '../../api/employeeApi';
import EmployeeTable from './EmployeeTable';

const EmployeeList = () => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem('jwtToken');
  const { employees, loading, error, setEmployees } = useEmployees(jwtToken);

  const handleDelete = async (empId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await deleteEmployeeById(empId, jwtToken);
      setEmployees(employees.filter((emp) => emp.empId !== empId));
    } catch (err) {
      alert('Failed to delete employee. Please try again.');
    }
  };

  const handleUpdate = (empId) => {
    navigate(`/update-employee/${empId}`);
  };

  return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Employee List</h2>
          <button className="btn btn-primary" onClick={() => navigate('/add-employee')}>
            Add Employee
          </button>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <EmployeeTable
            employees={employees}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
  );
};

export default EmployeeList;
