import React, { useState } from 'react';
import { useDepartments } from '../../hooks/useDepartments';
import { saveEmployee } from '../../api/employeeApi';
import { validateFile } from '../../utils/fileUtils';
import DepartmentSelect from '../Department/DepartmentSelect';

const AddEmployeeForm = ({ onSave = () => {}, jwtToken }) => {
  const { departments, error: deptError } = useDepartments(jwtToken);

  const [employeeId, setEmployeeId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [photograph, setPhotograph] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const resetForm = () => {
    setEmployeeId('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setTitle('');
    setDepartment('');
    setPhotograph(null);
    setImagePreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('empId', employeeId);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('title', title);
    formData.append('department', department);
    formData.append('photograph', photograph);

    try {
      const response = await saveEmployee(formData, jwtToken);
      onSave(response);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Add Employee</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {deptError && <div className="alert alert-danger">{deptError}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Employee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                  />
                </div>
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
                  />
                </div>
              </div>
              <div className="col-md-6">
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
              </div>
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
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary w-50"
                disabled={loading || !employeeId || !firstName || !email || !title || !department}
              >
                {loading ? 'Saving...' : 'Save Employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
