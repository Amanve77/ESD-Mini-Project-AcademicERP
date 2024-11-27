import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';

const router = createBrowserRouter([
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
	{
    path: "/employees",
		element: <EmployeeList />,
  },
  {
    path: "/add-employee",
		element: <AddEmployee />,
  }
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
