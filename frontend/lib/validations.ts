import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Name too long'),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED']),
  dueDate: z.string().optional().refine((date) => {
    if (!date) return true;
    return new Date(date) >= new Date(new Date().toDateString());
  }, 'Due date cannot be in the past'),
});