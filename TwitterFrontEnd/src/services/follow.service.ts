import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FollowCreation } from 'src/models/FollowCreatiom';
import { FollowList } from 'src/models/FollowList';


@Injectable()
export class FollowService {
  constructor(private httpClient: HttpClient) {}

  follow(foreignUsername: string, username: string) {
    return this.httpClient.post('Follow/Follow', new FollowCreation(username, foreignUsername));
  }

  unfollow(foreignUsername: string, username: string) {
    return this.httpClient.delete('Follow/Unfollow/' + username + '/' + foreignUsername);
  }

  getFollowList(username: string) {
    return this.httpClient.get<FollowList>('Follow/GetAllFollowersFollowings/' + username);
  }
}
