# Employee Management System (EMS) - MEAN Stack

This project is an Employee Management System built using the MEAN stack (MongoDB, Express.js, Angular, Node.js).

## Project Structure

```
employee-management/
├── client/           # Angular frontend
│   ├── src/
│   │   └── app/
│   │       ├── add-employee/
│   │       ├── edit-employee/
│   │       ├── employee-form/
│   │       ├── employee-list/
│   │       ├── models/
│   │       └── services/
│   ├── angular.json
│   └── package.json
├── server/           # Node.js/Express backend
│   ├── src/
│   │   ├── database.ts
│   │   ├── employee.routes.ts
│   │   ├── employee.ts
│   │   └── server.ts
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js & npm
- Angular CLI
- MongoDB

### Setup
1. **Clone the repository**
2. **Install dependencies**
	- Frontend: `cd client && npm install`
	- Backend: `cd server && npm install`
3. **Start MongoDB**
4. **Run the backend server**
	- `cd server && npm start` or `node src/server.ts`
5. **Run the Angular frontend**
	- `cd client && ng serve`

## Features
- Add, edit, and list employees
- RESTful API backend
- Angular-based UI

## Folder Details
- `client/src/app/models/employee.ts`: Employee model
- `client/src/app/services/employee.ts`: Employee service for API calls
- `server/src/employee.routes.ts`: Express routes for employee API

## License
MIT
