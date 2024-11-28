import React from 'react';
import Navbar from '../components/Common/Navbar';
import EditEmployeeForm from '../components/Employee/EditEmployeeForm';

const EditEmployee = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  return (
    <div>
      <Navbar />
      <EditEmployeeForm jwtToken={jwtToken} />
    </div>
  );
};

export default EditEmployee;
