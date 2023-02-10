export class Registro {
  Id: number;
  Cantidad: number;
  Tipo: number;
  Descripcion: string;
  CpInterno: number;
  Deposito: number;
  Vendedor: number;
  idVariante: number;
  MovimientoOrigen: number;
  MovimientoDestino: number;
  Horario: Date;
  IdMovimiento: number;

  constructor(init?: Partial<Registro>) {
    Object.assign(this, init);
  }
}
