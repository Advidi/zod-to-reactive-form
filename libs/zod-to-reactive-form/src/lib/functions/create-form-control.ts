import {GuardUndefined} from '../types';
import {z} from 'zod';
import {AbstractControlOptions, FormControl, Validators} from '@angular/forms';
import {isZodSchemaRequired} from './is-zod-schema-required';

export interface FormControlFromZodOptions<TSchema extends z.ZodType> {
  value?: GuardUndefined<z.infer<TSchema>>;
  disabled?: boolean;
}

export function createFormControl<TSchema extends z.ZodType>(schema: TSchema, overrides?: FormControlFromZodOptions<TSchema>, options?: AbstractControlOptions): FormControl<GuardUndefined<z.infer<TSchema>>> {
  const { value = null, disabled = false } = overrides ?? {};

  return new FormControl(
    {value, disabled},
    options ?? {nonNullable: isZodSchemaRequired(schema), validators: isZodSchemaRequired(schema) ? [Validators.required] : []}
  ) as FormControl<GuardUndefined<z.infer<TSchema>>>;
}
