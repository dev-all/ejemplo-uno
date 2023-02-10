export class MercaderiaRequest {
  FechaDesde: Date;
  FechaHasta: Date;
  NumeroDeposito: number;

  constructor(init?: Partial<MercaderiaRequest>) {
    Object.assign(this, init);
  }
}
