/* tslint:disable:no-unused-variable */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TweetService } from './tweet.service';

describe('Service: Tweet', () => {
  let service: TweetService;
  let mockHttp: HttpTestingController;

  //Mock data
  let formData = new FormData();
  formData.append('mock1', '1');
  formData.append('mock2', '2');

  const tweet = {
    id: '1',
    userID: 'mockUserID',
    createdDate: new Date(2001,1,1),
    tweetDetail: 'mockTweetDetail',
    profilePicPath: 'mockProfilePicPath',
    fullname: 'mockFullname',
    username: 'mockUsername',
    replyCounter: 1,
    retweetCounter: 1,
    likeCounter: 1,
    followFlag: true,
    likeFlag: true,
    ownershipStatus: true,
    mainTweetOwnerID: null,
    mainTweetOwnerUsername: null,
    tweetImageInfos: [
      {
        id: '1',
        imagePath: 'mockImagePath',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TweetService],
    });
    service = TestBed.inject(TweetService);
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

  it('#addNewTweet should post and return expected data', () => {
    service.addNewTweet(formData).subscribe((res) => {
      expect(res).toBe(tweet);
    });

    const req = mockHttp.expectOne({
      url: 'Tweet/AddNewTweet',
    });

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(formData);
    req.flush(tweet);
  });

  it('#getAllTweets should return expected data', () => {
    let id = '1';
    const tweets = [tweet];
    service.getAllTweets(id).subscribe((res) => {
      expect(res).toBe(tweets);
    });

    const req = mockHttp.expectOne({
      url: `Tweet/GetAllRelationalTweets/${id}`,
    });

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(tweets);
  });

  it('#delete should delete tweet and return OK', () => {
    let id = '1';
    service.delete(id).subscribe((res) => {
      expect(res.body).toEqual('');
      expect(res.status).toBe(200);
      expect(res.ok).toBeTrue();
      expect(res.statusText).toBe('OK');
    });

    const req = mockHttp.expectOne({
      url: `Tweet/DeleteTweet/${id}`,
    });

    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toEqual(null);
    req.flush('');
  });

  it('#addLike should post like and return OK', () => {
    const like = {
      UserID: 'mockUserID',
      TweetID: 'mockTweetID',
    };
    service.addLike(like).subscribe((res) => {
      expect(res.body).toEqual('');
      expect(res.status).toBe(200);
      expect(res.ok).toBeTrue();
      expect(res.statusText).toBe('OK');
    });

    const req = mockHttp.expectOne({
      url: 'Tweet/AddLike',
    });

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(like);
    req.flush('');
  });

  it('#removeLike should remove like and return OK', () => {
    let userID = 'mockUserID';
    let tweetID = 'mockTweetID';
    service.removeLike(tweetID, userID).subscribe((res) => {
      expect(res.body).toEqual('');
      expect(res.status).toBe(200);
      expect(res.ok).toBeTrue();
      expect(res.statusText).toBe('OK');
    });

    const req = mockHttp.expectOne({
      url: `Tweet/RemoveLike/${tweetID}/${userID}`,
    });

    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toEqual(null);
    req.flush('');
  });

  it('#addReplyTweet should post and return expected data', () => {
    service.addReplyTweet(formData).subscribe((res) => {
      expect(res).toBe(tweet);
    });

    const req = mockHttp.expectOne({
      url: 'Tweet/AddReplyTweet',
    });

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(formData);
    req.flush(tweet);
  });

  it('#getTweetReplyStream should return expected data', () => {
    let userID = 'mockUserID';
    let tweetID = 'mockTweetID';
    const tweets = [tweet];
    service.getTweetReplyStream(tweetID, userID).subscribe((res) => {
      expect(res).toBe(tweets);
    });

    const req = mockHttp.expectOne({
      url: `Tweet/GetTweetWithReplyTweets/${tweetID}/${userID}`,
    });

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(tweets);
  });

  it('#setTweetID should save tweet id into local storage', () => {
    let id = '1';
    service.setTweetID(id);
    expect(localStorage.getItem('tweetID')).toEqual(id);
  });

  it('#getTweetID should return tweet id from local storage', () => {
    let id = '1';
    service.setTweetID(id);
    expect(service.getTweetID()).toEqual(id);
  });

  it('#getTweetID should return null if there is not tweet id in local storage', () => {
    expect(service.getTweetID()).toEqual(null);
  });
});
