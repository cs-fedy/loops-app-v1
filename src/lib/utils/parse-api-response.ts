import { Effect } from "effect"
import { isAxiosError } from "axios"
import { parseZodSchema } from "./parse-zod-schema"
import type { AxiosResponse } from "axios"
import type { z } from "zod"

type ParseApiResponseArgs<T, U> = {
  error: { name: string; schema: z.ZodSchema<T> }
  name: string
  success: { name: string; schema: z.ZodSchema<U> }
}

export function parseApiResponse<T, U>(
  args: ParseApiResponseArgs<T, U>,
): (response: Promise<AxiosResponse>) => Effect.Effect<U, T> {
  return (response) => {
    return Effect.tryPromise({
      catch: (e) => {
        if (isAxiosError(e) && e.response && args.error.schema.type !== "never")
          return parseZodSchema(args.error)(e.response.data)
        throw new Error(`Unable to parse ${args.name} schema`)
      },
      try: () =>
        response.then(({ data }) => {
          return parseZodSchema(args.success)(data)
        }),
    })
  }
}
