import { Injectable } from '@angular/core';
import { FollowListModel } from 'src/models/FollowListModel';

@Injectable()
export class DataService {
  constructor() {}
  replyModaldata: string;
  followList: FollowListModel;
}
