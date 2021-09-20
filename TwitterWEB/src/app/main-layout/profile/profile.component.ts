import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TweetModel } from 'src/models/TweetModel';
import { UserProfileCardModel } from 'src/models/UserProfileCardModel';
import { UserProfileModel } from 'src/models/UserProfileModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  userID: string | null = null;
  upcomingUserID: string | null = null;
  userProfile: UserProfileModel = new UserProfileModel();
  userProfileCard: UserProfileCardModel = new UserProfileCardModel();
  ownTweets: TweetModel[];
  nonReplyOwnTweets: TweetModel[];
  mediaTypeTweets: TweetModel[];
  likedTweets: TweetModel[];
  displaySection: string = '';
  mainUrl: string;

  ngOnInit(): void {
    const id = this.authService.getUserData()?.id;
    if (id != undefined) {
      this.userID = id;
    }

    this.activatedRoute.parent?.params.subscribe(
      (params) => (this.upcomingUserID = params['id'])
    );
    this.mainUrl = this.router.url;

    this.activatedRoute.params.subscribe((params) => {
      this.displaySection = params['tweet_section'];
      if (this.displaySection == undefined) {
        this.displaySection = '';
      }
    });

    if (this.userID !== null) {
      if (this.upcomingUserID !== null) {
        if (this.userID === this.upcomingUserID) {
          this.getUserProfile(this.userID);
        } else {
          this.getForeignUserProfile(this.userID, this.upcomingUserID);
        }
      } else {
        alert('Routing URL error');
      }
    } else {
      alert('Local storage error');
    }
  }

  getUserProfile(userID: string) {
    this.userService.getUserProfile(userID).subscribe(
      (data) => {
        (this.userProfileCard = data.userProfileCard),
          (this.ownTweets = data.ownTweets),
          (this.nonReplyOwnTweets = data.nonReplyOwnTweets),
          (this.mediaTypeTweets = data.mediaTypeTweets),
          (this.likedTweets = data.likedTweets);
      },
      (error) => alert('Profile loading failed')
    );
  }

  getForeignUserProfile(userID: string, foreignUserID: string) {
    this.userService.getForeignUserProfile(userID, foreignUserID).subscribe(
      (data) => {
        (this.userProfileCard = data.userProfileCard),
          (this.ownTweets = data.ownTweets),
          (this.nonReplyOwnTweets = data.nonReplyOwnTweets),
          (this.mediaTypeTweets = data.mediaTypeTweets),
          (this.likedTweets = data.likedTweets);
      },
      (error) => alert('Profile loading failed')
    );
  }

  show1() {
    this.displaySection = '';
    if (this.mainUrl.lastIndexOf('/')) {
      this.location.replaceState(
        this.mainUrl.substring(0, this.mainUrl.lastIndexOf('/'))
      );
    } else {
      this.location.replaceState(this.mainUrl);
    }
  }

  show2() {
    this.displaySection = 'with_replies';
    if (this.mainUrl.lastIndexOf('/')) {
      this.location.replaceState(
        this.mainUrl.substring(0, this.mainUrl.lastIndexOf('/')) +
          `/${this.displaySection}`
      );
    } else {
      this.location.replaceState(this.mainUrl + `/${this.displaySection}`);
    }
  }

  show3() {
    this.displaySection = 'media';
    if (this.mainUrl.lastIndexOf('/')) {
      this.location.replaceState(
        this.mainUrl.substring(0, this.mainUrl.lastIndexOf('/')) +
          `/${this.displaySection}`
      );
    } else {
      this.location.replaceState(this.mainUrl + `/${this.displaySection}`);
    }
  }

  show4() {
    this.displaySection = 'likes';
    if (this.mainUrl.lastIndexOf('/')) {
      this.location.replaceState(
        this.mainUrl.substring(0, this.mainUrl.lastIndexOf('/')) +
          `/${this.displaySection}`
      );
    } else {
      this.location.replaceState(this.mainUrl + `/${this.displaySection}`);
    }
  }
}
