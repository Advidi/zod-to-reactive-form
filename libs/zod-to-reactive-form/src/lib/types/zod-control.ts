import {GuardUndefined} from './undefined-guard';
import {z} from 'zod';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {UnwrapLazyType} from './unwrap-lazy';

export type ZodControl<T> =
  T extends z.ZodArray<infer TArray>
    ? FormArray<ZodControl<UnwrapLazyType<TArray>>>
    : T extends z.ZodObject<infer TObjectType>
      ? FormGroup<{ [K in keyof TObjectType]: ZodControl<UnwrapLazyType<TObjectType[K]>> }>
      : T extends z.ZodFirstPartySchemaTypes
        ? T extends z.ZodType<infer Output>
          ? FormControl<GuardUndefined<Output>>
          : never
        : never;

export type ZodFormGroup<T> = T extends z.ZodObject<infer TObjectType> ? ZodControl<T> : never;
export type ZodFormArray<T> = T extends z.ZodArray<infer TObjectType> ? ZodControl<T> : never;
