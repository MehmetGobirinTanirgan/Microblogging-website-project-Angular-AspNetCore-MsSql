import { Component, Input, OnInit } from '@angular/core';
import { TweetModel } from 'src/models/TweetModel';
import { TweetService } from 'src/services/tweet.service';

@Component({
  selector: 'app-tweet-stream',
  templateUrl: './tweet-stream.component.html',
  styleUrls: ['./tweet-stream.component.css'],
  providers: [TweetService],
})
export class TweetStreamComponent implements OnInit {
  constructor() {}
  @Input() tweets: TweetModel[];
  ngOnInit(): void {}
}
