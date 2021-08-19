import {
  Component,
  ElementRef,
  Input,
  OnInit,
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
    private renderer: Renderer2
  ) {}
  userID: string;
  userProfilePicPath: string;
  @Input() tweet: TweetModel;
  @ViewChild('replyModal') modalComponent: ReplyModalComponent;
  @ViewChild('likeBtn') likeBtn: ElementRef;
  @ViewChild('dislikeBtn') dislikeBtn: ElementRef;
  @ViewChild('heart') heart: ElementRef;
  replyModalModel: ReplyModalModel = new ReplyModalModel();
  tweetFlag: boolean = true;
  ngOnInit(): void {
    const data = this.authService.getUserData();
    if (data != null) {
      this.userID = data.id;
      this.userProfilePicPath = data.profilePicPath;
    } else {
      alert('Error: Tweet loading failed');
    }
  }

  openModal() {
    this.replyModalModel.MainTweetCreatedDate = this.tweet.createdDate;
    this.replyModalModel.MainTweetDetail = this.tweet.tweetDetail;
    this.replyModalModel.MainTweetID = this.tweet.id;
    this.replyModalModel.MainTweetImagePaths = [];
    this.tweet.tweetImageInfos.forEach((x) =>
      this.replyModalModel.MainTweetImagePaths.push(x.imagePath)
    );
    this.replyModalModel.MainTweetUserFullname = this.tweet.fullname;
    this.replyModalModel.MainTweetUserUsername = this.tweet.username;
    this.replyModalModel.ReplyTweetUserProfilePicPath =
      this.tweet.profilePicPath;
    this.replyModalModel.MainTweetUserProfilePicPath = this.userProfilePicPath;
    this.replyModalModel.UserID = this.userID;
    this.dataService.replyModalData = JSON.stringify(this.replyModalModel);
    this.modalComponent.open();
  }

  deleteTweet() {
    this.tweetService.delete(this.tweet.id).subscribe(
      (success) => {
        this.tweetFlag = false;
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
    const like = new LikeModel();
    like.TweetID = this.tweet.id;
    like.UserID = this.userID;
    this.tweetService.addLike(like).subscribe(
      (data) => {
        let el = this.likeBtn.nativeElement;
        this.renderer.setStyle(el, 'color', '#E44878');
        this.tweet.likeCounter++;
        this.tweet.likeFlag = true;
        this.renderer.removeClass(this.heart.nativeElement, 'far');
        this.renderer.addClass(this.heart.nativeElement, 'fas');
        this.renderer.setProperty(el, '(click)', 'removelike()');
      },
      (error) => alert('Like failed')
    );
  }

  removeLike() {
    this.tweetService.removeLike(this.tweet.id, this.userID).subscribe(
      (data) => {
        let el = this.dislikeBtn.nativeElement;
        this.renderer.setStyle(el, 'color', '#909EAB');
        this.tweet.likeCounter--;
        this.tweet.likeFlag = false;
        this.renderer.removeClass(this.heart.nativeElement, 'fas');
        this.renderer.addClass(this.heart.nativeElement, 'far');
        this.renderer.setProperty(el, '(click)', 'like()');
      },
      (error) => alert('Dislike failed')
    );
  }

  follow() {
    this.followService.follow(this.tweet.userID, this.userID).subscribe(
      (success) => {
        alert('Following');
      },
      (error) => {
        alert('Follow failed');
      }
    );
  }

  unfollow() {
    this.followService.unfollow(this.tweet.userID, this.userID).subscribe(
      (success) => {
        alert('Unfollowed');
      },
      (error) => {
        alert('Unfollow failed');
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
