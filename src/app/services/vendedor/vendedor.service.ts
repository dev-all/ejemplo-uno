import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestBase } from '@models/RequestBase';
import { ResponseBase } from '@models/ResponseBase';
import { Vendedor } from '@models/Vendedor/Vendedor';

import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class VendedorService {
  constructor(private http: HttpClient) {}

  obtener(request: RequestBase) {
    return this.http.post<ResponseBase<Vendedor[]>>(
      `${environment.apiUrl}/v1/vendedor/obtener`,
      request
    );
  }
}
