import {z} from 'zod';
import {ZodControl, ZodFormArray} from '../types';
import {AbstractControlOptions, FormArray} from '@angular/forms';

export type FormArrayOverrides<TSchema> =
  TSchema extends z.ZodArray<infer TArray>
    ? Array<ZodControl<TArray>>
    : never;

export function createFormArray<TSchema extends z.ZodArray<z.ZodTypeAny>>(
  schema: TSchema,
  overrides?: FormArrayOverrides<TSchema>,
  options?: AbstractControlOptions
): ZodFormArray<TSchema> {
  return new FormArray<any>(overrides ?? [], options)  as unknown as ZodFormArray<TSchema>;
}
