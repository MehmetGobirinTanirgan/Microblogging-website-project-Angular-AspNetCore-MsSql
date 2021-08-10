import { Component, Input, OnInit } from '@angular/core';
import { UserProfileCardModel } from 'src/models/UserProfileCardModel';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent implements OnInit {
  constructor() {}
  @Input() userProfileCard: UserProfileCardModel;
  ngOnInit(): void {}
}
