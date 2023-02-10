import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoMercaderiaRequest } from 'src/app/models/Mercaderia/PedidoMercaderiaRequest';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

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
