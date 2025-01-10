import {z} from "zod";

export interface GeneratorOptions  {
  isRequired?: (schema: z.ZodSchema) => boolean;
}
