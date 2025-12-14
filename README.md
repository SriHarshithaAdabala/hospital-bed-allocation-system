# hospital-bed-allocation-system
A Node.js and PostgreSQL backend system for managing hospital bed allocation based on patient conditions. Includes REST APIs for adding patients, allocating beds, and viewing bed status. Fully tested with Postman.

## Features
- Add new patients with name, age, and condition
- View all patients
- Allocate beds (ICU/General/Other) based on patient condition
- View current bed status
- Fully tested with Postman collection

## Technologies Used
- Node.js + Express.js for backend
- PostgreSQL for database
- Postman for API testing
- dotenv for environment variables

## Setup Instructions

1. **Clone the repository**
   git clone https://github.com/SriHarshithaAdabala/hospital-bed-allocation-system.git
   cd hospital-bed-allocation
2.**Install dependencies**
   npm install
3. **Configure PostgreSQL**
   - Ensure PostgreSQL server is running.
   - Create a database named hospital.
   - Create a .env file in the project root (same level as package.json) with the following content:
     DB_USER=postgres
     DB_HOST=localhost
     DB_NAME=hospital
     DB_PASSWORD=your_password
     DB_PORT=5432
    Replace your_password with your actual PostgreSQL password.
  -src/db.js already reads these credentials using dotenv:
  const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

4. **Start the server**
   npm start
   - The server will run on: http://localhost:3000
   - You should see in console:
  DB connected: { current timestamp }

5. **Test APIs**
   - Import the Postman collection: Hospital-Bed-Allocation.postman_collection.json
   - Test all endpoints (Add Patient, Get Patients, Allocate Bed, Get Bed Status)
   - Screenshots of successful responses are below.

***Screenshots of Successful API Calls***

Add Patient
<img width="1600" height="757" alt="image" src="https://github.com/user-attachments/assets/591b10fc-0a14-44ca-bcde-72b058711854" />

Get Patients
<img width="1600" height="765" alt="image" src="https://github.com/user-attachments/assets/2eeda72c-72cb-4a43-a746-702bebe84bca" />

Allocate Bed
<img width="1600" height="767" alt="image" src="https://github.com/user-attachments/assets/b30b226a-0d64-4c0a-adb5-93f4fa07709c" />

**Notes / Future Scope**
- PostgreSQL server must be running before starting the Node.js server.
- All API errors are logged in console for debugging.
- Can be extended to include user authentication, frontend interface, or advanced allocation logic.

**Author**
- Harshitha Adabala | B.Tech 2025

