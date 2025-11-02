# DevTrackr API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

All endpoints except `/auth/register` and `/auth/login` require authentication.
Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Authentication Endpoints

### 1. Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe",
  "email": "john@example.com"
}
```

### 2. Login User
```
POST /auth/login
```

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe",
  "email": "john@example.com"
}
```

## Project Endpoints

### 1. Get All Projects (with pagination and filtering)
```
GET /projects
```

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 10)
- `sortBy` (optional): Sort field (default: id)
- `sortDir` (optional): Sort direction - asc/desc (default: asc)
- `status` (optional): Filter by status - PENDING/ACTIVE/COMPLETED

**Example:**
```
GET /projects?page=0&size=5&status=ACTIVE&sortBy=dueDate&sortDir=asc
```

### 2. Get Project by ID
```
GET /projects/{id}
```

### 3. Create Project
```
POST /projects
```

**Request Body:**
```json
{
  "name": "Project Name",
  "description": "Project Description",
  "status": "PENDING",
  "dueDate": "2024-12-31"
}
```

### 4. Update Project
```
PUT /projects/{id}
```

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "description": "Updated Description",
  "status": "ACTIVE",
  "dueDate": "2024-12-31"
}
```

### 5. Update Project Status Only
```
PATCH /projects/{id}/status
```

**Request Body:**
```json
"COMPLETED"
```

### 6. Delete Project
```
DELETE /projects/{id}
```

## Project Status Values
- `PENDING`
- `ACTIVE`
- `COMPLETED`

## Response Format

### Success Response
```json
{
  "id": 1,
  "name": "Project Name",
  "description": "Project Description",
  "status": "ACTIVE",
  "dueDate": "2024-12-31",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### Paginated Response
```json
{
  "content": [...],
  "pageable": {...},
  "totalElements": 50,
  "totalPages": 5,
  "size": 10,
  "number": 0
}
```

### Error Response
```json
{
  "status": 404,
  "message": "Project not found with id: 1",
  "timestamp": "2024-01-15T10:30:00"
}
```

### Validation Error Response
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "name": "Project name is required",
    "dueDate": "Due date is required"
  },
  "timestamp": "2024-01-15T10:30:00"
}
```