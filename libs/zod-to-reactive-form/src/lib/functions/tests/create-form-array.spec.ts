import {createFormArray} from '../create-form-array';
import {z} from 'zod';
import {FormArray} from '@angular/forms';
import {createFormControl} from "@advidi/zod-to-reactive-form";

describe('createFormArray', () => {
  it('should create a FormArray', () => {
    const control = createFormArray(z.array(z.string()));

    expect(control).toBeInstanceOf(FormArray);
  })

  it('should create an empty FormArray if no values are provided', () => {
    const control = createFormArray(z.array(z.string()));

    expect(control.controls.length).toBe(0);
  })

  it('should create a FormArray with default values', () => {
    const control = createFormArray(z.array(z.string()), [
      createFormControl(z.string(), {value: 'John'}),
      createFormControl(z.string(), {value: 'Doe'}),
    ]);

    expect(control.value).toEqual(['John', 'Doe']);
  })

  it('should create nested controls if values are provided', () => {
    const control = createFormArray(z.array(z.string()), [
      createFormControl(z.string(), {value: 'John'}),
      createFormControl(z.string(), {value: 'Doe'}),
    ]);

    expect(control.controls.length).toBe(2);
  })

  it('should create a FormArray with disabled controls', () => {
    const control = createFormArray(z.array(z.string()), [
      createFormControl(z.string(), {disabled: true}),
      createFormControl(z.string(), {disabled: true}),
    ]);

    control.controls.forEach(control => {
      expect(control.disabled).toBeTruthy();
    })
  })

  it('should create a nested FormArray', () => {
    const control = createFormArray(z.array(z.array(z.string())));

    control.controls.forEach(control => {
      expect(control).toBeInstanceOf(FormArray);
    })
  })

  it('should create a nested FormArray with default values', () => {
    const control = createFormArray(z.array(z.array(z.string())), [
      createFormArray(z.array(z.string()), [createFormControl(z.string(), {value: 'John'})]),
      createFormArray(z.array(z.string()), [createFormControl(z.string(), {value: 'Doe'})]),
    ]);

    expect(control.value).toEqual([['John'], ['Doe']]);
  })

  it('should create a nested FormArray with disabled controls', () => {
    const control = createFormArray(z.array(z.array(z.string())), [
      createFormArray(z.array(z.string()), [createFormControl(z.string(), {disabled: true})]),
      createFormArray(z.array(z.string()), [createFormControl(z.string(), {disabled: true})]),
    ]);

    control.controls.forEach(control => {
      control.controls.forEach(control => {
        expect(control.disabled).toBeTruthy();
      })
    })
  })
})
