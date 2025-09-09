import { z } from "zod"

export const invalidInputFactory = <T extends z.ZodTypeAny>(payload: T) =>
  z.object({ code: z.literal("invalid_input"), message: z.string(), payload })
