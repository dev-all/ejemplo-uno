export class MovimientoDepositoRequest {
  fechaDesde: Date;
  fechaHasta: Date;
  descripcion: string;
  idMovimiento: number;

  constructor(init?: Partial<MovimientoDepositoRequest>) {
    Object.assign(this, init);
  }
}
