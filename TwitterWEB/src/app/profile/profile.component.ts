import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TweetModel } from 'src/models/TweetModel';
import { UserProfileCardModel } from 'src/models/UserProfileCardModel';
import { UserProfileModel } from 'src/models/UserProfileModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';

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
    private router: Router
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
  toggle1: boolean = true;
  toggle2: boolean = false;
  toggle3: boolean = false;
  toggle4: boolean = false;
  ngOnInit(): void {
    const id = this.authService.getUserData()?.id;
    if (id != undefined) {
      this.userID = id;
    }

    this.activatedRoute.params.subscribe(
      (params) => (this.upcomingUserID = params['id'])
    );

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
    this.toggle1 = true;
    this.toggle2 = false;
    this.toggle3 = false;
    this.toggle4 = false;
  }

  show2() {
    this.toggle1 = false;
    this.toggle2 = true;
    this.toggle3 = false;
    this.toggle4 = false;
  }

  show3() {
    this.toggle1 = false;
    this.toggle2 = false;
    this.toggle3 = true;
    this.toggle4 = false;
  }

  show4() {
    this.toggle1 = false;
    this.toggle2 = false;
    this.toggle3 = false;
    this.toggle4 = true;
  }
}
