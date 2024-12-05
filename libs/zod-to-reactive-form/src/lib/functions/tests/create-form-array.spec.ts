import {createFormArray} from '../create-form-array';
import {z} from 'zod';
import {FormArray} from '@angular/forms';

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
    const control = createFormArray(z.array(z.string()), {value: ['John', 'Doe']});

    expect(control.value).toEqual(['John', 'Doe']);
  })

  it('should create nested controls if values are provided', () => {
    const control = createFormArray(z.array(z.string()), {value: ['John', 'Doe']});

    expect(control.controls.length).toBe(2);
  })

  it('should create a FormArray with disabled controls', () => {
    const control = createFormArray(z.array(z.string()), {disabled: [true, true]});

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
    const control = createFormArray(z.array(z.array(z.string())), {value: [['John'], ['Doe']]});

    expect(control.value).toEqual([['John'], ['Doe']]);
  })

  it('should create a nested FormArray with disabled controls', () => {
    const control = createFormArray(z.array(z.array(z.string())), {disabled: [[true], [true]]});

    control.controls.forEach(control => {
      control.controls.forEach(control => {
        expect(control.disabled).toBeTruthy();
      })
    })
  })
})
