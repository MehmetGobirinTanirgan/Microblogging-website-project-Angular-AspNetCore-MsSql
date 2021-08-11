import { Component, Input, OnInit } from '@angular/core';
import { LikeModel } from 'src/models/LikeModel';
import { TweetModel } from 'src/models/TweetModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { TweetService } from 'src/services/tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  providers: [TweetService],
})
export class TweetComponent implements OnInit {
  constructor(
    private tweetService: TweetService,
    private authService: AuthenticationService
  ) {}
  userID: string;
  @Input() tweet: TweetModel;
  ngOnInit(): void {
    this.userID = this.authService.getUserData().id;
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
}
