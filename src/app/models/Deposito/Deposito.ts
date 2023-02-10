export class Deposito {
    Numero: number;
    Detalle: string;
    Direccion: string;

    
  constructor(init?: Partial<Deposito>) {
    Object.assign(this, init);
  }
}
