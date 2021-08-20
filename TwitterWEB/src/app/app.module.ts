import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpRequestInterceptor } from 'src/interceptors/HttpRequestInterceptor';
import { CustomValidatorService } from 'src/services/customValidator.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { FrontPageComponent } from './front-page/front-page.component';
import { RouteGuardService } from 'src/services/route-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/services/data.service';
import { SharedModule } from './shared/shared.module';
import { MainLayoutModule } from './main-layout/main-layout.module';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    SharedModule,
    MainLayoutModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    CustomValidatorService,
    AuthenticationService,
    RouteGuardService,
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
