export class Cliente {
  Cuenta: number;
  Nombre: string;
  Fantasia: string;
  Ciudad: string;
  Direccion: string;

  constructor(init?: Partial<Cliente>) {
    Object.assign(this, init);
  }
}
