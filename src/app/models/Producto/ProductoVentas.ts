export class ProductoVentas {
  CpInterno: number;
  Detalle: string;
  Lista1: number;
  ListaX: number;
  StockActual: number;

  constructor(init?: Partial<ProductoVentas>) {
    Object.assign(this, init);
  }
}
