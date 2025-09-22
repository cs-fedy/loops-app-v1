import type {
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  FormApi as TFormApi,
} from "@tanstack/react-form"
import { Schema } from "effect"

export const unknownErrorSchema = Schema.Struct({
  code: Schema.Literal("UnknownError"),
  message: Schema.String,
})

export type FormApi<TFormData> = TFormApi<
  TFormData,
  FormValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  FormAsyncValidateOrFn<TFormData> | undefined,
  unknown
>

export type ProgressState = "completed" | "started" | "locked"
