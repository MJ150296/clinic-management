import { z } from "zod";

// ================== Login ZOD Schema ==================

const loginZodSchema = z.object({
  email: z.string().email("Invalid Email address"),
  password: z.string(),
});

export default loginZodSchema;
