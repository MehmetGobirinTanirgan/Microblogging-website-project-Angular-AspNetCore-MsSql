import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { TweetEditorComponent } from './tweet-editor/tweet-editor.component';
import { HttpRequestInterceptor } from 'src/interceptors/HttpRequestInterceptor';
import { CustomValidatorService } from 'src/services/customValidator.service';
import { ModalService } from 'src/services/modal.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { FrontPageComponent } from './front-page/front-page.component';
import { RouteGuardService } from 'src/services/route-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TweetComponent } from './tweet/tweet.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditModalComponent } from './profile-edit-modal/profile-edit-modal.component';
import { ReplyModalComponent } from './reply-modal/reply-modal.component';
import { DataService } from 'src/services/data.service';
import { FollowListComponent } from './follow-list/follow-list.component';
import { TweetReplyStreamComponent } from './tweet-reply-stream/tweet-reply-stream.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    LoginComponent,
    MainLayoutComponent,
    NavComponent,
    LogoutComponent,
    HomeComponent,
    TweetEditorComponent,
    SearchBarComponent,
    TweetComponent,
    ProfileCardComponent,
    ProfileComponent,
    ProfileEditModalComponent,
    ReplyModalComponent,
    FollowListComponent,
    TweetReplyStreamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    CustomValidatorService,
    ModalService,
    AuthenticationService,
    RouteGuardService,
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
