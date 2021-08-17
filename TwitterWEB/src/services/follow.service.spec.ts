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
  let mockData: MockData;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FollowService],
    });
    service = TestBed.inject(FollowService);
    mockHttp = TestBed.inject(HttpTestingController);

    mockData = new MockData();
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  describe('HTTP Tests', () => {

    it('#follow should post and return OK', () => {
      service.follow(mockData.id1, mockData.id2).subscribe((res) => {
        expect(res.body).toEqual('');
        expect(res.ok).toBeTrue();
        expect(res.status).toEqual(200);
        expect(res.statusText).toEqual('OK');
      });

      const req = mockHttp.expectOne({
        url: 'Follow/Follow',
      });

      const mockFollowModel = mockData.mockFollowModel;
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockFollowModel);
      req.flush('');
    });

    it('#unfollow should remove follow and return OK', () => {
      service.unfollow(mockData.id1, mockData.id2).subscribe((res) => {
        expect(res.body).toEqual('');
        expect(res.statusText).toEqual('OK');
        expect(res.ok).toBeTrue();
        expect(res.status).toEqual(200);
      });

      const req = mockHttp.expectOne({
        url: `Follow/Unfollow/${mockData.id2}/${mockData.id1}`,
      });
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toEqual(null);
      req.flush('');
    });

    it('#getFollowList should return expected data', () => {
      const mockFollowList = mockData.mockFollowList;
      service.getFollowList(mockData.id1).subscribe((res) => {
        expect(res).toBe(mockFollowList);
      });

      const req = mockHttp.expectOne({
        url: `Follow/GetAllFollowersFollowings/${mockData.id1}`,
      });

      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toEqual(null);
      req.flush(mockFollowList);
    });
  });

  describe('LocalStorage Tests', () => {
    let mockLocalStorage: MockLocalStorage;

    beforeEach(() => {
      mockLocalStorage = new MockLocalStorage();
    });

    it('#setDisplayFlag should set flag into localStorage', () => {
      mockLocalStorage.addMockLocalStorage();
      service.setDisplayFlag(mockData.flag);
      let flagFromStorage = JSON.parse(localStorage.getItem('displayFlag')!);
      expect(flagFromStorage).toEqual(mockData.flag);
    });

    it('#getDisplayFlag should get flag from localStorage', () => {
      mockLocalStorage.addMockLocalStorage();
      service.setDisplayFlag(mockData.flag);
      let flagFromStorage = service.getDisplayFlag();
      expect(flagFromStorage).toEqual(mockData.flag);
    });

    it('#setUserID should set user`s id into localStorage', () => {
      mockLocalStorage.addMockLocalStorage();
      service.setUserID(mockData.id1);
      let idFromStorage = localStorage.getItem('userID');
      expect(idFromStorage).toEqual(mockData.id1);
    });

    it('#getUserID should get user`s id from localStorage', () => {
      mockLocalStorage.addMockLocalStorage();
      service.setUserID(mockData.id1);
      let idFromStorage = service.getUserID();
      expect(idFromStorage).toEqual(mockData.id1);
    });
  });
});

class MockData {
  id1: string = 'mock1';
  id2: string = 'mock2';
  flag: boolean = true;

  mockFollowList = {
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

  mockFollowModel = {
    followerUserID: this.id2,
    followingUserID: this.id1,
  };
}

class MockLocalStorage {
  store: Record<string, string> = {};

  addMockLocalStorage() {
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (this.store[key] = <string>value);
      }
    );

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): string | null => {
        return this.store[key] || null;
      }
    );
  }
}
