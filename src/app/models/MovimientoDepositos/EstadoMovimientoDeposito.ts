export class EstadoMovimientoDeposito {
  id: number;
  descripcion: string;
  constructor(init?: Partial<EstadoMovimientoDeposito>) {
    Object.assign(this, init);
  }
}
