import { Registro } from '../Registro/Registro';
import { RequestBase } from '../RequestBase';
import { MovimientoDeposito } from './MovimientoDepositos';

export class ModificarMovimientoDepositoRequest extends RequestBase {
  registrosInsertar: Registro[];
  registrosEliminar: Registro[];
  registrosModificar: Registro[];
  movimientoDeposito: MovimientoDeposito;

  constructor(init?: Partial<ModificarMovimientoDepositoRequest>) {
    super(init);
    Object.assign(this, init);
  }
}
