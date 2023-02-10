export class Categoria {
  Id: number;
  Detalle: string;
  Aplicar: string;
  
  constructor(init?: Partial<Categoria>) {
    Object.assign(this, init);
  }
}
