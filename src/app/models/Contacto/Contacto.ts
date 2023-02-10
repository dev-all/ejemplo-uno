export class Contacto {
  Nombre: string;
  Numero: string;

  constructor(init?: Partial<Contacto>) {
    Object.assign(this, init);
  }
}
