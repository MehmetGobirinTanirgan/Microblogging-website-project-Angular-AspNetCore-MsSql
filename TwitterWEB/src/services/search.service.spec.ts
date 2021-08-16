/* tslint:disable:no-unused-variable */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('Service: Search', () => {
  let service: SearchService;
  let mockHttp: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });
    service = TestBed.inject(SearchService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('#getSearchResults should return expected data', () => {
    const searchText = 'mockText';
    const mockResults = [
      {
        id: '1',
        username: 'mockUsername',
        fullname: 'mockFullname',
        profilePicPath: 'mockProfilePicPath',
      },
    ];
    service.getSearchResults(searchText).subscribe((res) => {
      expect(res).toBe(mockResults);
    });

    const req = mockHttp.expectOne({
      url: `Search/SearchUsers/${searchText}`,
    });
    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(mockResults);
  });
});
