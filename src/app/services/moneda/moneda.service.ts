import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Moneda } from '@models/Moneda/Moneda';
import { RequestBase } from '@models/RequestBase';
import { ResponseBase } from '@models/ResponseBase';

import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  constructor(private http: HttpClient) {}

  obtener(request: RequestBase) {
    return this.http.post<ResponseBase<Moneda[]>>(
      `${environment.apiUrl}/v1/moneda/obtener`,
      request
    );
  }
}
