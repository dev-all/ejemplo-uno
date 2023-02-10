import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearMovimientoDeposito } from 'src/app/models/MovimientoDepositos/CrearMovimientoDeposito';
import { EliminarMovimientoDeposito } from 'src/app/models/MovimientoDepositos/EliminarMovimientoDeposito';
import { ModificarMovimientoDepositoRequest } from 'src/app/models/MovimientoDepositos/ModificarMovimientoDepositoRequest';

import { MovimientoDepositoRequest } from 'src/app/models/MovimientoDepositos/MovimientoDepositoRequest';
import { MovimientoDeposito } from 'src/app/models/MovimientoDepositos/MovimientoDepositos';
import { MovimientoReport } from 'src/app/models/Movimientos/MovimientoReport';
import { MovimientoRequest } from 'src/app/models/Movimientos/MovimientoRequest';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

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
