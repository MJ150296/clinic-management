import { z } from "zod";

// Address schema
const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

// Authorized Doctors schema
const authorizedDoctorsSchema = z.array(z.string().min(24, "Invalid ObjectId"));

// Services schema
const servicesSchema = z.array(
  z.object({
    serviceName: z.string().min(1, "Service name is required"),
    price: z.number().min(0, "Price must be a positive number"),
    description: z.string().optional(),
    isActive: z.boolean().default(true),
  })
);

// Business Hours schema
const businessHoursSchema = z.array(
  z.object({
    day: z.string().min(1, "Day is required"),
    openTime: z.string().min(1, "Open time is required"),
    closeTime: z.string().min(1, "Close time is required"),
  })
);

// Subscription Plan schema
const subscriptionPlanSchema = z.object({
  planName: z.string().min(1, "Plan name is required"),
  startDate: z.date(),
  endDate: z.date(),
  price: z.number().min(0, "Price must be a positive number"),
  isActive: z.boolean().default(true),
});

// Appointment Policy schema
const appointmentPolicySchema = z.object({
  maxAppointmentsPerDay: z
    .number()
    .min(1, "Max appointments per day must be at least 1"),
  cancellationNoticeHours: z.number().min(0).default(24),
});

// Payment Details schema
const paymentDetailsSchema = z.object({
  paymentMethod: z.string().min(1, "Payment method is required"),
  totalPaid: z.number().min(0, "Total paid must be a positive number"),
  lastPaymentDate: z.date().optional(),
});

// Main Clinic schema
const clinicZodSchema = z.object({
  clinicId: z.string(),
  name: z.string().min(1, "Clinic name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  address: addressSchema,
  authorizedDoctors: authorizedDoctorsSchema,
  services: servicesSchema,
  businessHours: businessHoursSchema,
  subscriptionPlan: subscriptionPlanSchema,
  appointmentPolicy: appointmentPolicySchema,
  paymentDetails: paymentDetailsSchema,
  status: z
    .enum(["active", "inactive", "pending", "suspended"])
    .default("pending"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default clinicZodSchema;
