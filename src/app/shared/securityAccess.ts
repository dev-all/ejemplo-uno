import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityAccess {
  constructor(private userServive: UserService) {}

  validateAccess(accessName: string) {
    var userAccess = this.userServive.getUserAccess(accessName);

    if (!userAccess) {
      return false;
    }

    if (userAccess.Permiso === 0) {
      return false;
    }

    return true;
  }
}
