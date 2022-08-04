import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let userData = {
      userName: this.authService.userName,
      token: this.authService.userToken,
    };
    if (userData && userData.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
    }
    return next.handle(request);
  }
}