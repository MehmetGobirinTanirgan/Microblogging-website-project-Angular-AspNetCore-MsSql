import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoDTO } from 'src/dtos/UserInfoDTO';
import { UserProfileCardDTO } from 'src/dtos/UserProfileCardDTO';
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
  @Input() userProfileCard: UserProfileCardDTO;
  @ViewChild('editModal') modalComponent: ProfileEditModalComponent;
  authenticatedUsername: string;
  dataServiceUsername: string | null = null;
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
    const updatedUserProfileCard: UserProfileCardDTO =
      JSON.parse(updatedProfileStr);
    this.userProfileCard = updatedUserProfileCard;
    const updatedUserInfo: UserInfoDTO = {
      profilePicPath: updatedUserProfileCard.profilePicPath,
      username: updatedUserProfileCard.username,
      fullname: updatedUserProfileCard.fullname,
      token: this.authService.getAuthenticationToken()!,
    };
    this.authService.saveUserInfos(updatedUserInfo);
  }
}
