import React from 'react';

const DepartmentSelect = ({ departments, value, onChange }) => {
  return (
    <select className="form-select" value={value} onChange={onChange} required>
      <option value="" disabled>Select a department</option>
      {departments.map((dept) => (
        <option key={dept.departmentId} value={dept.departmentName}>
          {dept.departmentName}
        </option>
      ))}
    </select>
  );
};

export default DepartmentSelect;
