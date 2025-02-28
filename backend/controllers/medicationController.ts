import { Request, Response } from 'express';
import Medication from '../models/Medication';

// @desc    Get all medications
// @route   GET /api/medications
// @access  Private
export const getMedications = async (req: Request, res: Response) => {
  try {
    const medications = await Medication.find({});
    res.json(medications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get medication by ID
// @route   GET /api/medications/:id
// @access  Private
export const getMedicationById = async (req: Request, res: Response) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (medication) {
      res.json(medication);
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a medication
// @route   POST /api/medications
// @access  Private/Admin/Pharmacist
export const createMedication = async (req: Request, res: Response) => {
  try {
    const {
      name,
      genericName,
      category,
      dosageForm,
      strength,
      manufacturer,
      batchNumber,
      expiryDate,
      barcode,
      unitPrice,
      description,
      sideEffects,
      storage,
    } = req.body;

    const medication = new Medication({
      name,
      genericName,
      category,
      dosageForm,
      strength,
      manufacturer,
      batchNumber,
      expiryDate,
      barcode,
      unitPrice,
      description,
      sideEffects,
      storage,
    });

    const createdMedication = await medication.save();
    res.status(201).json(createdMedication);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a medication
// @route   PUT /api/medications/:id
// @access  Private/Admin/Pharmacist
export const updateMedication = async (req: Request, res: Response) => {
  try {
    const {
      name,
      genericName,
      category,
      dosageForm,
      strength,
      manufacturer,
      batchNumber,
      expiryDate,
      barcode,
      unitPrice,
      description,
      sideEffects,
      storage,
    } = req.body;

    const medication = await Medication.findById(req.params.id);

    if (medication) {
      medication.name = name || medication.name;
      medication.genericName = genericName || medication.genericName;
      medication.category = category || medication.category;
      medication.dosageForm = dosageForm || medication.dosageForm;
      medication.strength = strength || medication.strength;
      medication.manufacturer = manufacturer || medication.manufacturer;
      medication.batchNumber = batchNumber || medication.batchNumber;
      medication.expiryDate = expiryDate || medication.expiryDate;
      medication.barcode = barcode || medication.barcode;
      medication.unitPrice = unitPrice || medication.unitPrice;
      medication.description = description || medication.description;
      medication.sideEffects = sideEffects || medication.sideEffects;
      medication.storage = storage || medication.storage;

      const updatedMedication = await medication.save();
      res.json(updatedMedication);
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a medication
// @route   DELETE /api/medications/:id
// @access  Private/Admin
export const deleteMedication = async (req: Request, res: Response) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (medication) {
      await medication.deleteOne();
      res.json({ message: 'Medication removed' });
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};