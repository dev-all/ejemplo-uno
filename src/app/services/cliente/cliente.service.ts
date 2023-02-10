import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente/Cliente';
import { ClienteCuentaRequest } from 'src/app/models/Cliente/ClienteCuentaRequest';
import { ClienteCuentaResponse } from 'src/app/models/Cliente/ClienteCuentaResponse';
import { ClienteRequest } from 'src/app/models/Cliente/ClienteRequest';
import { ClienteResponse } from 'src/app/models/Cliente/ClienteResponse';
import { ClienteVentaRequest } from 'src/app/models/Cliente/ClienteVentaRequest';
import { ClienteVentaResponse } from 'src/app/models/Cliente/ClienteVentaResponse';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  getByFiltros(request: ClienteRequest) {
    return this.http.post<ClienteResponse>(
      `${environment.apiUrl}/v1/cliente/getByFiltros`,
      request
    );
  }
  obtenerClienteVenta(request: ClienteVentaRequest) {
    return this.http.post<ResponseBase<ClienteVentaResponse[]>>(
      `${environment.apiUrl}/v1/cliente/getClienteVenta`,
      request
    );
  }

  obtenerClienteCuenta(request: ClienteCuentaRequest) {
    return this.http.post<ResponseBase<ClienteCuentaResponse>>(
      `${environment.apiUrl}/v1/cliente/getClienteCuenta`,
      request
    );
  }
}
