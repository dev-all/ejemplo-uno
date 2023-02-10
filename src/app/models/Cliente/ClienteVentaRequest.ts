import { RequestBase } from '../RequestBase';
import { TipoBusquedadCliente } from './TipoBusquedadCliente.enum';

export class ClienteVentaRequest extends RequestBase {
  tipoBusquedad: TipoBusquedadCliente;
  value: string;
  constructor(init?: Partial<ClienteVentaRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
