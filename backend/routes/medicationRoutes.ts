import express from 'express';
import { getMedications, getMedicationById, createMedication, updateMedication, deleteMedication } from '../controllers/medicationController';
import { protect, pharmacist } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getMedications);
router.get('/:id', getMedicationById);

// Protected routes
router.post('/', protect, pharmacist, createMedication);
router.put('/:id', protect, pharmacist, updateMedication);
router.delete('/:id', protect, pharmacist, deleteMedication);

export default router;