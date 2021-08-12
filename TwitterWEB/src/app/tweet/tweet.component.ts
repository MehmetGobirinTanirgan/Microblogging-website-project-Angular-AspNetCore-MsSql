import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
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
  providers: [TweetService, FollowService],
})
export class TweetComponent implements OnInit {
  constructor(
    private tweetService: TweetService,
    private authService: AuthenticationService,
    private dataService: DataService,
    private followService: FollowService,
    private router: Router,
    private renderer:Renderer2
  ) {}
  userID: string;
  userProfilePicPath: string;
  @Input() tweet: TweetModel;
  @ViewChild('replyModal') private modalComponent: ReplyModalComponent;
  @ViewChild('likeBtn') private likeBtn: ElementRef;
  @ViewChild('dislikeBtn') private dislikeBtn: ElementRef;
  @ViewChild('heart') private heart: ElementRef;
  likeBtnFlag:boolean;
  replyModalModel: ReplyModalModel = new ReplyModalModel();
  ngOnInit(): void {
    const data = this.authService.getUserData();
    this.userID = data.id;
    this.userProfilePicPath = data.profilePicPath;
  }

  openModal() {
    this.replyModalModel.MainTweetCreatedDate = this.tweet.createdDate;
    this.replyModalModel.MainTweetDetail = this.tweet.tweetDetail;
    this.replyModalModel.MainTweetID = this.tweet.id;
    this.replyModalModel.MainTweetImagePaths = [];
    for (let i = 0; i < this.tweet.tweetImageInfos.length; i++) {
      this.replyModalModel.MainTweetImagePaths.push(
        this.tweet.tweetImageInfos[i].imagePath
      );
    }
    this.replyModalModel.MainTweetUserFullname = this.tweet.fullname;
    this.replyModalModel.MainTweetUserUsername = this.tweet.username;
    this.replyModalModel.ReplyTweetUserProfilePicPath =
      this.tweet.profilePicPath;
    this.replyModalModel.MainTweetUserProfilePicPath = this.userProfilePicPath;
    this.replyModalModel.UserID = this.userID;
    this.dataService.replyModaldata = JSON.stringify(this.replyModalModel);
    this.modalComponent.open();
  }

  deleteTweet() {
    this.tweetService.delete(this.tweet.id).subscribe(
      (data) => {},
      (error) => alert('Deletion failed')
    );
  }

  likeCheck(){
    if(this.tweet.likeFlag){
      this.removeLike();
    }else{
      this.like();
    }
  }

  like() {
    const like = new LikeModel();
    like.TweetID = this.tweet.id;
    like.UserID = this.userID;
    this.tweetService.addLike(like).subscribe(
      (data) => {
        let el = this.likeBtn.nativeElement;
        this.renderer.setStyle(el,'color', '#E44878');
        this.tweet.likeCounter++;
        this.tweet.likeFlag=true;
        this.renderer.removeClass(this.heart.nativeElement,"far");
        this.renderer.addClass(this.heart.nativeElement,"fas");
        this.renderer.setProperty(el,'(click)','removelike()');
      },
      (error) => alert('Like failed')
    );
  }

  removeLike() {
    this.tweetService.removeLike(this.tweet.id, this.userID).subscribe(
      (data) => {
        let el = this.dislikeBtn.nativeElement;
        this.renderer.setStyle(el,'color', '#909EAB');
        this.tweet.likeCounter--;
        this.tweet.likeFlag=false;
        this.renderer.removeClass(this.heart.nativeElement,"fas");
        this.renderer.addClass(this.heart.nativeElement,"far");
        this.renderer.setProperty(el,'(click)','like()');
      },
      (error) => alert('Dislike failed')
    );
  }

  follow() {
    this.followService.follow(this.tweet.userID, this.userID).subscribe(
      (success) => {
        alert('Success');
      },
      (error) => {
        alert('Error');
      }
    );
  }

  unfollow() {
    this.followService.unfollow(this.tweet.userID, this.userID).subscribe(
      (success) => {
        alert('Success');
      },
      (error) => {
        alert('Error');
      }
    );
  }

  tweetReplyStream() {
    this.tweetService.getTweetReplyStream(this.tweet.id, this.userID).subscribe(
      (data) => {
        this.dataService.tweetReplyStream = data;
        this.tweetService.setTweetID(this.tweet.id);
        this.router.navigate([`${data[0].userID}/status/${this.tweet.id}`]);
      },
      (error) => {
        alert('Error: Cant load tweet reply stream');
      }
    );
  }
}
