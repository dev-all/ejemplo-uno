export class Zona {
  Id: number;
  Descripcion: string;
  constructor(init?: Partial<Zona>) {
    Object.assign(this, init);
  }
}
