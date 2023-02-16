import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccesoReponse } from '@models/Acceso/AccesoReponse';
import { AccesoRequest } from '@models/Acceso/AccesoRequest';
import { environment } from '@env/environment';
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
