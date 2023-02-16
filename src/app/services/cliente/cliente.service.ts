import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@models/Cliente/Cliente';
import { ClienteCuentaRequest } from '@models/Cliente/ClienteCuentaRequest';
import { ClienteCuentaResponse } from '@models/Cliente/ClienteCuentaResponse';
import { ClienteRequest } from '@models/Cliente/ClienteRequest';
import { ClienteResponse } from '@models/Cliente/ClienteResponse';
import { ClienteVentaRequest } from '@models/Cliente/ClienteVentaRequest';
import { ClienteVentaResponse } from '@models/Cliente/ClienteVentaResponse';
import { ResponseBase } from '@models/ResponseBase';

import { environment } from '@env/environment';
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
