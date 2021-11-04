import { Component, OnInit } from '@angular/core';
import { FollowListDTO } from 'src/dtos/FollowListDTO';
import { FollowService } from 'src/services/follow.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css'],
  providers: [FollowService],
})
export class FollowListComponent implements OnInit {
  constructor(
    private followService: FollowService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  followList: FollowListDTO | null = null;
  displaySection: string | null = null;
  incomingUsername: string;
  mainUrl: string;

  ngOnInit(): void {
    this.mainUrl = this.router.url;
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.incomingUsername = params['username'];
    });

    this.activatedRoute.params.subscribe((params) => {
      this.displaySection = params['follow_section'];
    });

    this.getFollowList();
  }

  getFollowList() {
    this.followService.getFollowList(this.incomingUsername).subscribe(
      (data) => {
        this.followList = data;
      },
      (error) => {
        alert('Cant load follow list');
      }
    );
  }

  showFollowers() {
    this.displaySection = 'followers';
    this.location.replaceState(this.router.url.substring(0, this.mainUrl.lastIndexOf('/')) + `/${this.displaySection}`);
  }

  showFollowings() {
    this.displaySection = 'following';
    this.location.replaceState(this.router.url.substring(0, this.mainUrl.lastIndexOf('/')) + `/${this.displaySection}`);
  }
}
