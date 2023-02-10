export class Imputacion {
  Fecha: Date;
  Comprobante: string;
  Importe: number;
  Imputado: string;
  constructor(init?: Partial<Imputacion>) {
    Object.assign(this, init);
  }
}
