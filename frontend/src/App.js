import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import EmployeeList from './pages/EmployeeList';
import EditEmployee from './pages/EditEmployee';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
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
  },
  {
    path: "/update-employee/:empId",
		element: <EditEmployee />,
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
