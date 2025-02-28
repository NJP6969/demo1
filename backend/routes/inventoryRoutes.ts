import express from 'express';
import { getInventoryItems, getInventoryItemById, createInventoryItem, updateInventoryItem, deleteInventoryItem } from '../controllers/inventoryController';
import { protect, pharmacist } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes - all inventory operations require authentication
router.get('/', protect, getInventoryItems);
router.get('/:id', protect, getInventoryItemById);
router.post('/', protect, pharmacist, createInventoryItem);
router.put('/:id', protect, pharmacist, updateInventoryItem);
router.delete('/:id', protect, pharmacist, deleteInventoryItem);

export default router;