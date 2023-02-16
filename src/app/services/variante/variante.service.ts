import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBase } from '@models/ResponseBase';
import { Variante } from '@models/Variante/Variante';
import { VarianteRequest } from '@models/Variante/VarianteRequest';
import { VarianteResponse } from '@models/Variante/VarianteResponse';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class VarianteService {
  constructor(private http: HttpClient) {}

  getByCpInterno(request: VarianteRequest) {
    return this.http.post<ResponseBase<Variante[]>>(
      `${environment.apiUrl}/v1/variante/getByCpInterno`,
      request
    );
  }
}
