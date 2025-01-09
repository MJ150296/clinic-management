import { z } from "zod";

// ✅ Define the Zod Schema
const userZodSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum([
    "SuperAdmin",
    "Admin",
    "clientAdmin",
    "Doctor",
    "Receptionist",
    "Patient",
  ]),
  profileImageUrl: z.string().url().optional(),
  registrationDate: z.date().optional(),
  lastLogin: z.date().optional(),
  status: z.enum(["Active", "Inactive", "Suspended"]).default("Inactive"),
  isActive: z.boolean().optional(),
});

// ✅ Export the Zod Schema
export default userZodSchema;
