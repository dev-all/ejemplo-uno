export class ReporteRegistro {
  cantidad: number;
  codigo: string;
  detalle: string;
  constructor(init?: Partial<ReporteRegistro>) {
    Object.assign(this, init);
  }
}
