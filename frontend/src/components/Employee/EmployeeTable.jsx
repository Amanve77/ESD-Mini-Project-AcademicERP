import React from 'react';
import { buildImageUrl } from '../../api/employeeApi';

const EmployeeTable = ({ employees, onUpdate, onDelete }) => {
  return (
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
                    onClick={() => onUpdate(employee.empId)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(employee.empId)}
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
  );
};

export default EmployeeTable;
