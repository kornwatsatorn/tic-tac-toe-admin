import { z } from "zod"
export const LoginSchema = z.object({
  username: z
    .string()
    .default("")
    .refine((data) => data.trim() !== ""),
  password: z
    .string()
    .default("")
    .refine((data) => data.trim() !== ""),
})

export type ILoginSchema = z.infer<typeof LoginSchema>
