export class Mercaderia {
  Cantidad: number;
  Codigo: string;
  PreDetalle: string;
  CpInterno: number;

  constructor(init?: Partial<Mercaderia>) {
    Object.assign(this, init);
  }
}
