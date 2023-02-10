import { TipoLista } from '../Lista/TipoLista.enum';
import { RequestBase } from '../RequestBase';

export class ProductoVentaGridRequest extends RequestBase {
  cpInterno: number;
  numeroDeposito: number;
  tipoLista: TipoLista;

  constructor(init?: Partial<ProductoVentaGridRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
