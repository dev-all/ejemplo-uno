import { Stock } from '../Stock/StockInicial';

export class AgregarProducto {
  descripcion: string;
  precio: number;
  litros: number;
  stockActual: number;
  stocks: Stock[];

  constructor(init?: Partial<AgregarProducto>) {
    Object.assign(this, init);
  }
}
