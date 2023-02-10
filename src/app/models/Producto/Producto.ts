export class Producto {
  Codigo: string;
  Detalle: string;
  Ubicacion: string;
  Precio1: number;
  Precio2: number;
  Costo: number;
  StockActual: number;
  UltiCambio: Date;
  UltiVenta: Date;
  CpInterno: number;
  IdVariante: number;
  Deposito: number;
  Marca: string;
  Lista1: number;

  constructor(init?: Partial<Producto>) {
    Object.assign(this, init);
  }
}
