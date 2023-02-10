export class Movimiento {
  Fecha: string;
  Tipo: string;
  Cantidad: string;
  Detalle: string;
  Actual: string;
  Nombre: string;
  Usuario: string;  
  Deposito: string;
  Vencimiento: string;  

  constructor(init?: Partial<Movimiento>) {
    Object.assign(this, init);
  }
}
