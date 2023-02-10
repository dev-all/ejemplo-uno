import { RequestBase } from '../RequestBase';

export class ProductoByCodigoRequest extends RequestBase {
  codigo: string;

  constructor(init?: Partial<ProductoByCodigoRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
