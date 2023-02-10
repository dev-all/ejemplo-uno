import { RequestBase } from '../RequestBase';
import { ReporteBase } from './ReporteBase';
import { ReporteRegistro } from './ReporteRegistro';

export class ReporteMovimientoDepositoRequest extends ReporteBase {
  depositoDesde: string;
  depositoHasta: string;
  idMovimiento: number;
  reporteRegistro: ReporteRegistro;  

  constructor(init?: Partial<ReporteMovimientoDepositoRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
