import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genericName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    dosageForm: {
      type: String,
      required: true,
    },
    strength: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    batchNumber: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    barcode: {
      type: String,
      unique: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    sideEffects: {
      type: String,
    },
    storage: {
      type: String,
      default: 'Store at room temperature',
    }
  },
  {
    timestamps: true,
  }
);

const Medication = mongoose.model('Medication', medicationSchema);

export default Medication;