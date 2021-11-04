import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LikeCreationDTO } from 'src/dtos/LikeCreationDTO';
import { ReplyModalModel } from 'src/models/ReplyModalModel';
import { TweetDisplayDTO } from 'src/dtos/TweetDisplayDTO';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { FollowService } from 'src/services/follow.service';
import { TweetService } from 'src/services/tweet.service';
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
  ) {}

  username: string;
  userProfilePicPath: string;
  @Input() tweet: TweetDisplayDTO;
  @ViewChild('replyModal') modalComponent: ReplyModalComponent;
  @ViewChild('likeBtn') likeBtn: ElementRef;
  @ViewChild('dislikeBtn') dislikeBtn: ElementRef;
  @ViewChild('heart') heart: ElementRef;
  replyModalModel: ReplyModalModel;
  dataServiceUsername: string | null = null;

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
    this.replyModalModel = new ReplyModalModel(
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
    this.dataService.replyModalData = JSON.stringify(this.replyModalModel);
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
    const like = new LikeCreationDTO(this.tweet.id, this.username);
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
