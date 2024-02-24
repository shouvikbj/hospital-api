# Hospital API

This project is an API for managing doctors, patients, and medical reports in a hospital setting. It provides endpoints for registering doctors and patients, creating medical reports, and fetching medical data.

## Features

- User authentication for doctors
- Registering new doctors and patients
- Creating medical reports for patients
- Retrieving patient reports and doctor information

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
- Express-validator for input validation

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or remotely

### Installation

1. Clone the repository:

- git clone https://github.com/shouvikbj/hospital-api.git

2. Install dependencies:

- cd hospital-api
- npm install

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

- DB_URI=mongodb://localhost:27017/hospital
- JWT_SECRET=your_secret_key_here


Replace `your_secret_key_here` with a secure random string for JWT token generation.

### Running the Server

Start the server:

- npm start

The server should now be running on http://localhost:3000 by default.

## API Endpoints

### Doctors

- `POST /doctors/register`: Register a new doctor
- `POST /doctors/login`: Login for doctors

### Patients

- `POST /patients/register`: Register a new patient

### Reports

- `POST /patients/:id/create_report`: Create a new report for a patient
- `GET /patients/:id/all_reports`: Get all reports of a patient
- `GET /reports/:status`: Get all reports by status

## Contributing

Contributions are welcome! If you find any bugs or have feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
