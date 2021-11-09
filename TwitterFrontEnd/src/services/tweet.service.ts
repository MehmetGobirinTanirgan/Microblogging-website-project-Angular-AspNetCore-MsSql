import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LikeCreationDTO } from 'src/dtos/LikeCreationDTO';
import { TweetDisplayDTO } from 'src/dtos/TweetDisplayDTO';

@Injectable()
export class TweetService {
  constructor(private httpClient: HttpClient) {}

  addNewTweet(newTweet: FormData) {
    return this.httpClient.post<TweetDisplayDTO>('Tweet/AddTweet', newTweet);
  }

  getAllRelationalTweets(username: string) {
    return this.httpClient.get<TweetDisplayDTO[]>('Tweet/GetAllRelationalTweets/' + username);
  }

  delete(id: string) {
    return this.httpClient.delete('Tweet/DeleteTweet/' + id);
  }

  addLike(like: LikeCreationDTO) {
    return this.httpClient.post('Tweet/AddLike', like);
  }

  removeLike(tweetID: string, userID: string) {
    return this.httpClient.delete('Tweet/RemoveLike/' + tweetID + '/' + userID);
  }

  addReplyTweet(ReplyTweet: FormData) {
    return this.httpClient.post<TweetDisplayDTO>('Tweet/AddReplyTweet', ReplyTweet);
  }

  getTweetReplyStream(tweetID: string, username: string) {
    return this.httpClient.get<Array<TweetDisplayDTO>>('Tweet/GetTweetWithReplyTweets/' + tweetID + '/' + username);
  }
}
