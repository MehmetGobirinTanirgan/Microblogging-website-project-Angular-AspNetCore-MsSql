/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomValidatorService } from './customValidator.service';

describe('Service: CustomValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomValidatorService]
    });
  });

  it('should ...', inject([CustomValidatorService], (service: CustomValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
