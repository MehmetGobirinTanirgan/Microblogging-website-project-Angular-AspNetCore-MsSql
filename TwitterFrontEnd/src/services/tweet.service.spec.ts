/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockTweetDisplay } from 'src/testObjects/MockTweetDisplay';
import { TweetService } from './tweet.service';

describe('Service: Tweet', () => {
  let service: TweetService;
  let mockHttp: HttpTestingController;
  let username = 'mockUsername';
  let formData: FormData = new FormData();
  formData.append('mock1', '1');
  formData.append('mock2', '2');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TweetService],
    });
    service = TestBed.inject(TweetService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  describe('HTTP Tests', () => {
    let mockTweet: MockTweetDisplay;

    beforeEach(() => {
      mockTweet = new MockTweetDisplay();
    });

    it('#addNewTweet should post and return expected data', () => {
      service.addNewTweet(formData).subscribe((res) => {
        expect(res).toBe(mockTweet);
      });

      const req = mockHttp.expectOne({
        url: 'Tweet/AddTweet',
      });

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(formData);
      req.flush(mockTweet);
    });

    it('#getAllTweets should return expected data', () => {
      const tweets = [mockTweet];
      service.getAllRelationalTweets(username).subscribe((res) => {
        expect(res).toBe(tweets);
      });

      const req = mockHttp.expectOne({
        url: `Tweet/GetAllRelationalTweets/${username}`,
      });

      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toEqual(null);
      req.flush(tweets);
    });

    it('#delete should delete tweet and return OK', () => {
      service.delete(username).subscribe((res) => {
        expect(res).toEqual('');
      });

      const req = mockHttp.expectOne({
        url: `Tweet/DeleteTweet/${username}`,
      });

      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toEqual(null);
      req.flush('');
    });

    it('#addLike should post like and return OK', () => {
      const like = {
        username: 'mockUsername',
        tweetID: 'mockTweetID',
      };
      service.addLike(like).subscribe((res) => {
        expect(res).toEqual('');
      });

      const req = mockHttp.expectOne({
        url: 'Tweet/AddLike',
      });

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(like);
      req.flush('');
    });

    it('#removeLike should remove like and return OK', () => {
      let username = 'mockUsername';
      let tweetID = 'mockTweetID';
      service.removeLike(tweetID, username).subscribe((res) => {
        expect(res).toEqual('');
      });

      const req = mockHttp.expectOne({
        url: `Tweet/RemoveLike/${tweetID}/${username}`,
      });

      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toEqual(null);
      req.flush('');
    });

    it('#addReplyTweet should post and return expected data', () => {
      service.addReplyTweet(formData).subscribe((res) => {
        expect(res).toBe(mockTweet);
      });

      const req = mockHttp.expectOne({
        url: 'Tweet/AddReplyTweet',
      });

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(formData);
      req.flush(mockTweet);
    });

    it('#getTweetReplyStream should return expected data', () => {
      let userID = 'mockUserID';
      let tweetID = 'mockTweetID';
      const tweets = [mockTweet];
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
  });
});
