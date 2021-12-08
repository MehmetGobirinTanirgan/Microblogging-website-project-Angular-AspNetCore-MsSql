import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowListComponent } from './main-layout/follow-list/follow-list.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HomeComponent } from './main-layout/home/home.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ProfileComponent } from './main-layout/profile/profile.component';
import { TweetReplyStreamComponent } from './main-layout/tweet-reply-stream/tweet-reply-stream.component';
import { UserRouteGuard } from './core/guards/user-route-guard';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: MainLayoutComponent,
    canActivate: [UserRouteGuard],
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: ':username',
    component: MainLayoutComponent,
    canActivate: [UserRouteGuard],
    children: [
      { path: '', component: ProfileComponent, pathMatch: 'full' },
      {
        path: ':tweet_section',
        component: ProfileComponent,
      },
      {
        path: 'follow/:follow_section',
        component: FollowListComponent,
      },
      {
        path: 'status/:tweetID',
        component: TweetReplyStreamComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
