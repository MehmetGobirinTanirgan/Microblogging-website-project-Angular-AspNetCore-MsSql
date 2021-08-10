import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from 'src/services/route-guard.service';
import { FrontPageComponent } from './front-page/front-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ProfileComponent } from './profile/profile.component';

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
    path:':id',
    component: MainLayoutComponent,
    canActivate:[RouteGuardService],
    children:[{path:'',component:ProfileComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
