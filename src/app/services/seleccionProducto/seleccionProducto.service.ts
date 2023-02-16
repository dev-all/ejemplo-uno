import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseBase } from '@models/ResponseBase';
import { SeleccionProducto } from '@models/SeleccionProducto/SeleccionProducto';
import { SeleccionProductoRequest } from '@models/SeleccionProducto/SeleccionProductoRequest';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SeleccionProductoService {
  constructor(private http: HttpClient) {}

  obtener(request: SeleccionProductoRequest) {
    return this.http.post<ResponseBase<SeleccionProducto[]>>(
      `${environment.apiUrl}/v1/seleccionProducto/obtener`,
      request
    );
  }
}
