import { z } from "zod";

// Zod schema for address object
const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
});

// Zod schema for permissions map
const permissionsSchema = z.record(
  z.enum([
    "canAddClinic",
    "canEditClinic",
    "canDeleteClinic",
    "canAddDoctor",
    "canEditDoctor",
    "canDeleteDoctor",
    "canManagePayments",
    "canViewReports",
  ]),
  z.boolean()
);

// Zod schema for the main Admin object
const adminZodSchema = z.object({
  adminId: z.string(),
  fullName: z.string().min(1, "Full name is required").trim(),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  address: addressSchema.optional(),
  permissions: permissionsSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default adminZodSchema;
