import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
    const { empId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [photograph, setPhotograph] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/employees/${empId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                });
                setEmployee(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setTitle(response.data.title);
                setDepartment(response.data.department);
            } catch (err) {
                console.error("Error fetching employee:", err);
                setError("Failed to fetch employee details.");
            }
        };

        fetchEmployee();
    }, [empId]);

    const handleFileChange = (e) => {
        setPhotograph(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("title", title);
        formData.append("department", department);
        if (photograph) {
            formData.append("photograph", photograph);
        }

        try {
            await axios.put(`http://localhost:8080/api/v1/employees/${empId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/employees"); // Redirect after successful update
        } catch (err) {
            console.error("Error updating employee:", err);
            setError("Failed to update employee. Please try again.");
        }
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit Employee</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <input
                        type="text"
                        className="form-control"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Photograph</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <div>
                        {employee.photographPath && (
                            <img
                                src={employee.photographPath}
                                alt="Employee"
                                width="50"
                                height="50"
                                style={{ borderRadius: "5px", objectFit: "cover" }}
                            />
                        )}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Employee</button>
            </form>
        </div>
    );
};

export default EditEmployee;
