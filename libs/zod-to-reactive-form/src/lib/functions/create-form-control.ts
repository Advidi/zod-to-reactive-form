import {FieldOptions, GuardUndefined} from '../types';
import {z} from 'zod';
import {AbstractControlOptions, FormControl, Validators} from '@angular/forms';
import {isZodSchemaRequired} from './is-zod-schema-required';

export function createFormControl<TSchema extends z.ZodType>(schema: TSchema, overrides?: FieldOptions<z.infer<TSchema>> & AbstractControlOptions): FormControl<GuardUndefined<z.infer<TSchema>>> {
  const { value = null, disabled = false } = overrides ?? {};

  return new FormControl(
    {value, disabled},
    {
      nonNullable: isZodSchemaRequired(schema),
      validators: isZodSchemaRequired(schema) ? [Validators.required] : [],
      asyncValidators: [],
      ...overrides
    }
  ) as FormControl<GuardUndefined<z.infer<TSchema>>>;
}
