import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LikeModel } from 'src/models/LikeModel';
import { TweetModel } from 'src/models/TweetModel';

@Injectable()
export class TweetService {
  constructor(private httpClient: HttpClient) {}

  HttpOptions: Object = {
    headers: new Headers({
      Accept: 'text/html',
      'Content-Type': 'multipart/form-data',
    }),
  };

  addNewTweet(newTweet: FormData) {
    return this.httpClient.post<TweetModel>(
      'Tweet/AddNewTweet',
      newTweet,
      this.HttpOptions
    );
  }

  getAllTweets(id: string) {
    return this.httpClient.get<TweetModel[]>(
      'Tweet/GetAllRelationalTweets/' + id
    );
  }

  delete(id: string) {
    return this.httpClient.delete('Tweet/DeleteTweet/' + id, {
      observe: 'response',
    });
  }

  addLike(like: LikeModel) {
    return this.httpClient.post('Tweet/AddLike', like, {
      observe: 'response',
    });
  }

  removeLike(tweetID: string, userID: string) {
    return this.httpClient.delete(
      'Tweet/RemoveLike/' + tweetID + '/' + userID,
      {
        observe: 'response',
      }
    );
  }

  addReplyTweet(ReplyTweet: FormData) {
    return this.httpClient.post<TweetModel>(
      'Tweet/AddReplyTweet',
      ReplyTweet,
      this.HttpOptions
    );
  }

  getTweetReplyStream(tweetID: string, userID: string) {
    return this.httpClient.get<TweetModel[]>(
      'Tweet/GetTweetWithReplyTweets/' + tweetID + '/' + userID
    );
  }

  setTweetID(id: string) {
    localStorage.setItem('tweetID', id.toString());
  }

  getTweetID(): string | null {
    const tweetID = localStorage.getItem('tweetID');
    if (tweetID == null) {
      return null;
    }
    return tweetID;
  }
}
