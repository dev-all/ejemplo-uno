import { RequestBase } from '../RequestBase';

export class ProductoVentaRequest extends RequestBase {
  detalle: string;
  
  constructor(init?: Partial<ProductoVentaRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
