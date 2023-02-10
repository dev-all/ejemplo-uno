import { RequestBase } from '../RequestBase';

export class WhatsappRequest extends RequestBase {
  imagenBytes: string;
  constructor(init?: Partial<WhatsappRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
