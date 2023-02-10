import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from 'src/app/models/Registro/Registro';
import { RegistroRequest } from 'src/app/models/Registro/RegistroRequest';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private http: HttpClient) {}

  createRegistro(registro: Registro) {
    return this.http.post(`${environment.apiUrl}/v1/registro/create`, registro);
  }

  getByIdMovimiento(registro: RegistroRequest) {
    return this.http.post<ResponseBase<Registro[]>>(
      `${environment.apiUrl}/v1/registro/getByIdMovimiento`,
      registro
    );
  }
}
