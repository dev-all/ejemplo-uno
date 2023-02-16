import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GrupoModel } from '@models/Grupo/GrupoModel';
import { RequestBase } from '@models/RequestBase';
import { ResponseBase } from '@models/ResponseBase';

import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class ArbolService {
  constructor(private http: HttpClient) {}

  obtener(request: RequestBase) {
   return this.http.post<ResponseBase<GrupoModel[]>>(
      `${environment.apiUrl}/v1/arbol/obtener`,
      request
    );
  }
}
