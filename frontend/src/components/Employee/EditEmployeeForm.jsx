import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../../hooks/useEmployee';
import { useDepartments } from '../../hooks/useDepartments';
import { updateEmployee } from '../../api/employeeApi';
import { validateFile } from '../../utils/fileUtils';
import DepartmentSelect from '../Department/DepartmentSelect';

const EditEmployeeForm = ({ jwtToken }) => {
  const { empId } = useParams();
  const navigate = useNavigate();

  const { employee, error: empError } = useEmployee(empId, jwtToken);
  const { departments, error: deptError } = useDepartments(jwtToken);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [photograph, setPhotograph] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setTitle(employee.title);
      setDepartment(employee.department);
      setImagePreview(employee.photographPath);
    }
  }, [employee]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      return;
    }
    setPhotograph(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('title', title);
    formData.append('department', department);
    if (photograph) formData.append('photograph', photograph);

    try {
      await updateEmployee(empId, formData, jwtToken);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee. Please try again.');
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Edit Employee</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {empError && <div className="alert alert-danger">{empError}</div>}
          {deptError && <div className="alert alert-danger">{deptError}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <DepartmentSelect
                    departments={departments}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Photograph</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {imagePreview && (
                    <div className="mt-3 text-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxHeight: '150px' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary w-50">
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
