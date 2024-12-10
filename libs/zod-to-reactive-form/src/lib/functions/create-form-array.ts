import {z} from 'zod';
import {FieldOptions, ZodControl, ZodFormArray} from '../types';
import {AbstractControl, AbstractControlOptions, FormArray} from '@angular/forms';
import {createZodControl} from "./create-zod-control";

export type FormArrayOverrides<TSchema> =
  TSchema extends z.ZodArray<infer TArray>
    ? Array<ZodControl<TArray> | FieldOptions<z.infer<TArray>>>
    : never;

export function createFormArray<TSchema extends z.ZodArray<z.ZodTypeAny>>(
  schema: TSchema,
  overrides?: FormArrayOverrides<TSchema>,
  options?: AbstractControlOptions
): ZodFormArray<TSchema> {
  const formArray = new FormArray<any>([], options);
  const element = schema.element;

  overrides?.forEach((override) => {
    return formArray.push(override instanceof AbstractControl ? override : createZodControl(element));
  })

  return formArray as unknown as ZodFormArray<TSchema>;
}

