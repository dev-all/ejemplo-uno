import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacto } from 'src/app/models/Contacto/Contacto';
import { ContactoRequest } from 'src/app/models/Contacto/ContactoRequest';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

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
