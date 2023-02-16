import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MovimientoDepositoRequest } from '@models/MovimientoDepositos/MovimientoDepositoRequest';
import { MovimientoDeposito } from '@models/MovimientoDepositos/MovimientoDepositos';
import { GlobalSnackbarService } from '@services/global.snackbar/global.snackbar.service';
import { MovimientoService } from '@services/movimiento/movimiento.service';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NuevoMovimientoDialogComponent } from '@components/dialogs/nuevo-movimiento-dialog/nuevo-movimiento-dialog.component';
import { AgregarProductoService } from '@services/producto/agregar-producto.service';
import { EliminarMovimientoDeposito } from '@models/MovimientoDepositos/EliminarMovimientoDeposito';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ConfirmationDialogComponent } from '@components/dialogs/confirmation.dialog/confirmation.dialog.component';
import { ModificarMovimientoDialogComponent } from '@components/dialogs/modificar-movimiento-dialog/modificar-movimiento-dialog.component';
import { ReporteMovimientoDepositoRequest } from '@models/Reporte/ReporteMovimientoDepositoRequest';
import { ReporteService } from '@services/reporte/reporte.service';
import { Router } from '@angular/router';
import { ReporteBase } from '@models/Reporte/ReporteBase';
import { TipoReporte } from '@models/Reporte/TipoReporte.enum';

@Component({
  selector: 'app-movimiento-deposito',
  templateUrl: './movimiento-deposito.component.html',
  styleUrls: ['./movimiento-deposito.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MovimientoDepositoPage implements OnInit {
  fechaDesdeFormControl = new FormControl();
  fechaHastaFormControl = new FormControl();
  descripcionFormControl = new FormControl();
  notFoundData: boolean;
  expandedElement = true;

  columnasTabla: string[] = [
    'fecha',
    'numero',
    'detalle',
    'depOrigen',
    'depDestino',
    'estado',
    'usuario',
  ];

  dataSource: MovimientoDeposito[] = [];
  constructor(
    private movimientoService: MovimientoService,
    private snackBarService: GlobalSnackbarService,
    private dialog: MatDialog,
    private nuevoMovimientoService: AgregarProductoService,
    private reporteService: ReporteService,
    private router: Router
  ) {}

  ngOnInit() {
    var desde = moment().subtract(7, 'd').toDate();
    var hasta = moment().toDate();

    this.fechaDesdeFormControl.setValue(desde);
    this.fechaHastaFormControl.setValue(hasta);

    this.buscar();
  }

  async buscar() {
    const request = new MovimientoDepositoRequest({
      fechaDesde: this.fechaDesdeFormControl.value,
      fechaHasta: this.fechaHastaFormControl.value,
      descripcion: this.descripcionFormControl.value,
    });

    if (!request.fechaDesde || !request.fechaHasta) {
      this.snackBarService.showSnackBar(
        'Fecha desde y hasta no pueden estar vacias'
      );

      return;
    }
    const responseMovimientos = await this.movimientoService
      .getMovimientoEntreDeposito(request)
      .toPromise();

    console.log(responseMovimientos);
    if (responseMovimientos.Data.length === 0) this.notFoundData = true;
    else this.notFoundData = false;

    this.dataSource = responseMovimientos.Data;
  }

  nuevo_Click() {
    this.dialog
      .open(NuevoMovimientoDialogComponent, {
        width: '1190px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.dialogClose_Event());
  }

  modificar_Click(idMovimiento: number) {
    this.dialog
      .open(ModificarMovimientoDialogComponent, {
        width: '1190px',
        disableClose: true,
        data: { idMovimiento },
      })
      .afterClosed()
      .subscribe(() => this.dialogClose_Event());
  }

  async eliminar_Click(idMovimiento: number) {
    var request = new EliminarMovimientoDeposito({
      idMovimiento,
    });
    const dialogConfig = this.deleteDialogConfirm('¿Desea eliminar?');

    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );

    const responseDialog = await dialogRef.afterClosed().toPromise();

    if (responseDialog === 'Confirm') {
      await this.movimientoService
        .deleteMovimientoDeposito(request)
        .toPromise();

      this.buscar();
      this.snackBarService.showSnackBar('Movimiento eliminado correctamente');
    }
  }

  async imprimir(movimiento: MovimientoDeposito) {
    var reporteRequest = new ReporteMovimientoDepositoRequest({
      depositoDesde: movimiento.DepositoOrigen.toString(),
      depositoHasta: movimiento.DepositoDestino.toString(),
      idMovimiento: movimiento.Id,
      formatoArchivo: 'pdf',
    });

    var reporteBase = new ReporteBase({
      formatoArchivo: 'pdf',
      nombreArchivo: `MOVIMIENDO - ${movimiento.Detalle.toUpperCase()} `,
      tipoReporte: TipoReporte.movimientoDeposito,
      reporteRequest: reporteRequest,
    });

    this.reporteService.setReportCache(reporteBase);

    var reporte = await this.reporteService
      .generarReporteMovimientoDeposito(reporteBase.reporteRequest)
      .toPromise();

    let baseUrl = window.location.href.replace(this.router.url, '');
    var url = this.router.createUrlTree(['/pdf-viewer', reporte.Data, 2]);
    window.open(baseUrl + url, '_blank');
  }

  private deleteDialogConfirm(message: string) {
    const title = message;
    const disableStoreDialogConfig = new MatDialogConfig();
    disableStoreDialogConfig.disableClose = false;
    disableStoreDialogConfig.autoFocus = true;
    disableStoreDialogConfig.data = {
      title,
      text: '',
      btnPrimaryText: 'Eliminar',
    };

    return disableStoreDialogConfig;
  }

  private dialogClose_Event() {
    this.buscar();
    this.nuevoMovimientoService.changeValue(null);
  }
}
