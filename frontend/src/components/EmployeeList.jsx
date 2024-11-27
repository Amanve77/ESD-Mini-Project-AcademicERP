import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/employees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });

        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employees. Please try again later.');
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchEmployees();
  }, []);

  const buildImageUrl = (filename) => {
    return `http://localhost:8080/api/v1/employees/photos/${filename}`;
  };

  const handleDelete = async (empId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/v1/employees/${empId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      setEmployees(employees.filter((emp) => emp.empId !== empId));
    } catch (err) {
      console.error('Error deleting employee:', err);
      setError('Failed to delete employee. Please try again.');
    }
  };

  const handleUpdate = (empId) => {
    navigate(`/update-employee/${empId}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee List</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/add-employee')} // Navigate to Add Employee form
        >
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
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Title</th>
              <th>Photograph</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.empId}>
                  <td>{employee.empId}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.title}</td>
                  <td>
                    {employee.photographPath ? (
                      <img
                        src={buildImageUrl(employee.photographPath.split('/').pop())}
                        alt="Employee"
                        width="50"
                        height="50"
                        style={{ borderRadius: '5px', objectFit: 'cover' }}
                      />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>{employee.department}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleUpdate(employee.empId)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(employee.empId)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
