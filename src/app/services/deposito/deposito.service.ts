import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepositoRequest } from 'src/app/models/Deposito/DepositoRequest';
import { DepositoResponse } from 'src/app/models/Deposito/DepositoResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepositoService {
  constructor(private http: HttpClient) {}

  obtenerDepositos(request: DepositoRequest): Observable<DepositoResponse> {
    return this.http.post<DepositoResponse>(
      `${environment.apiUrl}/v1/deposito/obtenerDepositos`,
      request
    );
  }
}
