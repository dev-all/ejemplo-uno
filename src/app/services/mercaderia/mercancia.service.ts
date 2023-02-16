import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercaderia } from '@models/Mercaderia/Mercaderia';
import { MercaderiaRequest } from '@models/Mercaderia/MercaderiaRequest';
import { ResponseBase } from '@models/ResponseBase';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MercaderiaService {
  constructor(private http: HttpClient) {}

  obtener(request: MercaderiaRequest) {
    return this.http.post<ResponseBase<Mercaderia[]>>(
      `${environment.apiUrl}/v1/mercaderia/obtener`,
      request
    );
  }
}
