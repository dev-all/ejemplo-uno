import { MovimientoDeposito } from './MovimientoDepositos';
import { Registro } from '../Registro/Registro';

export class CrearMovimientoDeposito {
  movimiento: MovimientoDeposito;
  registro: Registro;

  constructor(init?: Partial<CrearMovimientoDeposito>) {
    Object.assign(this, init);
  }
}
