import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileCardModel } from 'src/models/UserProfileCardModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
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
    private authService: AuthenticationService,
    private router: Router,
    private dataService: DataService
  ) {}
  @Input() userProfileCard: UserProfileCardModel;
  @ViewChild('editModal') modalComponent: ProfileEditModalComponent;
  userID: string;
  ngOnInit(): void {
    const id = this.authService.getUserData()?.id;
    if (id != null) {
      this.userID = id;
    } else {
      alert('Local storage error');
    }
  }

  openModal() {
    this.modalComponent.open();
  }

  follow() {
    this.followService.follow(this.userProfileCard.id, this.userID).subscribe(
      (success) => {
        alert('Following');
      },
      (error) => {
        alert('Following failed');
      }
    );
  }

  unfollow() {
    this.followService.unfollow(this.userProfileCard.id, this.userID).subscribe(
      (success) => {
        alert('Unfollowed');
      },
      (error) => {
        alert('Unfollowing failed');
      }
    );
  }

  followList(flag: boolean) {
    this.followService.getFollowList(this.userProfileCard.id).subscribe(
      (data) => {
        this.dataService.followList = data;
        this.followService.setDisplayFlag(flag);
        this.followService.setUserID(this.userProfileCard.id);
        if (flag) {
          this.router.navigate([`${this.userProfileCard.id}/following`]);
        } else if (!flag) {
          this.router.navigate([`${this.userProfileCard.id}/followers`]);
        }
      },
      (error) => {
        alert("Can't load follow list");
      }
    );
  }
}
