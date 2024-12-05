import {GuardUndefined} from '../types';
import {z} from 'zod';
import {FormControl, Validators} from '@angular/forms';
import {isZodSchemaRequired} from './is-zod-schema-required';

export interface FormControlFromZodOptions<TSchema extends z.ZodType> {
  value?: GuardUndefined<z.infer<TSchema>>;
  disabled?: boolean;
}

export function createFormControl<TSchema extends z.ZodType>(schema: TSchema, options?: FormControlFromZodOptions<TSchema>): FormControl<GuardUndefined<z.infer<TSchema>>> {
  const { value = null, disabled = false } = options ?? {};

  return new FormControl({value, disabled}, {nonNullable: isZodSchemaRequired(schema), validators: isZodSchemaRequired(schema) ? [Validators.required] : []}) as FormControl<GuardUndefined<z.infer<TSchema>>>;
}
