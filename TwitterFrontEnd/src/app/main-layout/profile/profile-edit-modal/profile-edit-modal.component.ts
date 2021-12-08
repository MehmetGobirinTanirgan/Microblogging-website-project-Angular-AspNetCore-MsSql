import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileCard } from 'src/app/core/models/UserProfileCard';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataService } from 'src/app/core/services/data.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-edit-modal',
  templateUrl: './profile-edit-modal.component.html',
  styleUrls: ['./profile-edit-modal.component.css'],
  providers: [UserService],
})
@Injectable()
export class ProfileEditModalComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService,
    private authService: AuthenticationService,
    private dataService: DataService
  ) {
    this.sendUpdatedUserData = new EventEmitter<string>();
  }

  @Input() userProfileCard: UserProfileCard;
  @Output() sendUpdatedUserData: EventEmitter<string>;
  profileEditForm: FormGroup;
  @ViewChild('editModal') modalContent: TemplateRef<ProfileEditModalComponent>;
  modalRef: NgbModalRef;
  profilePic: File;
  bgImage: File;

  ngOnInit(): void {
    this.createEditForm();
  }

  createEditForm() {
    this.profileEditForm = this.formBuilder.group({
      fullname: [this.userProfileCard.fullname, [Validators.required, Validators.maxLength(50)]],
      personalInfo: [this.userProfileCard.personalInfo, Validators.maxLength(160)],
      location: [this.userProfileCard.location, Validators.maxLength(100)],
      personalWebSiteURL: [this.userProfileCard.personalWebSiteURL, Validators.maxLength(500)],
      profilePic: [],
      bgImage: [],
    });
  }

  open() {
    this.modalRef = this.modalService.open(this.modalContent);
  }

  addProfilePic(pic: FileList) {
    if (pic != null) {
      this.profilePic = pic[0];
    }
  }

  addBgImage(img: FileList) {
    if (img != null) {
      this.bgImage = img[0];
    }
  }

  editProfile() {
    const username = this.authService.getAuthenticatedUserInfos()?.username;
    if (username) {
      if (this.profileEditForm.valid) {
        this.dataService.setLoadingFlag(true);
        const updatedProfile = Object.assign({}, this.profileEditForm.value);
        const formdata = new FormData();
        formdata.append('Username', username);
        formdata.append('Fullname', updatedProfile.fullname);
        formdata.append('PersonalInfo', updatedProfile.personalInfo);
        formdata.append('Location', updatedProfile.location);
        formdata.append('PersonalWebSiteURL', updatedProfile.personalWebSiteURL);
        formdata.append('ProfilePic', this.profilePic);
        formdata.append('BackgroundImage', this.bgImage);
        this.userService.updateProfile(formdata).subscribe(
          (data) => {
            this.dataService.setLoadingFlag(false);
            this.modalRef.close();
            this.sendUpdatedUserData.emit(JSON.stringify(data));
          },
          (error) => alert('Profile update failed')
        );
      }
    } else {
      alert('Local storage error');
    }
  }
}
