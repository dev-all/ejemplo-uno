import { RequestBase } from '../RequestBase';

export class BonificacionComercialRequest extends RequestBase {
  cpInterno: number;
  numeroCuenta: number;
  cantidad: number;

  constructor(init?: Partial<BonificacionComercialRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
