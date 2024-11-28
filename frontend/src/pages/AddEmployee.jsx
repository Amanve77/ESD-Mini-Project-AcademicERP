import React from 'react';
import Navbar from '../components/Common/Navbar';
import AddEmployeeForm from '../components/Employee/AddEmployeeForm';

const EditEmployee = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  return (
    <div>
      <Navbar />
      <AddEmployeeForm jwtToken={jwtToken} />
    </div>
  );
};

export default EditEmployee;
