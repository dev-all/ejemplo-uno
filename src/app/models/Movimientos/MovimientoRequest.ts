import { RequestBase } from '../RequestBase';

export class MovimientoRequest extends RequestBase {
  fechaDesde: Date;
  fechaHasta: Date;
  cpInterno: number;
  idVariante: number;
  idDeposito: number;

  constructor(init?: Partial<MovimientoRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
