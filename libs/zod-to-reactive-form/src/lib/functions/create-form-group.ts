import {z} from 'zod';
import {AbstractControl, AbstractControlOptions, FormControl, FormGroup} from '@angular/forms';
import {FieldOptions, GeneratorOptions, UnwrapLazyType, ZodControl, ZodFormGroup} from '../types';
import {createZodControl} from "./create-zod-control";

export type FormGroupOverrides<TSchema> =
  TSchema extends z.ZodObject<infer TObjectType>
    ? { [K in keyof TObjectType]?: FieldOptions<z.infer<TObjectType[K]>> | ZodControl<UnwrapLazyType<TObjectType[K]>> | FormControl<z.infer<TObjectType[K]>> }
    : never;

export function createFormGroup<TSchema extends z.SomeZodObject>(
  schema: TSchema,
  overrides?: FormGroupOverrides<TSchema>,
  options?: AbstractControlOptions,
  generatorOptions?: GeneratorOptions,
): ZodFormGroup<TSchema> {
  return new FormGroup(
    Object.entries(schema.shape).reduce((acc, [key, shapeSchema]) => {
      const overrideOrOption = overrides?.[key];

      if (overrideOrOption instanceof AbstractControl) {
        acc[key] = overrideOrOption;
      } else {
        acc[key] = createZodControl(shapeSchema, {...generatorOptions, ...overrideOrOption});
      }

      return acc;
    }, {} as any),
    options) as ZodFormGroup<TSchema>;
}
