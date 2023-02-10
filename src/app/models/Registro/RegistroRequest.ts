import { RequestBase } from '../RequestBase';

export class RegistroRequest extends RequestBase {
  idMovimiento: number;

  constructor(init?: Partial<RegistroRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
