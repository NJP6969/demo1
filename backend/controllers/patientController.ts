import { Request, Response } from 'express';
import Patient from '../models/Patient';
import Medication from '../models/Medication';
import Inventory from '../models/Inventory';

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
export const getPatients = async (req: Request, res: Response): Promise<void> => {
  try {
    const patients = await Patient.find({}).select('-medications');
    res.json(patients);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get patient by ID
// @route   GET /api/patients/:id
// @access  Private
export const getPatientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const patient = await Patient.findById(req.params.id).populate('medications.medication');
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a patient
// @route   POST /api/patients
// @access  Private
export const createPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { hospitalId, firstName, lastName, dateOfBirth, gender, ward, bedNumber, allergies, diagnoses, admissionDate } = req.body;

    const patientExists = await Patient.findOne({ hospitalId });
    if (patientExists) {
      res.status(400).json({ message: 'Patient with this hospital ID already exists' });
      return;
    }

    const patient = await Patient.create({
      hospitalId,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      ward,
      bedNumber,
      allergies: allergies || [],
      diagnoses: diagnoses || [],
      admissionDate: admissionDate || Date.now(),
      medications: []
    });

    res.status(201).json(patient);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
export const updatePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.json(updatedPatient);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private
export const deletePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }

    await patient.deleteOne();
    res.json({ message: 'Patient removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add medication to patient
// @route   POST /api/patients/:id/medications
// @access  Private
export const addMedicationToPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { medicationId, dosage, frequency, startDate, endDate } = req.body;

    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }

    const medication = await Medication.findById(medicationId);
    if (!medication) {
      res.status(404).json({ message: 'Medication not found' });
      return;
    }

    // Check inventory
    const inventory = await Inventory.findOne({
      medication: medicationId,
      status: { $in: ['Available', 'Low Stock'] },
      quantity: { $gt: 0 }
    });

    if (!inventory) {
      res.status(400).json({ message: 'Medication not available in inventory' });
      return;
    }

    patient.medications.push({
      medication: medicationId,
      dosage,
      frequency,
      startDate: startDate || new Date(),
      endDate,
      status: 'Active'
    });

    await patient.save();
    res.json(patient);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update patient medication status
// @route   PUT /api/patients/:id/medications/:medicationId
// @access  Private
export const updatePatientMedication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }

    const medicationIndex = patient.medications.findIndex(
      med => med._id.toString() === req.params.medicationId
    );

    if (medicationIndex === -1) {
      res.status(404).json({ message: 'Medication not found for this patient' });
      return;
    }

    patient.medications[medicationIndex].status = status;
    if (status === 'Completed') {
      patient.medications[medicationIndex].endDate = new Date();
    }

    await patient.save();
    res.json(patient);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};