import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CorreoRequest } from '@models/Correo/CorreoRequest';

import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class CorreoService {
  constructor(private http: HttpClient) {}

  enviar(request: CorreoRequest) {
    return this.http.post(`${environment.apiUrl}/v1/correo/enviar`, request);
  }
}
