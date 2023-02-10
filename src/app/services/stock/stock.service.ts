import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockReponse } from 'src/app/models/Stock/StockInicialReponse';
import { StockRequest } from 'src/app/models/Stock/StockRequest';
import { Stock } from 'src/app/models/Stock/StockInicial';
import { StockActualRequest } from 'src/app/models/Stock/StockActualRequest';
import { ResponseBase } from 'src/app/models/ResponseBase';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}

  getStock(request: StockRequest): Observable<StockReponse> {
    return this.http.post<StockReponse>(
      `${environment.apiUrl}/v1/stock/getByCpInterno`,
      request
    );
  }

  insertStockInicial(request: Stock) {
    return this.http.post(
      `${environment.apiUrl}/v1/stock/insertStockInicial`,
      request
    );
  }

  getStockActual(request: StockActualRequest) {
    return this.http.post<ResponseBase<number>>(
      `${environment.apiUrl}/v1/stock/obtenerStockActual`,
      request
    );
  }
}
