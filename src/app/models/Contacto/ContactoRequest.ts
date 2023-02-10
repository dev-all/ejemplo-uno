import { RequestBase } from '../RequestBase';

export class ContactoRequest extends RequestBase {
  tipo: number;
  nombre: string;
  constructor(init?: Partial<ContactoRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
