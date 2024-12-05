import {z} from 'zod';
import {FormGroup} from '@angular/forms';
import {DeepDisabled, DeepNullable, ZodFormGroup} from '../types';
import {createFormControl} from './create-form-control';
import {createFormArray} from './create-form-array';

export type FormGroupDefaults<TSchema extends z.SomeZodObject> = DeepNullable<z.output<TSchema>>;

export interface FormGroupOptions<TSchema extends z.SomeZodObject> {
  value?: FormGroupDefaults<TSchema>;
  disabled?: DeepDisabled<z.output<TSchema>>;
}

export function createFormGroup<TSchema extends z.SomeZodObject>(schema: TSchema, options?: FormGroupOptions<TSchema>): ZodFormGroup<TSchema> {
  return new FormGroup(
    Object.entries(schema.shape).reduce((acc, [key, shapeSchema]) => {
      const value = options?.value?.[key];
      const disabled = options?.disabled?.[key];

      acc[key] = shapeSchema instanceof z.ZodObject
        ? createFormGroup(shapeSchema, { value, disabled })
        : shapeSchema instanceof z.ZodArray ? createFormArray(shapeSchema, { value, disabled: disabled as any })
          : createFormControl(shapeSchema, { value, disabled: disabled as boolean });
      return acc;
    }, {} as any)
  ) as ZodFormGroup<TSchema>;
}
