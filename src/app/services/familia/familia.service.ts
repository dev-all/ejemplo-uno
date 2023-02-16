import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Familia } from '@models/Familia/Familia';
import { RequestBase } from '@models/RequestBase';
import { ResponseBase } from '@models/ResponseBase';

import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class FamiliaService {
  constructor(private http: HttpClient) {}

  obtener(request: RequestBase) {
    return this.http.post<ResponseBase<Familia[]>>(
      `${environment.apiUrl}/v1/familia/obtener`,
      request
    );
  }
}
