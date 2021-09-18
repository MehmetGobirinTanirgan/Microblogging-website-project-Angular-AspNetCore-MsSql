import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FollowListModel } from 'src/models/FollowListModel';
import { TweetModel } from 'src/models/TweetModel';

@Injectable()
export class DataService {
  constructor() {}
  replyModalData: string;
  tweetReplyStream:TweetModel[] | null;
  followUserID:BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  followFlag:BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  newReplyTweet:BehaviorSubject<TweetModel | null> = new BehaviorSubject<TweetModel | null>(null);

  getFollowFlag():Observable<boolean | null>{
    return this.followFlag.asObservable();
  }

  setFollowFlag(flag:boolean | null): void{
    this.followFlag.next(flag);
  }

  getFollowUserID():Observable<string | null>{
    return this.followUserID.asObservable();
  }

  setFollowUserID(userID:string | null): void{
    this.followUserID.next(userID);
  }

  getNewReplyTweet():Observable<TweetModel | null>{
    return this.newReplyTweet.asObservable();
  }

  setNewReplyTweet(newReplyTweet:TweetModel):void{
    this.newReplyTweet.next(newReplyTweet);
  }
}
