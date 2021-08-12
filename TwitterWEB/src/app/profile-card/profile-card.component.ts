import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserProfileCardModel } from 'src/models/UserProfileCardModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { FollowService } from 'src/services/follow.service';
import { ProfileEditModalComponent } from '../profile-edit-modal/profile-edit-modal.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
  providers: [FollowService],
})
export class ProfileCardComponent implements OnInit {
  constructor(
    private followService: FollowService,
    private AuthService: AuthenticationService
  ) {}
  @Input() userProfileCard: UserProfileCardModel;
  @ViewChild('editModal') private modalComponent: ProfileEditModalComponent;
  ngOnInit(): void {}
  openModal() {
    this.modalComponent.open();
  }

  follow() {
    this.followService
      .follow(this.userProfileCard.id, this.AuthService.getUserData().id)
      .subscribe(
        (success) => {
          alert('Success');
        },
        (error) => {
          alert('Error');
        }
      );
  }

  unfollow() {
    this.followService
      .unfollow(this.userProfileCard.id, this.AuthService.getUserData().id)
      .subscribe(
        (success) => {
          alert('Success');
        },
        (error) => {
          alert('Error');
        }
      );
  }
}
