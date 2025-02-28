import mongoose from 'mongoose';

const grnSchema = new mongoose.Schema(
  {
    grnNumber: {
      type: String,
      required: true,
      unique: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    receiptDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
    },
    poNumber: {
      type: String,
    },
    items: [
      {
        medication: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Medication',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unitPrice: {
          type: Number,
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
        manufacturingDate: {
          type: Date,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Verified', 'Added to Inventory', 'Rejected'],
      default: 'Pending',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const GRN = mongoose.model('GRN', grnSchema);

export default GRN;