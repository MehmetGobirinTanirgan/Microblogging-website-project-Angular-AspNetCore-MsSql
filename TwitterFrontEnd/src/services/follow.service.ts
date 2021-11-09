import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FollowListDTO } from 'src/dtos/FollowListDTO';
import { FollowCreationDTO } from 'src/dtos/FollowCreationDTO';

@Injectable()
export class FollowService {
  constructor(private httpClient: HttpClient) {}

  follow(foreignUsername: string, username: string) {
    return this.httpClient.post('Follow/Follow', new FollowCreationDTO(username, foreignUsername));
  }

  unfollow(foreignUsername: string, username: string) {
    return this.httpClient.delete('Follow/Unfollow/' + username + '/' + foreignUsername);
  }

  getFollowList(username: string) {
    return this.httpClient.get<FollowListDTO>('Follow/GetAllFollowersFollowings/' + username);
  }
}
