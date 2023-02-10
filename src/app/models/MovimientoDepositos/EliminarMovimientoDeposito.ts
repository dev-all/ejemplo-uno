import { RequestBase } from '../RequestBase';

export class EliminarMovimientoDeposito extends RequestBase {
  idMovimiento: number;

  constructor(init?: Partial<EliminarMovimientoDeposito>) {
    super(init);
    Object.assign(this, init);
  }
}
