import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/', createUser);
router.post('/login', loginUser);

// Protected routes
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, admin, deleteUser);

export default router;