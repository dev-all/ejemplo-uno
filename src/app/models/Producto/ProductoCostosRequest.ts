import { TipoLista } from '../Lista/TipoLista.enum';
import { RequestBase } from '../RequestBase';

export class ProductoCostosRequest extends RequestBase {
  cpInternos: number[];
  tipoLista: TipoLista;

  constructor(init?: Partial<ProductoCostosRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
