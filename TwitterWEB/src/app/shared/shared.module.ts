import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetComponent } from './tweet/tweet.component';
import { ReplyModalComponent } from './reply-modal/reply-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [TweetComponent,ReplyModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  exports:[TweetComponent,ReplyModalComponent]
})
export class SharedModule { }
