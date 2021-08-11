import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserProfileCardModel } from 'src/models/UserProfileCardModel';
import { ProfileEditModalComponent } from '../profile-edit-modal/profile-edit-modal.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent implements OnInit {
  constructor() {}
  @Input() userProfileCard: UserProfileCardModel;
  @ViewChild('editModal') private modalComponent: ProfileEditModalComponent;
  ngOnInit(): void {}
  openModal() {
    this.modalComponent.open();
  }
}
