export class Marca {
  NroMarca: number;
  Detalle: string;
  constructor(init?: Partial<Marca>) {
    Object.assign(this, init);
  }
}
