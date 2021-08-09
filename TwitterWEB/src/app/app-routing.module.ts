import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  { path: 'frontPage', component: FrontPageComponent },
  { path: '', redirectTo: 'frontPage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
