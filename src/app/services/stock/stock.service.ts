import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { StockReponse } from '@models/Stock/StockInicialReponse';
import { StockRequest } from '@models/Stock/StockRequest';
import { Stock } from '@models/Stock/StockInicial';
import { StockActualRequest } from '@models/Stock/StockActualRequest';
import { ResponseBase } from '@models/ResponseBase';

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
