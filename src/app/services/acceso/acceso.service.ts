import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccesoReponse } from 'src/app/models/Acceso/AccesoReponse';
import { AccesoRequest } from 'src/app/models/Acceso/AccesoRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  constructor(private http: HttpClient) {}

  getAccess(request: AccesoRequest) {
    return this.http.post<AccesoReponse>(
      `${environment.apiUrl}/v1/acceso/getByVendedor`,
      request
    );
  }
}
