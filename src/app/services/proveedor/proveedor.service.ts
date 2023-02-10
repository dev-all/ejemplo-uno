import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProveedorRequest } from 'src/app/models/Proveedor/ProveedorRequest';
import { ProveedorResponse } from 'src/app/models/Proveedor/ProveedorResponse';
import { environment } from 'src/environments/environment';

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
