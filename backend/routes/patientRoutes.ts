import express, { Router } from 'express';
import { getPatients, getPatientById, createPatient, updatePatient, deletePatient, addMedicationToPatient, updatePatientMedication } from '../controllers/patientController';
import { protect, medical } from '../middleware/authMiddleware';

const router: Router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

// Medication management for patients
router.post('/:id/medications', addMedicationToPatient);
router.put('/:id/medications/:medicationId', updatePatientMedication);

export default router;