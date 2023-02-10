import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoRequest } from '../../models/Producto/ProductoRequest';
import { ProductosResponse } from 'src/app/models/Producto/ProductosResponse';
import { ResponseBase } from 'src/app/models/ResponseBase';
import { ProductoVentaRequest } from 'src/app/models/Producto/ProductoVentaRequest';
import { ProductoVentas } from 'src/app/models/Producto/ProductoVentas';
import { ProductoVentaGridRequest } from 'src/app/models/Producto/ProductoVentaGridRequest';
import { ProductoVentaGrid } from 'src/app/models/Producto/ProductoVentaGrid';
import { ProductoCostosRequest } from 'src/app/models/Producto/ProductoCostosRequest';
import { ProductoCostos } from 'src/app/models/Producto/ProductoCostos';
import { ProductoByCodigoRequest } from 'src/app/models/Producto/ProductoByCodigoRequest';
import { ProductoByCodigoResponse } from 'src/app/models/Producto/ProductoByCodigoResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  getByFiltros(request: ProductoRequest) {
    return this.http.post<ResponseBase<ProductosResponse>>(
      `${environment.apiUrl}/v1/producto/getByFiltros`,
      request
    );
  }

  getProductosVentas(request: ProductoVentaRequest) {
    return this.http.post<ResponseBase<ProductoVentas[]>>(
      `${environment.apiUrl}/v1/producto/getProductosVentas`,
      request
    );
  }

  getProductoVentaGrid(request: ProductoVentaGridRequest) {
    return this.http.post<ResponseBase<ProductoVentaGrid>>(
      `${environment.apiUrl}/v1/producto/getProductoVentaGrid`,
      request
    );
  }

  getProductosCostos(request: ProductoCostosRequest) {
    return this.http.post<ResponseBase<ProductoCostos[]>>(
      `${environment.apiUrl}/v1/producto/getProductosCostos`,
      request
    );
  }

  getProductosByCodigo(request: ProductoByCodigoRequest) {
    return this.http.post<ResponseBase<ProductoByCodigoResponse[]>>(
      `${environment.apiUrl}/v1/producto/getProductosByCodigo`,
      request
    );
  }

  delete(request: ProductoRequest) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        cpInterno: request.cpInterno,
        dataBaser: request.database,
      },
    };
    return this.http.delete(`${environment.apiUrl}/v1/producto`, options);
  }
}
