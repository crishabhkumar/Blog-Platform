import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import { authenticate } from './middleware/auth.middleware';
import { authorizeRoles } from './middleware/role.middleware';
import blogroutes from './routes/blog.route';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors(
  {
    origin: 'http://localhost:5173', // Frontend URL
  }
)); // Enable CORS for all routes

app.use(express.json());
app.use('/api/auth', authRoutes); // Use the auth routes
app.use('/api/posts', blogroutes); // Use the blog routes


const PORT = process.env.PORT || 5000;

app.get('/', (_req, res) => {
  res.send('RBAC Blog Backend is running 🚀');
});




//Dummy testing api's
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user?.role}, you are authenticated.` });
});

app.get('/api/admin-only', authenticate, authorizeRoles('admin'), (req, res) => {
  res.json({ message: `Hello ${req.user?.role}, you are an admin.` });
});

app.get('/api/user-only', authenticate, authorizeRoles('user'), (req, res) => {
  res.json({ message: `Hello ${req.user?.role}, you are a user.` });
});

//End - Dummy testing api's


const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});