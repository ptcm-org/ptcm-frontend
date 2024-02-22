import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  role: z.string(),
  implantationGroup: z.string(),
  phone: z.string(),
  email: z.string(),
  status: z.string(),
  gender: z.string(),
});

export type User = z.infer<typeof userSchema>;
