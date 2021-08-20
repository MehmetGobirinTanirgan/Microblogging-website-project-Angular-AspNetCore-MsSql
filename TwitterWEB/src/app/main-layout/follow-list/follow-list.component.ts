import { Component, OnInit } from '@angular/core';
import { FollowListModel } from 'src/models/FollowListModel';
import { DataService } from 'src/services/data.service';
import { FollowService } from 'src/services/follow.service';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css'],
  providers:[FollowService]
})
export class FollowListComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private followService: FollowService
  ) {}
  followList: FollowListModel | null = null;
  displayFlag: boolean | null = null;
  ngOnInit(): void {
    if (this.dataService.followList != null) {
      this.followList = this.dataService.followList;
    } else{
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
    this.followService.setDisplayFlag(this.displayFlag);
  }

  showFollowings() {
    this.displayFlag = true;
    this.followService.setDisplayFlag(this.displayFlag);
  }
}
