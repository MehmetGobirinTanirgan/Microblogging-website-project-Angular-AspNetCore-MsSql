import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { Location } from '@angular/common';
import { UserProfile } from 'src/models/UserProfile';
import { UserProfileCard } from 'src/models/UserProfileCard';
import { TweetDisplay } from 'src/models/TweetDisplay';

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
    this.username = null;
    this.incomingUsername = null;
    this.userProfile = new UserProfile();
    this.userProfileCard = null;
    this.displaySection = '';
  }

  username: string | null ;
  incomingUsername: string | null;
  userProfile: UserProfile;
  userProfileCard: UserProfileCard | null;
  tweetsAndReplies: Array<TweetDisplay>;
  tweets: Array<TweetDisplay>;
  media: Array<TweetDisplay>;
  likes: Array<TweetDisplay>;
  displaySection: string;
  mainUrl: string;

  ngOnInit(): void {
    const authenticatedUsername = this.authService.getAuthenticatedUserInfos()?.username;
    if (authenticatedUsername != undefined) {
      this.username = authenticatedUsername;
    }

    this.activatedRoute.parent?.params.subscribe((params) => (this.incomingUsername = params['username']));
    this.mainUrl = this.router.url;

    this.activatedRoute.params.subscribe((params) => {
      this.displaySection = params['tweet_section'];
      if (this.displaySection == undefined) {
        this.displaySection = '';
      }
    });

    if (this.username !== null) {
      if (this.incomingUsername !== null) {
        if (this.username === this.incomingUsername) {
          this.getMainUserProfile(this.username);
        } else {
          this.getForeignUserProfile(this.username, this.incomingUsername);
        }
      } else {
        alert('Routing URL error');
      }
    } else {
      alert('Local storage error');
    }
  }

  getMainUserProfile(username: string) {
    this.userService.getMainUserProfile(username).subscribe(
      (data) => {
        (this.userProfileCard = data.userProfileCard),
          (this.tweets = data.tweets),
          (this.tweetsAndReplies = data.tweetsAndReplies),
          (this.media = data.media),
          (this.likes = data.likes);
      },
      (error) => alert('Profile loading failed')
    );
  }

  getForeignUserProfile(username: string, foreignUsername: string) {
    this.userService.getForeignUserProfile(username, foreignUsername).subscribe(
      (data) => {
        (this.userProfileCard = data.userProfileCard),
          (this.tweets = data.tweets),
          (this.tweetsAndReplies = data.tweetsAndReplies),
          (this.media = data.media),
          (this.likes = data.likes);
      },
      (error) => alert('Profile loading failed')
    );
  }

  show1() {
    this.displaySection = '';
    if (this.mainUrl.lastIndexOf('/')) {
      this.location.replaceState(this.mainUrl.substring(0, this.mainUrl.lastIndexOf('/')));
    } else {
      this.location.replaceState(this.mainUrl);
    }
  }

  show2() {
    this.displaySection = 'with_replies';
    if (this.mainUrl.lastIndexOf('/')) {
      this.location.replaceState(this.mainUrl.substring(0, this.mainUrl.lastIndexOf('/')) + `/${this.displaySection}`);
    } else {
      this.location.replaceState(this.mainUrl + `/${this.displaySection}`);
    }
  }

  show3() {
    this.displaySection = 'media';
    if (this.mainUrl.lastIndexOf('/')) {
      this.location.replaceState(this.mainUrl.substring(0, this.mainUrl.lastIndexOf('/')) + `/${this.displaySection}`);
    } else {
      this.location.replaceState(this.mainUrl + `/${this.displaySection}`);
    }
  }

  show4() {
    this.displaySection = 'likes';
    if (this.mainUrl.lastIndexOf('/')) {
      this.location.replaceState(this.mainUrl.substring(0, this.mainUrl.lastIndexOf('/')) + `/${this.displaySection}`);
    } else {
      this.location.replaceState(this.mainUrl + `/${this.displaySection}`);
    }
  }
}
