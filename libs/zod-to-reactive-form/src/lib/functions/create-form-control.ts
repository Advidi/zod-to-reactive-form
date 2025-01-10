import {FieldOptions} from '../types';
import {z} from 'zod';
import {FormControl, Validators} from '@angular/forms';

export function createFormControl<TSchema extends z.ZodType>(schema: TSchema, overrides?: FieldOptions<z.infer<TSchema>>): FormControl<z.infer<TSchema>> {
  const { value = null, disabled = false } = overrides ?? {};
  const isRequired = overrides?.isRequired ?? ((schema: z.ZodSchema) => !schema.isOptional());

  return new FormControl(
    {value, disabled},
    {
      nonNullable: !(schema instanceof z.ZodNullable),
      ...overrides,
      validators: (isRequired(schema) ? [Validators.required] : []).concat(overrides?.validators ?? []),
    }
  ) as FormControl<z.infer<TSchema>>;
}
