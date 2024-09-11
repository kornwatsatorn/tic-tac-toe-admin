import { z } from "zod"
export const UserSchema = z.object({
  search: z.string().nullable().default(null),
})

export type IUserSchema = z.infer<typeof UserSchema>
