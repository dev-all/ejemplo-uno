export class NumeroFormulario {
  CodigoPapel: string;
  Numero: number;
  Descripcion: string;
  constructor(init?: Partial<NumeroFormulario>) {
    Object.assign(this, init);
  }
}
