/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { TweetService } from './tweet.service';

describe('Service: Tweet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TweetService,
        { provide: 'baseAddress', useValue: 'mockURL' },
      ],
    });
  });

  it('should ...', inject([TweetService], (service: TweetService) => {
    expect(service).toBeTruthy();
  }));
});
