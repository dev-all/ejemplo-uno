import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginResponse } from '@models/Login/LoginResponse';
import { environment } from '@env/environment';
import { LoginRequest } from '@models/Login/LoginRequest';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private userService: UserService) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', request.username)
      .set('password', request.password)
      .set('database', request.database)
      .set('esAutomatico', request.esAutomatico.toString());

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/token`,
      body.toString(),
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }

  logout() {
    this.userService.removeUserValue();
  }
}
