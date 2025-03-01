import { z } from "zod"

export const patientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in the format XXX-XXX-XXXX"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in the format YYYY-MM-DD"),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

export type PatientInput = z.infer<typeof patientSchema>

