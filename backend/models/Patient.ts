import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    ward: {
      type: String,
      required: true,
    },
    bedNumber: {
      type: String,
      required: true,
    },
    allergies: [String],
    diagnoses: [String],
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    dischargeDate: {
      type: Date,
    },
    medications: [
      {
        medication: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Medication',
        },
        dosage: String,
        frequency: String,
        startDate: Date,
        endDate: Date,
        status: {
          type: String,
          enum: ['Active', 'Completed', 'Discontinued'],
          default: 'Active',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;