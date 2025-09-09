import type { z } from "zod"

type ParseZodSchemaArgs<T> = {
  name: string
  schema: z.ZodSchema<T>
}

function parseZodSchema<T>({ name, schema }: ParseZodSchemaArgs<T>) {
  return function (data: any): T {
    const result = schema.safeParse(data)

    if (!result.success) {
      const payload = {} as Record<string, string>
      result.error.issues.forEach((error) => {
        const key = error.path.join(".")
        payload[key] = error.message
      })

      const raw = JSON.stringify(payload)
      throw new Error(`Unable to parse ${name} schema: ${raw}`)
    }

    return result.data
  }
}

export { parseZodSchema }
