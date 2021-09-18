import { Component, OnInit } from '@angular/core';
import { FollowListModel } from 'src/models/FollowListModel';
import { DataService } from 'src/services/data.service';
import { FollowService } from 'src/services/follow.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css'],
  providers: [FollowService],
})
export class FollowListComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private followService: FollowService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}
  followList: FollowListModel | null = null;
  displaySection: string | null = null;
  upcomingUserID: string;
  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.upcomingUserID = params['id'];
    });

    this.activatedRoute.params.subscribe((params) => {
      this.displaySection = params['section'];
    });

    this.refreshData();
  }

  refreshData() {
    this.followService.getFollowList(this.upcomingUserID).subscribe(
      (data) => {
        this.followList = data;
      },
      (error) => {
        alert("Can't load follow list");
      }
    );
  }

  showFollowers() {
    this.location.replaceState(
      this.router.url.substring(0, this.router.url.lastIndexOf('/')) +
        '/followers'
    );
    this.displaySection = 'followers';
  }

  showFollowings() {
    this.location.replaceState(
      this.router.url.substring(0, this.router.url.lastIndexOf('/')) +
        '/following'
    );
    this.displaySection = 'following';
  }
}
