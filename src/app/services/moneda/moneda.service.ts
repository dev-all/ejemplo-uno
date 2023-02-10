import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Moneda } from 'src/app/models/Moneda/Moneda';
import { RequestBase } from 'src/app/models/RequestBase';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

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
