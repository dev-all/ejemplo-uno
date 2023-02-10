export class Variante {
  IdVariante: number;
  CodigoVariante: string;
  DetalleVariante: string;
  DescripcionColor: string;

  constructor(init?: Partial<Variante>) {
    Object.assign(this, init);
  }
}
