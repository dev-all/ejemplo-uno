import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { SeleccionProducto } from 'src/app/models/SeleccionProducto/SeleccionProducto';
import { SeleccionProductoRequest } from 'src/app/models/SeleccionProducto/SeleccionProductoRequest';
import { environment } from 'src/environments/environment';

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
