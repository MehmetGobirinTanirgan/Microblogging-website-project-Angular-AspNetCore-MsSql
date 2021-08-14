/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { FollowService } from './follow.service';

describe('Service: Follow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [FollowService, { provide: 'baseAddress', useValue: 'mockURL' }]
    });
  });

  it('should ...', inject([FollowService], (service: FollowService) => {
    expect(service).toBeTruthy();
  }));
});
