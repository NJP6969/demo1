import { Request, Response } from 'express';
import Inventory from '../models/Inventory';
import Medication from '../models/Medication';

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Private
export const getInventoryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventoryItems = await Inventory.find({}).populate('medication', 'name genericName dosageForm strength');
    res.json(inventoryItems);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get inventory item by ID
// @route   GET /api/inventory/:id
// @access  Private
export const getInventoryItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id).populate('medication');

    if (inventoryItem) {
      res.json(inventoryItem);
    } else {
      res.status(404).json({ message: 'Inventory item not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an inventory item
// @route   POST /api/inventory
// @access  Private/Admin/Pharmacist
export const createInventoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      medication,
      quantity,
      reorderLevel,
      location,
      batchNumber,
      expiryDate,
      status,
    } = req.body;

    // Check if medication exists
    const medicationExists = await Medication.findById(medication);
    if (!medicationExists) {
      res.status(400).json({ message: 'Invalid medication' });
      return;
    }

    // Calculate status if not provided
    let calculatedStatus = status || 'Available';
    if (quantity <= 0) {
      calculatedStatus = 'Out of Stock';
    } else if (quantity <= reorderLevel) {
      calculatedStatus = 'Low Stock';
    }

    const inventoryItem = await Inventory.create({
      medication,
      quantity,
      reorderLevel,
      location,
      batchNumber,
      expiryDate,
      status: calculatedStatus,
      updatedBy: req.user._id,
    });

    res.status(201).json(inventoryItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an inventory item
// @route   PUT /api/inventory/:id
// @access  Private/Admin/Pharmacist
export const updateInventoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);

    if (!inventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }

    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user._id },
      { new: true }
    );

    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an inventory item
// @route   DELETE /api/inventory/:id
// @access  Private/Admin/Pharmacist
export const deleteInventoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);

    if (!inventoryItem) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }

    await inventoryItem.deleteOne();
    res.json({ message: 'Inventory item removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};