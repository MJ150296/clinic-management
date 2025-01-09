import mongoose, { model, Schema } from "mongoose";
import { nanoid } from "nanoid";

// Main Admin Interface extending mongoose.Document
export interface ISuperAdmin extends Document {
  permissions: Map<string, boolean>;

  superAdminId: string;
  fullName?: string;
  contactNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const superAdminSchema: Schema<ISuperAdmin> = new Schema(
  {
    permissions: {
      type: Map,
      of: Boolean,
      default: new Map([
        ["canAddClinic", true],
        ["canEditClinic", true],
        ["canDeleteClinic", true],
        ["canAddDoctor", true],
        ["canEditDoctor", true],
        ["canDeleteDoctor", true],
        ["canManagePayments", true],
        ["canViewReports", true],
      ]),
    },

    superAdminId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(),
    },
    fullName: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.superAdmin ||
  model<ISuperAdmin>("superAdmin", superAdminSchema);
