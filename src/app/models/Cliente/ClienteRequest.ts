import { RequestBase } from '../RequestBase';

export class ClienteRequest extends RequestBase {
  Cuenta: number;
  Nombre: string;
  NombreFantasia: string;
  FormaVenta: number;
  IdLista: number;
  Direccion: string;
  CUIT: string;
  IdProvincia: number;
  IdCuidad: number;
  IdVendedor: number;
  idZona: number;
  Idsucursal: number;
  IdCategoria: number;
  Aclaracion: string;

  constructor(init?: Partial<ClienteRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
