import {z} from 'zod';
import {AbstractControlOptions, FormControl, FormGroup} from '@angular/forms';
import {GuardUndefined, UnwrapLazyType, ZodControl, ZodFormGroup} from '../types';
import {createZodControl} from "./create-zod-control";

export type FormGroupOverrides<TSchema> =
  TSchema extends z.ZodObject<infer TObjectType>
    ? { [K in keyof TObjectType]?: ZodControl<UnwrapLazyType<TObjectType[K]>> | FormControl<GuardUndefined<z.infer<TObjectType[K]>>> }
    : never;

export function createFormGroup<TSchema extends z.SomeZodObject>(
  schema: TSchema,
  overrides?: FormGroupOverrides<TSchema>,
  options?: AbstractControlOptions
): ZodFormGroup<TSchema> {
  return new FormGroup(
    Object.entries(schema.shape).reduce((acc, [key, shapeSchema]) => {
      acc[key] = overrides?.[key] ?? createZodControl(shapeSchema);

      return acc;
    }, {} as any),
    options) as ZodFormGroup<TSchema>;
}
