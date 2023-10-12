import { LeadStatus } from "@prisma/client";
import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const LeadsSchema = z.object({
  id: z.string(),
  ip: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  state: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  status: z.nativeEnum(LeadStatus),
});

export type Task = z.infer<typeof LeadsSchema>;
