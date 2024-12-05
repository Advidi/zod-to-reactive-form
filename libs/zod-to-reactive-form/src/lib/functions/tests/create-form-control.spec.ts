import {createFormControl} from '../create-form-control';
import {z} from 'zod';

describe('createFormControl', () => {
  it('should create a disabled control', () => {
    const control = createFormControl(z.string(), {disabled: true});

    expect(control.disabled).toBeTruthy();
  })

  it('should create a string control with default value', () => {
    const control = createFormControl(z.string(), {value: '123'});

    expect(control.value).toEqual('123');
  })

  it('should create a number control with default value', () => {
    const control = createFormControl(z.number(), {value: 123});

    expect(control.value).toEqual(123);
  })

  it('should create an optional control', () => {
    const control = createFormControl(z.number().optional(), {value: null});

    expect(control.value).toBeNull();
  })

  it('should create a nullable control', () => {
    const control = createFormControl(z.number().nullable(), {value: null});

    expect(control.value).toBeNull();
  })
});
