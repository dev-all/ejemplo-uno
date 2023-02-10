import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReporteBase } from 'src/app/models/Reporte/ReporteBase';
import { ReporteMovimientoDepositoRequest } from 'src/app/models/Reporte/ReporteMovimientoDepositoRequest';
import { ReporteRequestMovimiento } from 'src/app/models/Reporte/ReporteRequestMovimiento';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private reportRequesttSubject: BehaviorSubject<ReporteBase>;
  constructor(private http: HttpClient) {
    const cache = localStorage.getItem('reportRequest');
    const reportCache = cache ? JSON.parse(cache) : null;

    this.reportRequesttSubject = new BehaviorSubject<ReporteRequestMovimiento>(
      reportCache
    );
  }

  generarReporteMovimiento(request: object) {
    
    return this.http.post<ResponseBase<string>>(
      `${environment.apiUrl}/v1/reporte/movimiento`,
      request
    );
  }

  generarReporteMovimientoDeposito(request: object) {
    return this.http.post<ResponseBase<string>>(
      `${environment.apiUrl}/v1/reporte/movimientoDeposito`,
      request
    );
  }

  getReportCache() {
    return this.reportRequesttSubject.value;
  }

  /*recive reporteBase an object reporte (generic)*/
  setReportCache(reportBase: ReporteBase) {
    localStorage.setItem('reportRequest', JSON.stringify(reportBase));
    this.reportRequesttSubject.next(reportBase);
  }

  removeReportCache(): void {
    localStorage.removeItem('reportRequest');
    this.reportRequesttSubject.next(null);
  }
}
