import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileCardModel } from 'src/models/UserProfileCardModel';
import { UserStoreModel } from 'src/models/UserStoreModel';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';

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
    private authService: AuthenticationService
  ) {}
  @Input() profileData: UserProfileCardModel;
  @Output() sendUpdatedUserData:EventEmitter<string> = new EventEmitter<string>();
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
      fullname: [this.profileData.fullname, [Validators.required, Validators.maxLength(50)]],
      personalInfo: [this.profileData.personalInfo, Validators.maxLength(160)],
      location: [this.profileData.location, Validators.maxLength(100)],
      personalWebSiteURL: [this.profileData.personalWebSiteURL, Validators.maxLength(500)],
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
    const userID = this.authService.getUserData()?.id;
    if (userID != undefined) {
      if (this.profileEditForm.valid) {
        const updatedProfile = Object.assign({}, this.profileEditForm.value);
        const formdata = new FormData();
        formdata.append('ID', userID);
        formdata.append('Fullname', updatedProfile.fullname);
        formdata.append('PersonalInfo', updatedProfile.personalInfo);
        formdata.append('Location', updatedProfile.location);
        formdata.append(
          'PersonalWebSiteURL',
          updatedProfile.personalWebSiteURL
        );
        formdata.append('ProfilePic', this.profilePic);
        formdata.append('BackgroundImage', this.bgImage);
        this.userService.updateProfile(formdata).subscribe(
          (data) => {
            this.modalRef.close();
            this.sendUpdatedUserData.emit(JSON.stringify(data.body));
          },
          (error) => alert('Profile update failed')
        );
      }
    } else {
      alert('Local storage error');
    }
  }
}
