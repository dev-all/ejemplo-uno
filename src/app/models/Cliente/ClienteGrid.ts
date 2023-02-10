export class ClienteGrid {
  RazonSocial: string;
  NombreFantasia: string;
  Ciudad: string;
  Direccion: string;

  constructor(init?: Partial<ClienteGrid>) {
    Object.assign(this, init);
  }
}
