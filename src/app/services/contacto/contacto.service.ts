import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacto } from '@models/Contacto/Contacto';
import { ContactoRequest } from '@models/Contacto/ContactoRequest';
import { ResponseBase } from '@models/ResponseBase';

import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  constructor(private http: HttpClient) {}

  obtenerContacto(request: ContactoRequest) {
    return this.http.post<ResponseBase<Contacto[]>>(
      `${environment.apiUrl}/v1/contacto/obtener`,
      request
    );
  }
}
