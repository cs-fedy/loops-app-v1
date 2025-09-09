import { z } from "zod"
import { roleSchema } from "../value_objects/role"

export const userSchema = z.object({
  avatarURL: z.string(),
  background: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  city: z.string().optional(),
  codingExperience: z.string().optional(),
  country: z.string().optional(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional(),
  duration: z.coerce.number().int(),
  email: z.email(),
  fullName: z.string(),
  gender: z.string().optional(),
  globalXP: z.coerce.number().int(),
  goals: z.coerce.number().int(),
  interests: z.string().optional(),
  isConfirmed: z.boolean(),
  isDeleted: z.boolean(),
  isFirstTime: z.boolean(),
  isProfileCompleted: z.boolean(),
  language: z.enum(["en", "fr", "ar"]),
  phoneNumber: z.string(),
  resetPasswordToken: z.string().optional(),
  role: roleSchema,
  state: z.string().optional(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  username: z.string(),
})

export type User = z.infer<typeof userSchema>
