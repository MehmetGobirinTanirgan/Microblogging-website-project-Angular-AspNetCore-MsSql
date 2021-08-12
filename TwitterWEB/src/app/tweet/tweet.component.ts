import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LikeModel } from 'src/models/LikeModel';
import { ReplyModalModel } from 'src/models/ReplyModalModel';
import { TweetModel } from 'src/models/TweetModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { FollowService } from 'src/services/follow.service';
import { TweetService } from 'src/services/tweet.service';
import { ReplyModalComponent } from '../reply-modal/reply-modal.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  providers: [TweetService,FollowService],
})
export class TweetComponent implements OnInit {
  constructor(
    private tweetService: TweetService,
    private authService: AuthenticationService,
    private dataService:DataService,
    private followService: FollowService
  ) {}
  userID: string;
  userProfilePicPath:string;
  @Input() tweet: TweetModel;
  @ViewChild('replyModal') private modalComponent: ReplyModalComponent;
  replyModalModel:ReplyModalModel = new ReplyModalModel();
  ngOnInit(): void {
    const data  = this.authService.getUserData();
    this.userID = data.id;
    this.userProfilePicPath = data.profilePicPath;
  }

  openModal() {
    this.replyModalModel.MainTweetCreatedDate = this.tweet.createdDate;
    this.replyModalModel.MainTweetDetail = this.tweet.tweetDetail;
    this.replyModalModel.MainTweetID = this.tweet.id;
    this.replyModalModel.MainTweetImagePaths = [];
    for(let i = 0; i < this.tweet.tweetImageInfos.length; i++){
      this.replyModalModel.MainTweetImagePaths.push(this.tweet.tweetImageInfos[i].imagePath)
    }
    this.replyModalModel.MainTweetUserFullname = this.tweet.fullname;
    this.replyModalModel.MainTweetUserUsername = this.tweet.username;
    this.replyModalModel.ReplyTweetUserProfilePicPath = this.tweet.profilePicPath
    this.replyModalModel.MainTweetUserProfilePicPath = this.userProfilePicPath;
    this.replyModalModel.UserID = this.userID;
    this.dataService.replyModaldata  = JSON.stringify(this.replyModalModel);
    this.modalComponent.open();
  }

  deleteTweet(){
    this.tweetService.delete(this.tweet.id).subscribe(
      (data) => console.log(data),
      (error) => alert('Deletion failed')
    );
  }

  like() {
    const like = new LikeModel();
    like.TweetID = this.tweet.id;
    like.UserID = this.userID;
    this.tweetService.addLike(like).subscribe(
      (data) => console.log(data),
      (error) => alert('Like failed')
    );
  }

  removeLike() {
    this.tweetService.removeLike(this.tweet.id, this.userID).subscribe(
      (data) => console.log(data),
      (error) => alert('Dislike failed')
    );
  }

  follow() {
    this.followService
      .follow(this.tweet.userID ,this.userID)
      .subscribe(
        (success) => {
          alert('Success');
        },
        (error) => {
          alert('Error');
        }
      );
  }

  unfollow() {
    this.followService
      .unfollow(this.tweet.userID, this.userID)
      .subscribe(
        (success) => {
          alert('Success');
        },
        (error) => {
          alert('Error');
        }
      );
  }
}
