import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CorreoRequest } from 'src/app/models/Correo/CorreoRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CorreoService {
  constructor(private http: HttpClient) {}

  enviar(request: CorreoRequest) {
    return this.http.post(`${environment.apiUrl}/v1/correo/enviar`, request);
  }
}
