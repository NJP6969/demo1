import { Request, Response } from 'express';
import GRN from '../models/GRN';
import Medication from '../models/Medication';
import Inventory from '../models/Inventory';

// @desc    Get all GRNs
// @route   GET /api/grn
// @access  Private
export const getGRNs = async (req: Request, res: Response): Promise<void> => {
  try {
    const grns = await GRN.find({})
      .populate('receivedBy', 'name email')
      .populate('items.medication', 'name genericName dosageForm strength');
    res.json(grns);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get GRN by ID
// @route   GET /api/grn/:id
// @access  Private
export const getGRNById = async (req: Request, res: Response): Promise<void> => {
  try {
    const grn = await GRN.findById(req.params.id)
      .populate('receivedBy', 'name email')
      .populate('items.medication', 'name genericName dosageForm strength');

    if (grn) {
      res.json(grn);
    } else {
      res.status(404).json({ message: 'GRN not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a GRN
// @route   POST /api/grn
// @access  Private/Admin/Pharmacist
export const createGRN = async (req: Request, res: Response): Promise<void> => {
  try {
    // ... rest of your createGRN code ...
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a GRN
// @route   PUT /api/grn/:id
// @access  Private/Admin/Pharmacist
export const updateGRN = async (req: Request, res: Response): Promise<void> => {
  try {
    // ... rest of your updateGRN code ...
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a GRN
// @route   DELETE /api/grn/:id
// @access  Private/Admin
export const deleteGRN = async (req: Request, res: Response): Promise<void> => {
  try {
    // ... rest of your deleteGRN code ...
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify a GRN
// @route   PUT /api/grn/:id/verify
// @access  Private/Admin/Pharmacist
export const verifyGRN = async (req: Request, res: Response): Promise<void> => {
  try {
    // ... rest of your verifyGRN code ...
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add GRN to inventory
// @route   PUT /api/grn/:id/add-to-inventory
// @access  Private/Admin/Pharmacist
export const addGRNToInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    // ... rest of your addGRNToInventory code ...
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};