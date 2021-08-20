import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileEditModalComponent } from './profile-edit-modal/profile-edit-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileComponent,ProfileCardComponent,ProfileEditModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [ProfileComponent,ProfileCardComponent,ProfileEditModalComponent]
})
export class ProfileModule { }
