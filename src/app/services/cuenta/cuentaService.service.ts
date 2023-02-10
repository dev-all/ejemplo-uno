import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CuentaPendiente } from 'src/app/models/Cuenta/CuentaPendiente';
import { CuentaRequest } from 'src/app/models/Cuenta/CuentaRequest';
import { ResumenCuenta } from 'src/app/models/Cuenta/ResumenCuenta';
import { ReciboCuentaItem } from 'src/app/models/Recibo/Recibo';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CuentaServiceService {
  constructor(private http: HttpClient) {}

  obtenerPendiente(request: CuentaRequest) {
    return this.http.post<ResponseBase<CuentaPendiente>>(
      `${environment.apiUrl}/v1/cuentas/obtenerPendiente`,
      request
    );
  }

  obtenerResumen(request: CuentaRequest) {
    return this.http.post<ResponseBase<ResumenCuenta[]>>(
      `${environment.apiUrl}/v1/cuentas/obtenerResumen`,
      request
    );
  }

  obtenerReciboCuentaItems(request: CuentaRequest) {
    return this.http.post<ResponseBase<ReciboCuentaItem[]>>(
      `${environment.apiUrl}/v1/cuentas/obtenerReciboCuentaItems`,
      request
    );
  }

  obtenerReciboCuentaTotal(request: CuentaRequest) {
    return this.http.post<ResponseBase<number>>(
      `${environment.apiUrl}/v1/cuentas/obtenerReciboCuentaTotal`,
      request
    );
  }
}
