import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercaderia } from 'src/app/models/Mercaderia/Mercaderia';
import { MercaderiaRequest } from 'src/app/models/Mercaderia/MercaderiaRequest';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

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
