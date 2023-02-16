import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bonificacion } from '@models/Bonificacion/Bonificacion';
import { BonificacionComercialRequest } from '@models/Bonificacion/BonificacionComercialRequest';
import { BonificacionOfertaRequest } from '@models/Bonificacion/BonificacionOfertaRequest';
import { ResponseBase } from '@models/ResponseBase';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BonificacionService {
  constructor(private http: HttpClient) {}

  obtenerComercial(request: BonificacionComercialRequest) {
    return this.http.post<ResponseBase<Bonificacion>>(
      `${environment.apiUrl}/v1/bonificacion/obtenerComercial`,
      request
    );
  }

  obtenerOferta(request: BonificacionOfertaRequest) {
    return this.http.post<ResponseBase<Bonificacion>>(
      `${environment.apiUrl}/v1/bonificacion/obtenerOferta`,
      request
    );
  }
}
