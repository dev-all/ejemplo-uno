import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Familia } from 'src/app/models/Familia/Familia';
import { RequestBase } from 'src/app/models/RequestBase';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

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
