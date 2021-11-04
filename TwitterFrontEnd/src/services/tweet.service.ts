import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LikeCreationDTO } from 'src/dtos/LikeCreationDTO';
import { TweetDisplayDTO } from 'src/dtos/TweetDisplayDTO';

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
    return this.httpClient.post<TweetDisplayDTO>('Tweet/AddTweet', newTweet, this.HttpOptions);
  }

  getAllRelationalTweets(username: string) {
    return this.httpClient.get<TweetDisplayDTO[]>('Tweet/GetAllRelationalTweets/' + username);
  }

  delete(id: string) {
    return this.httpClient.delete('Tweet/DeleteTweet/' + id, { observe: 'response' });
  }

  addLike(like: LikeCreationDTO) {
    return this.httpClient.post('Tweet/AddLike', like, { observe: 'response' });
  }

  removeLike(tweetID: string, userID: string) {
    return this.httpClient.delete('Tweet/RemoveLike/' + tweetID + '/' + userID, { observe: 'response' });
  }

  addReplyTweet(ReplyTweet: FormData) {
    return this.httpClient.post<TweetDisplayDTO>('Tweet/AddReplyTweet', ReplyTweet, this.HttpOptions);
  }

  getTweetReplyStream(tweetID: string, username: string) {
    return this.httpClient.get<Array<TweetDisplayDTO>>('Tweet/GetTweetWithReplyTweets/' + tweetID + '/' + username);
  }
}
