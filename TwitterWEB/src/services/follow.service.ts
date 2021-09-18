import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FollowListModel } from 'src/models/FollowListModel';
import { FollowModel } from 'src/models/FollowModel';

@Injectable()
export class FollowService {
  constructor(private httpClient: HttpClient) {}

  follow(foreignUserID: string, userID: string) {
    let followModel = new FollowModel();
    followModel = {
      followerUserID: userID,
      followingUserID: foreignUserID,
    };
    return this.httpClient.post('Follow/Follow', followModel, {
      observe: 'response',
    });
  }

  unfollow(foreignUserID: string, userID: string) {
    return this.httpClient.delete(
      'Follow/Unfollow/' + userID + '/' + foreignUserID,
      { observe: 'response' }
    );
  }

  getFollowList(userID: string) {
    return this.httpClient.get<FollowListModel>(
      'Follow/GetAllFollowersFollowings/' + userID
    );
  }
}
