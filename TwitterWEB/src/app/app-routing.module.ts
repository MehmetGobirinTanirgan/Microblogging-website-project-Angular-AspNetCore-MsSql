import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from 'src/services/route-guard.service';
import { FollowListComponent } from './follow-list/follow-list.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { TweetReplyStreamComponent } from './tweet-reply-stream/tweet-reply-stream.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: MainLayoutComponent,
    canActivate: [RouteGuardService],
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path:':id', // => it's gonna be username
    component: MainLayoutComponent,
    canActivate:[RouteGuardService],
    children:[{path:'',component:ProfileComponent}]
  },
  {
    path:':id', // => username/
    component: MainLayoutComponent,
    canActivate:[RouteGuardService],
    children:[{path:':section',component:FollowListComponent}]
  },
  {
    path:':ownerID', // => username/
    component: MainLayoutComponent,
    canActivate:[RouteGuardService],
    children:[{path:'status/:tweetID',component:TweetReplyStreamComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
