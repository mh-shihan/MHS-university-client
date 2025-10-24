import { z } from 'zod';

export const academicSemesterSchema = z.object({
  name: z.string({ error: 'Please select a Name' }),
  year: z.string({ error: 'Please select a Year' }),
  startMonth: z.string({ error: 'Please select a Start Month' }),
  endMonth: z.string({ error: 'Please select a End Month' }),
});
