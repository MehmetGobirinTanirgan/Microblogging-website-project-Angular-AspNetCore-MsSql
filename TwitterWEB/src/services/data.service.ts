import { Injectable } from '@angular/core';
import { FollowListModel } from 'src/models/FollowListModel';
import { TweetModel } from 'src/models/TweetModel';

@Injectable()
export class DataService {
  constructor() {}
  replyModaldata: string;
  followList: FollowListModel;
  tweetReplyStream:TweetModel[];
}
