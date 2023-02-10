import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GrupoModel } from 'src/app/models/Grupo/GrupoModel';
import { RequestBase } from 'src/app/models/RequestBase';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

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
