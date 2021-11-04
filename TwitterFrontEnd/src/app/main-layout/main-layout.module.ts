import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavModule } from './nav/nav.module';
import { MainLayoutComponent } from './main-layout.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TweetReplyStreamComponent } from './tweet-reply-stream/tweet-reply-stream.component';
import { HomeModule } from './home/home.module';
import { FollowListComponent } from './follow-list/follow-list.component';
import { ProfileModule } from './profile/profile.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [MainLayoutComponent,SearchBarComponent,TweetReplyStreamComponent,FollowListComponent],
  imports: [
    NavModule,
    HomeModule,
    ProfileModule,
    SharedModule,
    NgbModule
  ],
})
export class MainLayoutModule { }
