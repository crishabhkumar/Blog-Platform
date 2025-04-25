import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/blog.controller';

const router = express.Router();

router.get('/', getAllPosts); //public API
router.get('/:id', getPostById); //public API

router.post('/', authenticate, authorizeRoles('admin'), createPost); //admin only
router.put('/:id', authenticate, authorizeRoles('admin'), updatePost); //admin only
router.delete('/:id', authenticate, authorizeRoles('admin'), deletePost); //admin only

export default router;