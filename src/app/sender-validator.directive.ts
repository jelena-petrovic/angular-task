import {Directive} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[senderValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SenderValidatorDirective,
      multi: true
    }
  ]
})

export class SenderValidatorDirective implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = this.senderValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  senderValidator(): ValidatorFn {
    return (c: FormControl) => {
      let onlyNumbers = /^\+?[0-9]+$/.test(c.value);
      if (onlyNumbers) {
        let enoughNumbers = /^\+?[0-9]{12,}$/.test(c.value);
        if (!enoughNumbers) {
          return {
            senderValidator: {
              valid: false
            }
          };
        }
      }
      return null;
    };
  }
}

