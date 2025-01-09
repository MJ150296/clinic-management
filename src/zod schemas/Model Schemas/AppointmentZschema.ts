import { z } from "zod";

// Zod schema for ObjectId validation (used for doctor, patient, createdBy)
const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

// Zod schema for Appointment
const appointmentZodSchema = z.object({
  appointmentId: z.string(),
  doctor: objectIdSchema,
  patient: objectIdSchema,
  appointmentDate: z.date(),
  status: z.enum(["Scheduled", "Completed", "Cancelled"]).default("Scheduled"),
  consultationType: z.enum(["In-Person", "Online"]),
  notes: z.string().optional(),
  createdBy: objectIdSchema,
  createdAt: z.date().optional(), // Timestamp field (optional)
  updatedAt: z.date().optional(), // Timestamp field (optional)
});

export default appointmentZodSchema;
