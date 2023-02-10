import { RequestBase } from '../RequestBase';

export class ClienteCuentaRequest extends RequestBase {
  cuenta: number;
  constructor(init?: Partial<ClienteCuentaRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
