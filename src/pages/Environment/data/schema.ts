import { z } from 'zod';

export const environmentSchema = z.object({
  id: z.number(),
  formCode: z.number(),
  phaseLabel: z.string(),
  date: z.string(),
  weekKH: z.string(),
  treeGroup: z.string(),
  box: z.string(),
  importExport: z.string(),
  capacity: z.string(),
  bagCode: z.number(),
  tChild: z.string(),
  bagBox: z.string(),
  environmentRoom: z.number(),
  environmentalShelves: z.number(),
  nvPour: z.string(),
  minute: z.string(),
  staff: z.string(),
  dateAdded: z.string(),
  note: z.string(),
});

export type EnvironmentType = z.infer<typeof environmentSchema>;
