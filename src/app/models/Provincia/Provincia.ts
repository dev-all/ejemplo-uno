export class Provincia {
  Id: number;
  Nombre: string;
  constructor(init?: Partial<Provincia>) {
    Object.assign(this, init);
  }
}
