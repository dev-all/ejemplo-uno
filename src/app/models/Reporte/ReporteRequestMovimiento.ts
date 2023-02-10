import { Movimiento } from '../Movimientos/Movimiento';
import { RequestBase } from '../RequestBase';
import { ReporteBase } from './ReporteBase';

export class ReporteRequestMovimiento extends ReporteBase {
  nombreProducto: string;
  movimientos: Movimiento[];
  stockInicial: number;
  totalVentas: number;
  totalCompras: number;
  totalAjustes: number;
  stockActual: number;  

  constructor(init?: Partial<ReporteRequestMovimiento>) {
    super(init);
    Object.assign(this, init);
  }
}
