import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from '@models/Marca/Marca';
import { RequestBase } from '@models/RequestBase';
import { ResponseBase } from '@models/ResponseBase';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  constructor(private http: HttpClient) {}

  obtener(request: RequestBase) {
    return this.http.post<ResponseBase<Marca[]>>(
      `${environment.apiUrl}/v1/marca/obtener`,
      request
    );
  }
}
