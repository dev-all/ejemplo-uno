import { RequestBase } from '../RequestBase';

export class AccesoRequest extends RequestBase {
  idVendedor: number;
  nombreAcceso: string;
  constructor(init?: Partial<AccesoRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
