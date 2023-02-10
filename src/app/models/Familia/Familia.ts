export class Familia {
  NombreFamilia: string;
  Familia: string;

  constructor(init?: Partial<Familia>) {
    Object.assign(this, init);
  }
}
