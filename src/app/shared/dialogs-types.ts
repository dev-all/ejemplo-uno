import { AjusteStockDialogComponent } from '../components/dialogs/ajuste.stock.dialog/ajuste.stock.dialog.component';
import { InicioStockDialogComponent } from '../components/dialogs/inicio.stock.dialog/inicio.stock.dialog.component';
import { MovimientosDialogComponent } from '../components/dialogs/movimientos.dialog/movimientos.dialog.component';

class DialogType {
  description: string;
  component: any;
  width: string;

  constructor(init?: Partial<DialogType>) {
    Object.assign(this, init);
  }
}

export class DialogsTypes {
  types: Array<DialogType> = [];

  constructor() {
    const ajusteDialog = new DialogType({
      description: 'ajuste',
      component: AjusteStockDialogComponent,
      width: '820px',
    });

    const inicioStockDialog = new DialogType({
      description: 'inicio',
      component: InicioStockDialogComponent,
      width: '820px',
    });

    const movimientosDialog = new DialogType({
      description: 'movimientos',
      component: MovimientosDialogComponent,
      width: '1330px',
    });

    this.types = [ajusteDialog, inicioStockDialog, movimientosDialog];
  }
}
