import { RequestBase } from '../RequestBase';

export class StockActualRequest extends RequestBase {
  cpInterno: number;
  idDeposito: number;
  idVariante: number;

  constructor(init?: Partial<StockActualRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
