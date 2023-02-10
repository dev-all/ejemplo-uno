export class SeleccionProducto {
  Codigo: string;
  Detalle: string;
  ListaX: number;
  StockActual: number;
  NombreMarca: string;
  CpInterno: number;
  UltimoCambio: Date;
  Ubicacion: string;
  Moneda: number;
  IvaPro: number;
  IdVariante: number;
  Litros: number;

  constructor(init?: Partial<SeleccionProducto>) {
    Object.assign(this, init);
  }
}
