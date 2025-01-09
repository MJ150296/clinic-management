import { z } from "zod";

// ✅ Address Schema
const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
});

// ✅ Permissions Schema
const permissionsSchema = z.record(z.boolean());

// ✅ SuperAdmin Zod Schema
const superAdminZodSchema = z.object({
  superAdminId: z.string().min(1, "SuperAdmin ID is required"),
  fullName: z.string().optional(),
  contactNumber: z.string().optional(),
  address: addressSchema.optional(),
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
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// ✅ Export the Zod Schema
export default superAdminZodSchema;
