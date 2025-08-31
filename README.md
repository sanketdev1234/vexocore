# Task Manager Backend API

A complete RESTful API for managing tasks with user authentication using JWT tokens and cookies.

## Project Structure

```
backend/
├── Controller/
│   ├── authcontroller.js    # Authentication logic
│   └── taskcontroller.js    # Task management logic
├── middleware/
│   └── authmiddleware.js    # JWT verification middleware
├── models/
│   ├── User.js             # User schema and model
│   └── Task.js             # Task schema and model
├── routes/
│   ├── authroutes.js       # Authentication routes
│   └── taskroutes.js       # Task management routes
├── Utilities/
│   ├── ExpressError.js     # Error handling utility
│   ├── passwordconstrain.js # Password validation
│   └── secreattoken.js     # JWT token generation
├── index.js                # Main server file
└── package.json
```

## Features

- **User Authentication**: Sign up, login, logout with JWT tokens stored in HTTP-only cookies
- **Task Management**: Full CRUD operations for tasks
- **Task Status**: Toggle between pending and completed states
- **Priority Levels**: Low, medium, and high priority tasks
- **Due Dates**: Optional due dates for tasks
- **User-specific Data**: Each user can only access their own tasks
- **Filtering & Sorting**: Filter by status/priority and sort by various fields
- **Security**: Password validation, JWT authentication, user verification

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication with cookies
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/signup` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/authstatus` | Get current user status | Private |
| GET | `/api/auth/logout` | Logout user | Public |

### Task Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/tasks` | Get all tasks | Private |
| POST | `/api/tasks` | Create a new task | Private |
| GET | `/api/tasks/:id` | Get a specific task | Private |
| PUT | `/api/tasks/:id` | Update a task | Private |
| PATCH | `/api/tasks/:id/status` | Toggle task status | Private |
| DELETE | `/api/tasks/:id` | Delete a task | Private |

## Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the backend directory with:
   ```
   ATLAS_URL=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   PORT=8080
   NODE_ENV=development
   ```

3. **Run the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Usage Examples

### User Registration
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

### User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123!"
}
```

### Create Task
```bash
POST /api/tasks
Content-Type: application/json
# Cookie with JWT token will be automatically sent

{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the task manager API",
  "priority": "high",
  "dueDate": "2024-01-15T23:59:59.000Z"
}
```

### Get All Tasks
```bash
GET /api/tasks?status=pending&priority=high&sortBy=createdAt&sortOrder=desc
# Cookie with JWT token will be automatically sent
```

### Update Task
```bash
PUT /api/tasks/:taskId
Content-Type: application/json
# Cookie with JWT token will be automatically sent

{
  "title": "Updated task title",
  "status": "completed",
  "priority": "medium"
}
```

### Toggle Task Status
```bash
PATCH /api/tasks/:taskId/status
# Cookie with JWT token will be automatically sent
```

### Delete Task
```bash
DELETE /api/tasks/:taskId
# Cookie with JWT token will be automatically sent
```

## Query Parameters

### Task Filtering
- `status`: Filter by task status (`pending` or `completed`)
- `priority`: Filter by priority level (`low`, `medium`, or `high`)

### Task Sorting
- `sortBy`: Sort field (`createdAt`, `updatedAt`, `title`, `priority`, `dueDate`)
- `sortOrder`: Sort order (`asc` or `desc`)

## Authentication Flow

1. **Signup**: User registers with email, username, and password
2. **Login**: User logs in with email and password
3. **JWT Token**: Server generates JWT token and stores it in HTTP-only cookie
4. **Protected Routes**: All task routes require valid JWT token in cookie
5. **Logout**: Server clears the JWT cookie

## Password Requirements

Passwords must meet the following criteria:
- At least 6 characters long
- Contains at least one uppercase letter
- Contains at least one lowercase letter
- Contains at least one number
- Contains at least one special character

## Response Format

Success responses:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Database Schema

### User Schema
```javascript
{
  username: String (required, minlength: 3),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  timestamps: true
}
```

### Task Schema
```javascript
{
  title: String (required, maxlength: 200),
  description: String (optional, maxlength: 1000),
  status: String (enum: ["pending", "completed"], default: "pending"),
  priority: String (enum: ["low", "medium", "high"], default: "medium"),
  dueDate: Date (optional),
  user: ObjectId (required, ref: "user"),
  timestamps: true
}
```

## Security Features

- Password hashing using bcrypt
- JWT token authentication with HTTP-only cookies
- User-specific data isolation
- Input validation and sanitization
- CORS configuration
- Error handling middleware
- Password strength validation

## Deployment

The API is ready for deployment on platforms like:
- Render
- Heroku
- Vercel
- Railway
- AWS

Make sure to set the environment variables in your deployment platform.

## License

MIT License
