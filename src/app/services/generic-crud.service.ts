import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestBase } from '../models/RequestBase';
import { ResponseBase } from '../models/ResponseBase';

@Injectable({
  providedIn: 'root',
})
export class GenericCrudService<T> {
  constructor(private http: HttpClient) {}

  obtener(request: RequestBase, endPointName: string) {
    return this.http.post<ResponseBase<T[]>>(
      `${environment.apiUrl}/${endPointName}/obtener`,
      request
    );
  }
}
