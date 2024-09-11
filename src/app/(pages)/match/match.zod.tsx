import { EMatchType, EQueueStatus } from "@/utils/enum"
import { z } from "zod"
export const MatchSchema = z.object({
  player: z.string().nullable().default(null),
  type: z.nativeEnum(EMatchType).nullable().default(null),
  status: z.nativeEnum(EQueueStatus).nullable().default(null),
})

export type IMatchSchema = z.infer<typeof MatchSchema>
