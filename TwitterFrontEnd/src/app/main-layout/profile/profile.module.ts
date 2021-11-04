import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileEditModalComponent } from './profile-edit-modal/profile-edit-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent, ProfileCardComponent, ProfileEditModalComponent],
  imports: [SharedModule, ReactiveFormsModule],
})
export class ProfileModule {}
