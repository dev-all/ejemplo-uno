import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bonificacion } from 'src/app/models/Bonificacion/Bonificacion';
import { BonificacionComercialRequest } from 'src/app/models/Bonificacion/BonificacionComercialRequest';
import { BonificacionOfertaRequest } from 'src/app/models/Bonificacion/BonificacionOfertaRequest';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { environment } from 'src/environments/environment';

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
