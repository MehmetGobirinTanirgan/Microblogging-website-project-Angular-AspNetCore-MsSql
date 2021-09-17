import { Component, OnInit } from '@angular/core';
import { TweetModel } from 'src/models/TweetModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { TweetService } from 'src/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TweetService],
})
export class HomeComponent implements OnInit {
  constructor(
    private tweetService: TweetService,
    private authService: AuthenticationService,
    private dataService: DataService
  ) {}
  tweets: TweetModel[] = [] as TweetModel[];
  followFlag: boolean | null;
  ngOnInit(): void {
    this.getAllTweets();

    this.dataService.getFollowUserID().subscribe((id) => {
      this.tweets.forEach((tweet) => {
        if (tweet.userID == id) {
          this.getAllTweets();
        }
      });
    });

    this.dataService.getNewReplyTweet().subscribe((newReplyTweet) => {
      if (newReplyTweet != null) {
        this.tweets.unshift(newReplyTweet);
      }
    });
  }

  getAllTweets() {
    const userID = this.authService.getUserData()?.id;
    if (userID != undefined) {
      this.tweetService.getAllTweets(userID).subscribe(
        (data) => (this.tweets = data),
        (error) => alert("Error: Can't load tweets")
      );
    } else {
      alert('Local storage error');
    }
  }

  addNewTweet(tweet: any) {
    this.tweets.unshift(JSON.parse(tweet));
  }
}
