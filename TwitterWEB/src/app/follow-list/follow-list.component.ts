import { Component, OnInit } from '@angular/core';
import { FollowListModel } from 'src/models/FollowListModel';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css'],
})
export class FollowListComponent implements OnInit {
  constructor(private dataService: DataService) {}
  followList: FollowListModel;
  followerFlag: string;
  followingFlag: string;
  ngOnInit(): void {
    this.followList = JSON.parse(localStorage.getItem("followList")!);
    this.followerFlag = localStorage.getItem("followerFlag")!;
    this.followingFlag = localStorage.getItem("followingFlag")!;
  }

  showFollowers() {
    this.followerFlag = "true";
    this.followingFlag = "false";
  }

  showFollowings() {
    this.followerFlag = "false";
    this.followingFlag = "true";
  }
}
