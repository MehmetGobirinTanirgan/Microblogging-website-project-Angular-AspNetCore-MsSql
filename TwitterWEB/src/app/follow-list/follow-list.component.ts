import { Component, OnInit } from '@angular/core';
import { FollowListModel } from 'src/models/FollowListModel';
import { DataService } from 'src/services/data.service';
import { FollowService } from 'src/services/follow.service';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css'],
  providers: [FollowService],
})
export class FollowListComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private followService: FollowService
  ) {}
  followList: FollowListModel;
  displayFlag: boolean;
  ngOnInit(): void {
    this.followList = this.dataService.followList;
    if (this.followList == null) {
      this.refreshData();
    }
    this.displayFlag = this.followService.getDisplayFlag();
  }

  refreshData() {
    this.followService.getFollowList(this.followService.getUserID()).subscribe(
      (data) => {
        this.followList = data;
      },
      (error) => {
        alert("Can't load follow list");
      }
    );
  }
  showFollowers() {
    this.displayFlag = false;
    this.followService.setDisplayFlag(false);
  }

  showFollowings() {
    this.displayFlag = true;
    this.followService.setDisplayFlag(true);
  }
}
