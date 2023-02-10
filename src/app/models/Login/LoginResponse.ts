import { Acceso } from '../Acceso/Acceso';

export class LoginResponse {
  access_token: string;
  expires_in: number;
  error: string;
  idVendedor: number;
  nombre: string;
  accesos: Acceso[];
  idCasilla: number;
  deposito: number;
  bonificacionMax: number;

  constructor(init?: Partial<LoginResponse>) {
    Object.assign(this, init);
  }
}
