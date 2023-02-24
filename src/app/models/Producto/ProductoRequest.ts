import { RequestBase } from '../RequestBase';

export class ProductoRequest extends RequestBase {
  codigo: string;
  codigoBarra: string;
  CodigoGlobal: string;
  codigoProveedor: string;
  cpInterno: number;
  detalle: string;
  idProveedor: number;
  idDeposito: number;
  codigoMarca: number;
  codigoMoneda: number;
  bajoControlStock: boolean;
  stockPositivo: boolean;
  excluirNovedades: boolean;
  enOferta: boolean;
  suspendido: boolean;
  idGrupo?: number;
  idRubro?: number;
  idSubrubro?: number;
  IncluirVariante: boolean;

  constructor(init?: Partial<ProductoRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
