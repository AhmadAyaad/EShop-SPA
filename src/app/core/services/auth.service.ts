import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURl = `${environment.baseAPIURL}account`;
  private userId: any;
  jwtHelper = new JwtHelperService();
  constructor(private httpClient: HttpClient) {
  }
  public get userToken() {
    return localStorage.getItem("token");
  }
  public get userName() {
    return localStorage.getItem("userName");
  }
  public get isAdmin(): boolean {
    let roles: any = localStorage.getItem('roles');
    if (roles) {
      roles = JSON.parse(roles);
      if (roles instanceof Array)
        return roles?.some(role => role === "Admin");
    }
    return false;
  }
  public get UserId() {
    return this.userId;
  }
  login(userData: User) {
    return this.httpClient.post(`${this.apiURl}/login`, userData).pipe(
      map((res: any) => {
        localStorage.setItem('uid', this.jwtHelper.decodeToken(res.token).uid);
        localStorage.setItem('userName', res.userName);
        localStorage.setItem('token', res.token);
        localStorage.setItem('roles', JSON.stringify(res.roles));
      })
    );
  }
  isLoggedIn() {
    const token: any = localStorage.getItem('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('roles');
  }
}
