import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from '@models/Registro/Registro';
import { RegistroRequest } from '@models/Registro/RegistroRequest';
import { ResponseBase } from '@models/ResponseBase';
import { environment } from '@env/environment';

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
