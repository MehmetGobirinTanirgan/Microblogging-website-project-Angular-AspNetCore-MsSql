import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpRequestInterceptor } from './core/interceptors/HttpRequestInterceptor';
import { ValidatorService } from './core/services/validator.service';
import { AuthenticationService } from './core/services/authentication.service';
import { UserRouteGuard } from './core/guards/user-route-guard';
import { DataService } from './core/services/data.service';

@NgModule({
  declarations: [AppComponent, FrontPageComponent, LoginComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    MainLayoutModule,
    NgCircleProgressModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    ValidatorService,
    AuthenticationService,
    UserRouteGuard,
    DataService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
