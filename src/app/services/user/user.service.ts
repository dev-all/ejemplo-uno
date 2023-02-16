import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccesoReponse } from '@models/Acceso/AccesoReponse';
import { Inicial } from '@models/Inicial/Inicial';
import { LoginResponse } from '@models/Login/LoginResponse';
import { Usuario } from '@models/Usuario';
import { LocalService } from '../secure/local.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<Usuario>;

  constructor(private localService: LocalService) {
    const cache = localService.getJsonValue('user');

    const userCache = cache ? JSON.parse(cache) : null;

    this.userSubject = new BehaviorSubject<Usuario>(userCache);
  }

  getUserValue(): Usuario {
    return this.userSubject.value;
  }

  getAllUserAccess() {
    return this.userSubject.value.accesos;
  }

  getUserAccess(nombreAcceso: string) {
    return this.userSubject.value.accesos.find(
      (x) => x.Nombre.toUpperCase() === nombreAcceso.toUpperCase()
    );
  }

  getUserToken() {
    return this.userSubject.value?.token;
  }

  setUserValue(
    loginResponse: LoginResponse,
    accesoReponse: AccesoReponse,
    inicialResponse: Inicial
  ): void {
    var user = new Usuario({
      Id: loginResponse.idVendedor,
      token: loginResponse.access_token,
      accesos: accesoReponse.Accesos,
      idCasilla: loginResponse.idCasilla,
      nombre: loginResponse.nombre,
      deposito: loginResponse.deposito,
      bonificacionMax: loginResponse.bonificacionMax,
      prefiScan: inicialResponse.PrefiScan,
    });

    this.localService.setJsonValue('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  removeUserValue(): void {
    this.localService.clearToken();
    this.userSubject.next(null);
  }
}
