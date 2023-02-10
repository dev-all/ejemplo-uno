import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { Variante } from 'src/app/models/Variante/Variante';
import { VarianteRequest } from 'src/app/models/Variante/VarianteRequest';
import { VarianteResponse } from 'src/app/models/Variante/VarianteResponse';
import { environment } from 'src/environments/environment';

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
