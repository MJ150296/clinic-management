import { z } from "zod";

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
});

const emergencyContactSchema = z.object({
  fullName: z.string().min(1, "Emergency contact name is required"),
  contactNumber: z.string().min(1, "Emergency contact number is required"),
  relationship: z.string().min(1, "Relationship is required"),
});

const permissionsSchema = z.record(z.boolean());

const patientZodSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  fullName: z.string().min(1, "Full name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.date(),
  address: addressSchema.optional(),
  medicalHistory: z.array(z.string()).optional(),
  currentMedications: z.array(z.string()).optional(),
  emergencyContact: emergencyContactSchema,
  permissions: permissionsSchema.default({
    canAddClinic: true,
    canEditClinic: true,
    canDeleteClinic: true,
    canAddDoctor: true,
    canEditDoctor: true,
    canDeleteDoctor: true,
    canManagePayments: true,
    canViewReports: true,
  }),
  assignedDoctor: z.string().min(1, "Assigned doctor ID is required"),
});

// Export the Zod schema
export default patientZodSchema;
