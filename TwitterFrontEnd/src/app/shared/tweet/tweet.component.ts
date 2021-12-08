import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LikeCreation } from 'src/app/core/models/LikeCreation';
import { ReplyModal } from 'src/app/core/models/ReplyModal';
import { TweetDisplay } from 'src/app/core/models/TweetDisplay';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataService } from 'src/app/core/services/data.service';
import { FollowService } from 'src/app/core/services/follow.service';
import { TweetService } from 'src/app/core/services/tweet.service';
import { ReplyModalComponent } from '../reply-modal/reply-modal.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  providers: [TweetService, FollowService],
})
export class TweetComponent implements OnInit {
  constructor(
    private tweetService: TweetService,
    public authService: AuthenticationService,
    public dataService: DataService,
    private followService: FollowService,
    private router: Router
  ) {
    this.dataServiceUsername = null;
  }

  username: string;
  userProfilePicPath: string;
  @Input() tweet: TweetDisplay;
  @ViewChild('replyModal') modalComponent: ReplyModalComponent;
  @ViewChild('likeBtn') likeBtn: ElementRef;
  @ViewChild('dislikeBtn') dislikeBtn: ElementRef;
  @ViewChild('heart') heart: ElementRef;
  replyModal: ReplyModal;
  dataServiceUsername: string | null;

  ngOnInit(): void {
    const userInfos = this.authService.getAuthenticatedUserInfos();
    if (userInfos != null) {
      this.tweet.tweetFlag = true;
      this.username = userInfos.username;
      this.userProfilePicPath = userInfos.profilePicPath;

      this.dataService.getFollowUsername().subscribe((username) => {
        this.dataServiceUsername = username;
      });

      this.dataService.getFollowFlag().subscribe((flag) => {
        if (this.dataServiceUsername == this.tweet.username) {
          if (flag) {
            this.tweet.followFlag = true;
          } else if (!flag) {
            this.tweet.followFlag = false;
          }
        }
      });
    } else {
      alert('Error: Tweet loading failed');
    }
  }

  openModal() {
    this.replyModal = new ReplyModal(
      this.tweet.createdDate,
      this.tweet.tweetDetail,
      this.tweet.id,
      this.tweet.tweetImageInfos,
      this.tweet.fullname,
      this.tweet.username,
      this.tweet.profilePicPath,
      this.userProfilePicPath,
      this.username
    );
    this.dataService.replyModalData = JSON.stringify(this.replyModal);
    this.modalComponent.open();
  }

  deleteTweet() {
    this.tweetService.delete(this.tweet.id).subscribe(
      (success) => {
        this.tweet.tweetFlag = false;
      },
      (error) => alert('Deletion failed')
    );
  }

  likeCheck() {
    if (this.tweet.likeFlag) {
      this.removeLike();
    } else {
      this.like();
    }
  }

  like() {
    const like = new LikeCreation(this.tweet.id, this.username);
    this.tweetService.addLike(like).subscribe(
      (data) => {
        this.tweet.likeCounter++;
        this.tweet.likeFlag = true;
      },
      (error) => alert('Like failed')
    );
  }

  removeLike() {
    this.tweetService.removeLike(this.tweet.id, this.username).subscribe(
      (data) => {
        this.tweet.likeCounter--;
        this.tweet.likeFlag = false;
      },
      (error) => alert('Dislike failed')
    );
  }

  follow() {
    this.followService.follow(this.tweet.username, this.username).subscribe(
      (success) => {
        this.dataService.setFollowUsername(this.tweet.username);
        this.dataService.setFollowFlag(true);
      },
      (error) => {
        alert('Follow failed');
      }
    );
  }

  unfollow() {
    this.followService.unfollow(this.tweet.username, this.username).subscribe(
      (success) => {
        this.dataService.setFollowUsername(this.tweet.username);
        this.dataService.setFollowFlag(false);
      },
      (error) => {
        alert('Unfollow failed');
      }
    );
  }

  tweetReplyStream() {
    this.router.navigate([`${this.tweet.username}/status/${this.tweet.id}`]);
  }
}
