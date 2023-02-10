import { TipoMovimientoDeposito } from './TipoMovimientoDeposito.enum';

export class MovimientoDepositoAgregar {
  Cantidad: number;
  Codigo: string;
  Descripcion: string;
  StockOrigen: number;
  StockDestino: number;
  CpInterno: number;
  IdVariante: number;
  tipoMovimiento: TipoMovimientoDeposito;
  idMovimiento: number;

  constructor(init?: Partial<MovimientoDepositoAgregar>) {
    Object.assign(this, init);
  }
}
