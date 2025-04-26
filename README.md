# RBAC Blog Application

This is a full-stack blog application with Role-Based Access Control (RBAC). It consists of a backend built with Node.js, Express, and MongoDB, and a frontend built with React and Vite.

## Features

### Backend

- User authentication (signup/login) with JWT.
- Role-based access control for `admin` and `user` roles.
- CRUD operations for blog posts.
- MongoDB integration using Mongoose.
- Middleware for authentication and role-based authorization.

### Frontend

- React-based UI with routing using `react-router-dom`.
- Admin dashboard for managing blog posts.
- User-friendly forms for login and signup.
- Responsive design with Bootstrap.
- API integration using Axios.

## Architecture

The following diagram illustrates the architecture of the RBAC Blog Application:

![Architecture Diagram](/Documentation/RBACArchietecture.png)


## Project Structure

### Backend

- **`src/config`**: Database connection configuration.
- **`src/controllers`**: Logic for handling API requests.
- **`src/middleware`**: Authentication and authorization middleware.
- **`src/models`**: Mongoose models for `User` and `Blog`.
- **`src/routes`**: API routes for authentication and blog posts.
- **`src/utils`**: Utility functions like JWT token generation.

### Frontend

- **`src/pages`**: React components for different pages (e.g., HomePage, AdminDashboard, LoginSignPage).
- **`src/components`**: Reusable UI components (e.g., Navbar, ProtectedRoute).
- **`src/services`**: API service for Axios configuration.
- **`src/types`**: TypeScript type definitions.

## Installation

### Prerequisites

- Node.js and npm installed.
- MongoDB instance running locally or in the cloud.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd rbac-blog-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the rbac-blog-backend directory with the following variables:
   ```bash
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd rbac-blog-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Usage

1. Open the frontend in your browser at http://localhost:5173.
2. Sign up as a user or admin.
3. Log in to access the application.
4. Admins can create, update, and delete blog posts via the Admin Dashboard.
5. Users can view all blog posts on the homepage.

## API Endpoints

### Authentication

- **`POST /api/auth/signup`**: Register a new user.
- **`POST /api/auth/login`**: Authenticate a user and return a JWT.

### Blog Posts

- **`GET /api/posts`**: Retrieve all blog posts (public).
- **`GET /api/posts/:id`**: Retrieve a specific blog post by ID (public).
- **`POST /api/posts`**: Create a new blog post (admin only).
- **`PUT /api/posts/:id`**: Update an existing blog post by ID (admin only).
- **`DELETE /api/posts/:id`**: Delete a blog post by ID (admin only).

### Users

- **`GET /api/users`**: Retrieve a list of all users (admin only).
- **`GET /api/users/:id`**: Retrieve details of a specific user (admin only).
- **`DELETE /api/users/:id`**: Delete a user by ID (admin only).

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- TypeScript

### Frontend

- React
- Vite
- Axios
- Bootstrap
- SweetAlert2 for notifications
- TypeScript

## Screenshots

### Homepage

![Homepage](/Screenshots/Dashboard.png)

### Signup Page

![SignUp Page](/Screenshots/SignUp.png)

### Login Page

![Login Page](/Screenshots/SignIn.png)

### Admin Dashboard

![Admin Dashboard](/Screenshots/AdminDashboard.png)
