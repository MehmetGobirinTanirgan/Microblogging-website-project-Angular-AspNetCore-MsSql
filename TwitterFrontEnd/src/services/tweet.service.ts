import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LikeCreation } from 'src/models/LikeCreation';
import { TweetDisplay } from 'src/models/TweetDisplay';

@Injectable()
export class TweetService {
  constructor(private httpClient: HttpClient) {}

  addNewTweet(newTweet: FormData) {
    return this.httpClient.post<TweetDisplay>('Tweet/AddTweet', newTweet);
  }

  getAllRelationalTweets(username: string) {
    return this.httpClient.get<TweetDisplay[]>('Tweet/GetAllRelationalTweets/' + username);
  }

  delete(id: string) {
    return this.httpClient.delete('Tweet/DeleteTweet/' + id);
  }

  addLike(like: LikeCreation) {
    return this.httpClient.post('Tweet/AddLike', like);
  }

  removeLike(tweetID: string, userID: string) {
    return this.httpClient.delete('Tweet/RemoveLike/' + tweetID + '/' + userID);
  }

  addReplyTweet(ReplyTweet: FormData) {
    return this.httpClient.post<TweetDisplay>('Tweet/AddReplyTweet', ReplyTweet);
  }

  getTweetReplyStream(tweetID: string, username: string) {
    return this.httpClient.get<Array<TweetDisplay>>('Tweet/GetTweetWithReplyTweets/' + tweetID + '/' + username);
  }
}
