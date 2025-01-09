import { z } from "zod";

// ✅ Address Schema
const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

// ✅ Emergency Contact Schema
const emergencyContactSchema = z.object({
  name: z.string().min(1, "Emergency contact name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
});

// ✅ Permissions Schema
const permissionsSchema = z.record(z.boolean());

// ✅ Receptionist Zod Schema
const receptionistZodSchema = z.object({
  receptionistId: z.string().min(1, "Receptionist ID is required"),
  fullName: z.string().min(1, "Full name is required").trim(),
  contactNumber: z.string().min(1, "Contact number is required"),
  address: addressSchema,
  dateOfBirth: z.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  emergencyContact: emergencyContactSchema,
  appointmentsHandled: z.number().nonnegative().default(0),
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
});

// ✅ Export the Zod Schema
export default receptionistZodSchema;
