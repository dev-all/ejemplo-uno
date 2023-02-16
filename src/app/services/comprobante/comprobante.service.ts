import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoMercaderiaRequest } from '@models/Mercaderia/PedidoMercaderiaRequest';
import { ResponseBase } from '@models/ResponseBase';

import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class ComprobanteService {
  constructor(private http: HttpClient) {}

  crearPedidoMercaderia(request: PedidoMercaderiaRequest) {
    return this.http.post<ResponseBase<string>>(
      `${environment.apiUrl}/v1/pedido/crearPedidoMercaderia`,
      request
    );
  }
}
