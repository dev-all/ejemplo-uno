import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearMovimientoDeposito } from '@models/MovimientoDepositos/CrearMovimientoDeposito';
import { EliminarMovimientoDeposito } from '@models/MovimientoDepositos/EliminarMovimientoDeposito';
import { ModificarMovimientoDepositoRequest } from '@models/MovimientoDepositos/ModificarMovimientoDepositoRequest';

import { MovimientoDepositoRequest } from '@models/MovimientoDepositos/MovimientoDepositoRequest';
import { MovimientoDeposito } from '@models/MovimientoDepositos/MovimientoDepositos';
import { MovimientoReport } from '@models/Movimientos/MovimientoReport';
import { MovimientoRequest } from '@models/Movimientos/MovimientoRequest';
import { ResponseBase } from '@models/ResponseBase';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  constructor(private http: HttpClient) {}

  obtenerMovimientos(request: MovimientoRequest) {
    return this.http.post<ResponseBase<MovimientoReport>>(
      `${environment.apiUrl}/v1/movimientos/obtener`,
      request
    );
  }

  getMovimientoEntreDeposito(request: MovimientoDepositoRequest) {
    return this.http.post<ResponseBase<MovimientoDeposito[]>>(
      `${environment.apiUrl}/v1/movimientos/getMovimientoEntreDeposito`,
      request
    );
  }

  insertarMovimientoDeposito(request: CrearMovimientoDeposito) {
    return this.http.post<ResponseBase<string>>(
      `${environment.apiUrl}/v1/movimientos/insertarMovimientoDeposito`,
      request
    );
  }

  deleteMovimientoDeposito(request: EliminarMovimientoDeposito) {
    return this.http.post<ResponseBase<string>>(
      `${environment.apiUrl}/v1/movimientos/deleteMovimientoDeposito`,
      request
    );
  }

  modificarMovimientoDeposito(request: ModificarMovimientoDepositoRequest) {
    return this.http.post<ResponseBase<string>>(
      `${environment.apiUrl}/v1/movimientos/modificarMovimientoDeposito`,
      request
    );
  }
}
