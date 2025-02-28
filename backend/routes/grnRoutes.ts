import express from 'express';
import { getGRNs, getGRNById, createGRN, updateGRN, deleteGRN, verifyGRN, addGRNToInventory } from '../controllers/grnController';
import { protect, pharmacist } from '../middleware/authMiddleware';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/', getGRNs);
router.get('/:id', getGRNById);
router.post('/', pharmacist, createGRN);
router.put('/:id', pharmacist, updateGRN);
router.delete('/:id', pharmacist, deleteGRN);

// Special GRN operations
router.put('/:id/verify', pharmacist, verifyGRN);
router.put('/:id/add-to-inventory', pharmacist, addGRNToInventory);

export default router;