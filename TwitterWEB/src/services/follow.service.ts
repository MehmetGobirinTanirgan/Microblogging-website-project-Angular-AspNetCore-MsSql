import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FollowListModel } from 'src/models/FollowListModel';
import { FollowModel } from 'src/models/FollowModel';

@Injectable()
export class FollowService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseAddress') private baseAddress: string
  ) {}

  follow(foreignUserID: string, userID: string) {
    const followModel = new FollowModel();
    followModel.followerUserID = userID;
    followModel.followingUserID = foreignUserID;
    return this.httpClient.post(
      this.baseAddress + 'api/Follow/Follow',
      followModel
    );
  }

  unfollow(foreignUserID: string, userID: string) {
    return this.httpClient.delete(
      this.baseAddress + 'api/Follow/Unfollow/' + userID + '/' + foreignUserID
    );
  }

  getFollowList(userID: string) {
    return this.httpClient.get<FollowListModel>(
      this.baseAddress + 'api/Follow/GetAllFollowersFollowings/' + userID
    );
  }

  setDisplayFlag(flag:boolean){
    localStorage.setItem('displayFlag',flag.toString())
  }

  getDisplayFlag():boolean{
    return JSON.parse(localStorage.getItem('displayFlag')!);
  }

  setUserID(id:string){
    localStorage.setItem('userID',id);
  }
  getUserID():string{
    return localStorage.getItem('userID')!;
  }
}
