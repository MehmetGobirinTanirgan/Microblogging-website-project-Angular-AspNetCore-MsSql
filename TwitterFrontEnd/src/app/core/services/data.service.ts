import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TweetDisplay } from '../models/TweetDisplay';

@Injectable()
export class DataService {
  constructor() {}
  replyModalData: string;
  private followUsername: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private followFlag: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  private newReplyTweet: BehaviorSubject<TweetDisplay | null> = new BehaviorSubject<TweetDisplay | null>(null);
  private loadingFlag: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  getFollowFlag(): Observable<boolean | null> {
    return this.followFlag.asObservable();
  }

  setFollowFlag(flag: boolean | null): void {
    this.followFlag.next(flag);
  }

  getFollowUsername(): Observable<string | null> {
    return this.followUsername.asObservable();
  }

  setFollowUsername(username: string | null): void {
    this.followUsername.next(username);
  }

  getNewReplyTweet(): Observable<TweetDisplay | null> {
    return this.newReplyTweet.asObservable();
  }

  setNewReplyTweet(newReplyTweet: TweetDisplay): void {
    this.newReplyTweet.next(newReplyTweet);
  }

  setLoadingFlag(flag: boolean) {
    this.loadingFlag.next(flag);
  }

  getLoadingFlag(): Observable<boolean | null> {
    return this.loadingFlag.asObservable();
  }
}
