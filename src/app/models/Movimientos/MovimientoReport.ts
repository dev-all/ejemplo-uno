import { Movimiento } from './Movimiento';

export class MovimientoReport {
  Movimientos: Movimiento[];
  StockComprometido: number;
  StockInicial: number;
  TotalCompras: number;
  TotalVentas: number;
  TotalAjustes: number;
  StockActual: number;
}
