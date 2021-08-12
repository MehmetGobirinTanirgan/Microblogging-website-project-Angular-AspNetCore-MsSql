import { Component, OnInit } from '@angular/core';
import { TweetModel } from 'src/models/TweetModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { TweetService } from 'src/services/tweet.service';

@Component({
  selector: 'app-tweet-reply-stream',
  templateUrl: './tweet-reply-stream.component.html',
  styleUrls: ['./tweet-reply-stream.component.css'],
  providers:[TweetService]
})
export class TweetReplyStreamComponent implements OnInit {

  constructor(private dataService:DataService,private tweetService:TweetService,private authService:AuthenticationService) { }
  tweetReplyStream:TweetModel[] = [];

  ngOnInit(): void {
    this.tweetReplyStream = this.dataService.tweetReplyStream;
    if(this.tweetReplyStream == null){
      this.refreshPage();
    }
  }

  refreshPage(){
    this.tweetService.getTweetReplyStream(this.tweetService.getTweetID(), this.authService.getUserData().id).subscribe(
      (data) => {
        this.tweetReplyStream = data;
      },
      (error) => {
        alert('Error: Cant load tweet reply stream');
      }
    );
  }
}
