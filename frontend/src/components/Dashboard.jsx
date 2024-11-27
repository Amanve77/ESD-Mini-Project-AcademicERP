import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1 className="text-center mb-4">Welcome to the Employee Management Dashboard</h1>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-lg">
                            <div className="card-body text-center">
                                <h5 className="card-title">Add New Employee</h5>
                                <p className="card-text">Click here to add a new employee to the system.</p>
                                <Link to="/add-employee" className="btn btn-success btn-lg">
                                    Add Employee
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card shadow-lg">
                            <div className="card-body text-center">
                                <h5 className="card-title">View Employees</h5>
                                <p className="card-text">View, update, or delete existing employee records.</p>
                                <Link to="/employees" className="btn btn-info btn-lg">
                                    View Employees
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
