import { Acceso } from './Acceso/Acceso';

export class Usuario {
  Id: number;
  nombre: string;
  token: string;
  accesos: Acceso[];
  idCasilla: number;
  deposito: number;
  bonificacionMax: number;
  prefiScan: string;

  constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}
