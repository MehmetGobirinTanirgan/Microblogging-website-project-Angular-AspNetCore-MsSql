import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private authenticationService:AuthenticationService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken();
    if(token != null){
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authenticationService.getToken()}`,
        },
      });
    }else{
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }
    return next.handle(request);
  }
}
