import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UserService) {}

  public getToken(): string {
    return this.userService.getUserToken();
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.userService.getUserToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }
}
