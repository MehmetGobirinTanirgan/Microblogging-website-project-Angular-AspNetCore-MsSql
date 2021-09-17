import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { UserProfileCardModel } from 'src/models/UserProfileCardModel';
import { UserStoreModel } from 'src/models/UserStoreModel';
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
  dataServiceUserID: string | null = null;
  ngOnInit(): void {
    const id = this.authService.getUserData()?.id;
    if (id != null) {
      this.userID = id;
      this.dataService.getFollowUserID().subscribe((id) => {
        this.dataServiceUserID = id;
      });

      this.dataService.getFollowFlag().subscribe((flag) => {
        if (this.dataServiceUserID === this.userProfileCard.id) {
          if (flag === true) {
            this.userProfileCard.followFlag = true;
            this.userProfileCard.followerCounter++;
          } else if (flag === false) {
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
    this.followService.follow(this.userProfileCard.id, this.userID).subscribe(
      (success) => {
        this.dataService.setFollowUserID(this.userProfileCard.id);
        this.dataService.setFollowFlag(true);
      },
      (error) => {
        alert('Following failed');
      }
    );
  }

  unfollow() {
    this.followService.unfollow(this.userProfileCard.id, this.userID).subscribe(
      (success) => {
        this.dataService.setFollowUserID(this.userProfileCard.id);
        this.dataService.setFollowFlag(false);
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

  updateProfile(updatedProfileStr: string) {
    const updatedUserProfileData: UserProfileCardModel =
      JSON.parse(updatedProfileStr);
    this.userProfileCard = updatedUserProfileData;
    const updatedUserData: UserStoreModel = {
      id: updatedUserProfileData.id,
      profilePicPath: updatedUserProfileData.profilePicPath,
      username: updatedUserProfileData.username,
      fullname: updatedUserProfileData.fullname,
      token: this.authService.getToken()!,
    };
    this.authService.saveData(updatedUserData);
  }
}
