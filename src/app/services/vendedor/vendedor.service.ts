import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestBase } from 'src/app/models/RequestBase';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { Vendedor } from 'src/app/models/Vendedor/Vendedor';
import { environment } from 'src/environments/environment';

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
