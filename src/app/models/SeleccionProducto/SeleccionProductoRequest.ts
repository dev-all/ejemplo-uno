import { RequestBase } from '../RequestBase';

export class SeleccionProductoRequest extends RequestBase {
  numeroDeposito: number;
  familia: string;
  idProveedor: number;
  numeroMarca: number;
  codigo: string;
  detalle: string;
  conStock: boolean;

  constructor(init?: Partial<SeleccionProductoRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
