import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetModel } from 'src/models/TweetModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { TweetService } from 'src/services/tweet.service';

@Component({
  selector: 'app-tweet-reply-stream',
  templateUrl: './tweet-reply-stream.component.html',
  styleUrls: ['./tweet-reply-stream.component.css'],
  providers: [TweetService],
})
export class TweetReplyStreamComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private tweetService: TweetService,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {}
  tweetReplyStream: TweetModel[] | null = null;
  tweetID: string;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.tweetID = params['tweetID'];
    });
    this.getTweetReplyStream();
  }

  getTweetReplyStream() {
    const userID = this.authService.getUserData()?.id;
    if (userID != null && this.tweetID != null) {
      this.tweetService.getTweetReplyStream(this.tweetID, userID).subscribe(
        (data) => {
          this.tweetReplyStream = data;
        },
        (error) => {
          alert('Error: Cant load tweet reply stream');
        }
      );
    } else {
      alert('Local storage error');
    }
  }
}
