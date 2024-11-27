import React, { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import Navbar from "./Navbar";

const AddEmployee = () => {
    const [message, setMessage] = useState("");

    const handleSave = (employee) => {
        setMessage(`Employee added successfully!`);
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div>
            <Navbar />
        <div className="container mt-4">
            <h2 className="mb-4">Add New Employee</h2>
            {message && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {message}
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setMessage("")} 
                    ></button>
                </div>
            )}
            <EmployeeForm onSave={handleSave} jwtToken={localStorage.getItem("jwtToken")} />
        </div>
        </div>
    );
};

export default AddEmployee;
