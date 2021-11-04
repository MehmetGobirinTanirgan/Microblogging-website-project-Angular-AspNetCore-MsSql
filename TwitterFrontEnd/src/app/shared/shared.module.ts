import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetComponent } from './tweet/tweet.component';
import { ReplyModalComponent } from './reply-modal/reply-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [TweetComponent, ReplyModalComponent, LoadingComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgbModule, NgxSpinnerModule],
  exports: [TweetComponent, NgxSpinnerModule, CommonModule, RouterModule, LoadingComponent],
})
export class SharedModule {}
