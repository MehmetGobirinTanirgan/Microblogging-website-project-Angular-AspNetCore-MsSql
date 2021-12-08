import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetDisplay } from 'src/models/TweetDisplay';
import { AuthenticationService } from 'src/services/authentication.service';
import { TweetService } from 'src/services/tweet.service';

@Component({
  selector: 'app-tweet-reply-stream',
  templateUrl: './tweet-reply-stream.component.html',
  styleUrls: ['./tweet-reply-stream.component.css'],
  providers: [TweetService],
})
export class TweetReplyStreamComponent implements OnInit {
  constructor(private tweetService: TweetService, private authService: AuthenticationService, private activatedRoute: ActivatedRoute) {
    this.tweetReplyStream = null;
  }

  tweetReplyStream: Array<TweetDisplay> | null;
  tweetID: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.tweetID = params['tweetID'];
    });
    this.getTweetReplyStream();
  }

  getTweetReplyStream() {
    const authenticatedUsername = this.authService.getAuthenticatedUserInfos()?.username;
    if (authenticatedUsername && this.tweetID) {
      this.tweetService.getTweetReplyStream(this.tweetID, authenticatedUsername).subscribe(
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
