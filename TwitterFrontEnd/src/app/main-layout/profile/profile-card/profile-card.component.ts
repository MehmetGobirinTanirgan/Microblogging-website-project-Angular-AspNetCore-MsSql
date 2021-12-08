import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/core/models/UserInfo';
import { UserProfileCard } from 'src/app/core/models/UserProfileCard';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataService } from 'src/app/core/services/data.service';
import { FollowService } from 'src/app/core/services/follow.service';
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
  ) {
    this.dataServiceUsername = null;
  }

  @Input() userProfileCard: UserProfileCard;
  @ViewChild('editModal') modalComponent: ProfileEditModalComponent;
  authenticatedUsername: string;
  dataServiceUsername: string | null;

  ngOnInit(): void {
    const authenticatedUsername = this.authService.getAuthenticatedUserInfos()?.username;
    if (authenticatedUsername != null) {
      this.authenticatedUsername = authenticatedUsername;
      this.dataService.getFollowUsername().subscribe((username) => {
        this.dataServiceUsername = username;
      });

      this.dataService.getFollowFlag().subscribe((flag) => {
        if (this.dataServiceUsername === this.userProfileCard.username) {
          if (flag) {
            this.userProfileCard.followFlag = true;
            this.userProfileCard.followerCounter++;
          } else if (!flag) {
            this.userProfileCard.followFlag = false;
            this.userProfileCard.followerCounter--;
          }
        }
      });
    } else {
      alert('Local storage error');
    }
  }

  openModal() {
    this.modalComponent.open();
  }

  follow() {
    this.followService.follow(this.userProfileCard.username, this.authenticatedUsername).subscribe(
      (success) => {
        this.dataService.setFollowUsername(this.userProfileCard.username);
        this.dataService.setFollowFlag(true);
      },
      (error) => {
        alert('Following failed');
      }
    );
  }

  unfollow() {
    this.followService.unfollow(this.userProfileCard.username, this.authenticatedUsername).subscribe(
      (success) => {
        this.dataService.setFollowUsername(this.userProfileCard.username);
        this.dataService.setFollowFlag(false);
      },
      (error) => {
        alert('Unfollowing failed');
      }
    );
  }

  followList(flag: boolean) {
    if (flag) {
      this.router.navigate([`${this.userProfileCard.username}/follow/following`]);
    } else if (!flag) {
      this.router.navigate([`${this.userProfileCard.username}/follow/followers`]);
    }
  }

  updateProfile(updatedProfileStr: string) {
    const updatedUserProfileCard: UserProfileCard = JSON.parse(updatedProfileStr);
    this.userProfileCard = updatedUserProfileCard;
    const updatedUserInfo: UserInfo = {
      profilePicPath: updatedUserProfileCard.profilePicPath,
      username: updatedUserProfileCard.username,
      fullname: updatedUserProfileCard.fullname,
      token: this.authService.getAuthenticatedUserInfos()!.token,
    };
    this.authService.saveUserInfos(updatedUserInfo);
  }
}
