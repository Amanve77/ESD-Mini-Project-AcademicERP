import React from 'react';
import Navbar from '../components/Common/Navbar';
import EmployeeList from '../components/Employee/EmployeeList';

const EditEmployee = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  return (
    <div>
      <Navbar />
      <EmployeeList jwtToken={jwtToken} />
    </div>
  );
};

export default EditEmployee;
