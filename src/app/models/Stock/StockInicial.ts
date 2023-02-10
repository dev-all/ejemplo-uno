import { Deposito } from '../Deposito/Deposito';

export class Stock {
  IdStock: number;
  CpInterno: number;
  Ubicacion: string;
  StockInicial: number;
  Minimo: number;
  Maximo: number;
  StkActual: number;
  StkPedido: number;
  Horario: Date;
  IdVariante: number;
  Usuario: number;
  DescripcionVariante: string;
  DetalleDeposito: Deposito;
  constructor(init?: Partial<Stock>) {
    Object.assign(this, init);
  }
}
