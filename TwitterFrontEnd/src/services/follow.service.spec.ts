/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockFollowCreation } from 'src/testObjects/MockFollowCreation';
import { MockFollowList } from 'src/testObjects/MockFollowList';
import { MockUserInfo } from 'src/testObjects/MockUserInfo';
import { FollowService } from './follow.service';

describe('Service: Follow', () => {
  let service: FollowService;
  let mockHttp: HttpTestingController;
  let mockUserInfo: MockUserInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FollowService],
    });
    service = TestBed.inject(FollowService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockUserInfo = new MockUserInfo();
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  describe('HTTP Tests', () => {
    it('#follow should post and return OK', () => {
      const follow = new MockFollowCreation('mockFollowingUsername', 'mockFollowerUsername');
      service.follow(follow.followingUsername, follow.followerUsername).subscribe((res) => {
        expect(res.body).toEqual('');
        expect(res.ok).toBeTrue();
        expect(res.status).toEqual(200);
        expect(res.statusText).toEqual('OK');
      });

      const req = mockHttp.expectOne({
        url: 'Follow/Follow',
      });

      expect(req.request.method).toEqual('POST');
      expect(Object.assign({}, req.request.body)).toEqual(Object.assign({}, follow));
      req.flush('');
    });

    it('#unfollow should remove follow and return OK', () => {
      const follow = new MockFollowCreation('mockFollowerUsername', 'mockFollowingUsername');
      service.unfollow(follow.followerUsername, follow.followingUsername).subscribe((res) => {
        expect(res.body).toEqual('');
        expect(res.statusText).toEqual('OK');
        expect(res.ok).toBeTrue();
        expect(res.status).toEqual(200);
      });

      const req = mockHttp.expectOne({
        url: `Follow/Unfollow/${follow.followingUsername}/${follow.followerUsername}`,
      });
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toEqual(null);
      req.flush('');
    });

    it('#getFollowList should return expected data', () => {
      const mockFollowList = new MockFollowList();
      service.getFollowList('mock').subscribe((res) => {
        expect(res).toBe(mockFollowList);
      });

      const req = mockHttp.expectOne({
        url: `Follow/GetAllFollowersFollowings/${'mock'}`,
      });

      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toEqual(null);
      req.flush(mockFollowList);
    });
  });
});
