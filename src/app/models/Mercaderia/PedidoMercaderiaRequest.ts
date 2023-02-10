import { ComprobanteCabeceraRequest } from '../Comprobante/ComprobanteCabeceraRequest';
import { ComprobanteDetalleRequest } from '../Comprobante/ComprobanteDetalleRequest';
import { RequestBase } from '../RequestBase';

export class PedidoMercaderiaRequest extends RequestBase {
  comprobanteCabecera: ComprobanteCabeceraRequest;
  comprobantesDetalle: ComprobanteDetalleRequest[];

  constructor(init?: Partial<PedidoMercaderiaRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
