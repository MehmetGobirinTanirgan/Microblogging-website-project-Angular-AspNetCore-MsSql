import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class ValidatorService {
  constructor() {}

  atLeastOne(validator: ValidatorFn, controls: string[] | null = null) {
    return (group: FormGroup): ValidationErrors | null => {
      if (!controls) {
        controls = Object.keys(group.controls);
      }

      const hasAtLeastOne = group && group.controls && controls.some((k) => !validator(group.controls[k]));

      return hasAtLeastOne
        ? null
        : {
            atLeastOne: true,
          };
    };
  }
}
