import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProveedorRequest } from '@models/Proveedor/ProveedorRequest';
import { ProveedorResponse } from '@models/Proveedor/ProveedorResponse';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient) {}

  obtenerProveedores(request: ProveedorRequest): Observable<ProveedorResponse> {
    return this.http.post<ProveedorResponse>(
      `${environment.apiUrl}/v1/proveedor/obtenerProveedores`,
      request
    );
  }
}
