# Academic ERP

The Academic ERP System is a web-based application designed to efficiently manage employee records within an academic institution. This project focuses on CRUD (Create, Read, Update, Delete) operations for employee management, ensuring a clean and scalable architecture.

## Features

### Admin Features

**Login & Authentication**  
- Secure admin login using JWT tokens.  
- Protected routes for authorized access.  

**Employee Management**  
- Add employees with necessary details, including uploading photographs.  
- View a list of employees with real-time data fetching.  
- Update employee details.  
- Delete employees from the system.  

**Department Management**  
- Each employee is linked to a department.  
- Prevent adding employees to departments exceeding their capacity.  

## Technology Stack

### Frontend
- **ReactJS**: For building a dynamic user interface.  
- **React Router**: For routing between pages.  
- **Bootstrap & Custom CSS**: For responsive and aesthetic UI design.  
- **React Hooks**: Used for state and lifecycle management.  

### Backend
- **Spring Boot**: For creating RESTful APIs.  
- **MySQL**: Relational database for storing application data.  
- **JWT Authentication**: For secure admin access.  

## Installation

### Prerequisites

- **Node.js** (for frontend)
- **Java** (for backend)
- **MySQL Server**
- **Postman** (optional for API testing)

### Backend Setup

1. Clone the repository.
2. Navigate to the backend directory.
3. Import the project into your IDE (IntelliJ, Eclipse, etc.).
4. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/AcademicERP
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
5. Run the application using: `mvn spring-boot:run`

### Frontend Setup

1. Navigate to the frontend directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## API Endpoints

### Authentication

*   **POST** `/api/v1/admin/login`  
    Login as an admin and receive a JWT token.  
    **Request body example**:
    ```json
    {
    "email": "email@gmail.com",
    "password": "password123"
    }
    ```

### Employee CRUD

*   **GET** `/api/v1/employees`  
    Fetch all employees.
    
*   **POST** `/api/v1/employees`  
    Add a new employee (requires photo upload).  
    **Request body example**:
    ```json
    {
      "empId": "E101",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "title": "Dean",
      "department": "CSE",
      "photograph": "file upload"
    }
    ```
    
*   **PUT** `/api/v1/employees/{id}`  
    Update employee details.  
    **Request body example**:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "title": "Dean",
      "department": "CSE",
      "photograph": "file upload"
    }
    ```
    
*   **DELETE** `/api/v1/employees/{id}`  
    Delete an employee.
    

### Department

*   **GET** `/api/v1/departments`  
    Fetch all available departments.

## Contributing

Contributions to the project are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch:  
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch and submit a pull request:
   ```bash
   git push origin feature/new-feature
   ```

## Authors

- `Aman Verma` - Developer
