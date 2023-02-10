import { RequestBase } from '../RequestBase';

export class CuentaRequest extends RequestBase {
  numeroCuenta: number;

  constructor(init?: Partial<CuentaRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
