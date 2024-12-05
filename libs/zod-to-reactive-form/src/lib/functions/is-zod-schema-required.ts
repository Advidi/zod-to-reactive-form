import {z} from 'zod';

export function isZodSchemaRequired(schema: z.ZodSchema): boolean {
  return !(schema instanceof z.ZodOptional) && !(schema instanceof z.ZodNullable);
}
