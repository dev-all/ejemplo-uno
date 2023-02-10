export class ReciboCuentaItem {
  Fecha: Date;
  Boleta: string;
  DescripcionBoleta: string;
  Seccion: string;
  Numero: number;
  Base: number;
  Importe: number;
  Iva: number;
  Imputado: number;
  Entrega: number;
  Interno: number;
  Signo: string;

  constructor(init?: Partial<ReciboCuentaItem>) {
    Object.assign(this, init);
  }
}
