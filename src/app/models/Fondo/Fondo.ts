export class Fondo {
  Tipo: string;
  Banco: string;
  Numero: string;
  Vence: string;
  Cuotas: string;
  Importe: string;
  
  constructor(init?: Partial<Fondo>) {
    Object.assign(this, init);
  }
}
