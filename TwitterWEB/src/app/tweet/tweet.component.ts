import { Component, Input, OnInit } from '@angular/core';
import { TweetModel } from 'src/models/TweetModel';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  constructor() { }
  @Input() tweet: TweetModel;
  ngOnInit(): void {
  }

}
