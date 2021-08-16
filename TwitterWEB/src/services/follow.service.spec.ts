/* tslint:disable:no-unused-variable */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FollowService } from './follow.service';

describe('Service: Follow', () => {
  let service: FollowService;
  let mockHttp: HttpTestingController;

  //Mock Data
  let id1: string = 'mock1';
  let id2: string = 'mock2';
  let flag: boolean = true;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FollowService],
    });
    service = TestBed.inject(FollowService);
    mockHttp = TestBed.inject(HttpTestingController);

    var store: Record<string, string> = {};

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (store[key] = <string>value);
      }
    );

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): string | null => {
        return store[key] || null;
      }
    );
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('#follow should post and return OK', () => {
    service.follow(id1, id2).subscribe((res) => {
      expect(res.body).toEqual('');
      expect(res.ok).toBeTrue();
      expect(res.status).toEqual(200);
      expect(res.statusText).toEqual('OK');
    });

    const req = mockHttp.expectOne({
      url: 'Follow/Follow',
    });

    let followModel = {
      followerUserID: id2,
      followingUserID: id1,
    };

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(followModel);
    req.flush('');
  });

  it('#unfollow should remove follow and return OK', () => {
    service.unfollow(id1, id2).subscribe((res) => {
      expect(res.body).toEqual('');
      expect(res.statusText).toEqual('OK');
      expect(res.ok).toBeTrue();
      expect(res.status).toEqual(200);
    });

    const req = mockHttp.expectOne({
      url: `Follow/Unfollow/${id2}/${id1}`,
    });
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toEqual(null);
    req.flush('');
  });

  it('#getFollowList should return expected data', () => {
    const followList = {
      fullname: 'mockFullname',
      username: 'mockUsername',
      followers: [
        {
          id: '1',
          fullname: 'mockFullname',
          username: 'mockUsername',
          profilePicPath: 'mockProfilePicPath',
        },
      ],
      followings: [
        {
          id: '1',
          fullname: 'mockFullname',
          username: 'mockUsername',
          profilePicPath: 'mockProfilePicPath',
        },
      ],
    };

    service.getFollowList(id1).subscribe((res) => {
      expect(res).toBe(followList);
    });

    const req = mockHttp.expectOne({
      url: `Follow/GetAllFollowersFollowings/${id1}`,
    });

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(followList);
  });

  it('#setDisplayFlag should set flag into localStorage', () => {
    service.setDisplayFlag(flag);
    let flagFromStorage = JSON.parse(localStorage.getItem('displayFlag')!);
    expect(flagFromStorage).toEqual(flag);
  });

  it('#getDisplayFlag should get flag from localStorage', () => {
    service.setDisplayFlag(flag);
    let flagFromStorage = service.getDisplayFlag();
    expect(flagFromStorage).toEqual(flag);
  });

  it('#setUserID should set user`s id into localStorage', () => {
    service.setUserID(id1);
    let idFromStorage = localStorage.getItem('userID');
    expect(idFromStorage).toEqual(id1);
  });

  it('#getUserID should get user`s id from localStorage', () => {
    service.setUserID(id1);
    let idFromStorage = service.getUserID();
    expect(idFromStorage).toEqual(id1);
  });
});
