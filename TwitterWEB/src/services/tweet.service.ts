import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LikeModel } from 'src/models/LikeModel';
import { NewTweetModel } from 'src/models/NewTweetModel';
import { TweetModel } from 'src/models/TweetModel';

@Injectable()
export class TweetService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseAddress') private baseAddress: string
  ) {}

  addNewTweet(newTweet: FormData): Observable<TweetModel> {
    let HttpOptions: Object = {
      headers: new Headers({
        Accept: 'text/html',
        'Content-Type': 'multipart/form-data',
      }),
      responseType: 'text' as 'json',
    };
    return this.httpClient.post<TweetModel>(
      this.baseAddress + 'api/Tweet/AddNewTweet',
      newTweet,
      HttpOptions
    );
  }

  getAllTweets(id:string){
    return this.httpClient.get<TweetModel[]>(this.baseAddress + "api/Tweet/GetAllRelationalTweets/" + id);
  }

  addLike(like:LikeModel){
    return this.httpClient.post(this.baseAddress + "api/Tweet/AddLike",like);
  }

  removeLike(tweetID:string, userID:string){
    return this.httpClient.delete(this.baseAddress +"api/Tweet/RemoveLike/"+ tweetID + "/" + userID);
  }
}
