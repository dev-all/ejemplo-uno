import { RequestBase } from '../RequestBase';

export class BonificacionOfertaRequest extends RequestBase {
  cpInterno: number;
  cantidad: number;

  constructor(init?: Partial<BonificacionOfertaRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
