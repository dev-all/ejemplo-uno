import { Cliente } from './Cliente';

export class ClienteResponse {
  Clientes: Cliente[];
  CurrentPage: number;
  NextPage:number;
  TotalRows: number;
  TotalPages: number;

  constructor(init?: Partial<ClienteResponse>) {
    Object.assign(this, init);
  }
}
