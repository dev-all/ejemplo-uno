export class MovimientoDeposito {
  Id: number;
  Fecha: Date;
  Detalle: string;
  DepositoOrigen: number;
  DepositoDestino: number;
  Estado: number;
  Usuario: string;

  constructor(init?: Partial<MovimientoDeposito>) {
    Object.assign(this, init);
  }
}
