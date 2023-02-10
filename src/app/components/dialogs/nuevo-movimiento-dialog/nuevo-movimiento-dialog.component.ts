import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { async, forkJoin, Subscription } from 'rxjs';
import { Deposito } from 'src/app/models/Deposito/Deposito';
import { DepositoRequest } from 'src/app/models/Deposito/DepositoRequest';
import { EstadoMovimientoDeposito } from 'src/app/models/MovimientoDepositos/EstadoMovimientoDeposito';
import { MovimientoDepositoAgregar } from 'src/app/models/MovimientoDepositos/MovimientoDepositoAgregar';
import { MovimientoDeposito } from 'src/app/models/MovimientoDepositos/MovimientoDepositos';
import { StockActualRequest } from 'src/app/models/Stock/StockActualRequest';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { AgregarProductoService } from 'src/app/services/producto/agregar-producto.service';
import { StockService } from 'src/app/services/stock/stock.service';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmationDialogComponent } from '../confirmation.dialog/confirmation.dialog.component';
import { SeleccionProductosComponent } from '../seleccion-productos/seleccion-productos.component';
import { Registro } from '../../../models/Registro/Registro';
import { MovimientoService } from 'src/app/services/movimiento/movimiento.service';
import { CrearMovimientoDeposito } from 'src/app/models/MovimientoDepositos/CrearMovimientoDeposito';
import { GlobalSnackbarService } from 'src/app/services/global.snackbar/global.snackbar.service';
import { AgregarMercaderiaDialogComponent } from '../agregar-mercaderia-dialog/agregar-mercaderia-dialog/agregar-mercaderia-dialog.component';
import { Mercaderia } from 'src/app/models/Mercaderia/Mercaderia';

@Component({
  selector: 'app-nuevo-movimiento-dialog',
  templateUrl: './nuevo-movimiento-dialog.component.html',
  styleUrls: ['./nuevo-movimiento-dialog.component.scss'],
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
export class NuevoMovimientoDialogComponent implements OnInit {
  detalleFormControl = new FormControl('');
  depositoDesdeSelected: number = 1;
  depositoHastaSelected: number = 2;
  estadoSelected: number = 3;
  expandedElement = true;

  depositos: Deposito[] = [];
  estados: EstadoMovimientoDeposito[] = [
    new EstadoMovimientoDeposito({ id: 3, descripcion: 'ACTIVO' }),
    new EstadoMovimientoDeposito({ id: 4, descripcion: 'PROCESO' }),
  ];

  displayedColumns: string[] = [
    'cantidad',
    'codigo',
    'descripcion',
    'stockOrigen',
    'stockDestino',
  ];

  movimientoDepositoGrid: MovimientoDepositoAgregar[] = [];
  nuevoMovimeintoSubscription: Subscription;
  constructor(
    private depositoService: DepositoService,
    private dialog: MatDialog,
    private nuevoMovimientoService: AgregarProductoService,
    private stockService: StockService,
    private userService: UserService,
    private movimientoService: MovimientoService,
    private dialogRef: MatDialogRef<NuevoMovimientoDialogComponent>,
    private snakBarService: GlobalSnackbarService
  ) {
    this.loadData();
  }

  ngOnInit() {
    this.nuevoMovimeintoSubscription = this.nuevoMovimientoService
      .onChange()
      .subscribe((value) => this.nuevoMovimiento_Change(value));
  }

  ngOnDestroy() {
    this.nuevoMovimeintoSubscription.unsubscribe();
    this.nuevoMovimientoService.resetValues();
  }

  async loadData() {
    const depositoRequest = new DepositoRequest();

    const depositoResponse = await this.depositoService
      .obtenerDepositos(depositoRequest)
      .toPromise();

    this.depositos = depositoResponse.Depositos;
  }

  async aceptar_Click() {
    var usuarioId = this.userService.getUserValue().Id;
    var fechaActual = new Date();
    await Promise.all(
      this.movimientoDepositoGrid.map(async (movimiento) => {
        var movimiendoDeposito = new MovimientoDeposito({
          Fecha: fechaActual,
          Detalle: this.detalleFormControl.value,
          DepositoOrigen: this.depositoDesdeSelected,
          DepositoDestino: this.depositoHastaSelected,
          Estado: this.estadoSelected,
          Usuario: usuarioId.toString(),
        });

        var registro = new Registro({
          Cantidad: movimiento.Cantidad,
          Tipo: 3,
          Descripcion: movimiento.Descripcion,
          CpInterno: movimiento.CpInterno,
          Vendedor: usuarioId,
          Horario: fechaActual,
          MovimientoOrigen: this.depositoDesdeSelected,
          MovimientoDestino: this.depositoHastaSelected,
          Deposito: 0,
          idVariante: 0,
        });

        var request = new CrearMovimientoDeposito({
          movimiento: movimiendoDeposito,
          registro,
        });

        await this.movimientoService
          .insertarMovimientoDeposito(request)
          .toPromise();
      })
    );

    this.snakBarService.showSnackBar('Movimientos agregados exitosamente');
    this.dialogRef.close();
  }

  agregar_Click() {
    this.dialog.open(SeleccionProductosComponent, {
      width: '1000px',
    });
  }

  deposito_Change() {
    this.movimientoDepositoGrid.forEach(async (movimiento) => {
      movimiento = await this.verificarStock(movimiento);
    });
  }

  async verificarStock_Click() {
    this.movimientoDepositoGrid.forEach(async (movimiento) => {
      movimiento = await this.verificarStock(movimiento);
    });
  }

  calcularMercaderia_Click() {
    this.dialog
      .open(AgregarMercaderiaDialogComponent, {
        width: '500px',
        data: { idDeposito: this.depositoHastaSelected },
      })
      .afterClosed()
      .subscribe((mercaderias: Mercaderia[]) => {
        if (mercaderias.length > 0) this.agregarMercaderia(mercaderias);
      });
  }

  private agregarMercaderia(mercaderias: Mercaderia[]) {
    mercaderias.forEach(async (mercaderia) => {
      var nuevoMovimiento = new MovimientoDepositoAgregar({
        Cantidad: mercaderia.Cantidad,
        Codigo: mercaderia.Codigo,
        Descripcion: mercaderia.PreDetalle,
        CpInterno: mercaderia.CpInterno,
      });

      await this.nuevoMovimiento_Change(nuevoMovimiento);
    });
  }

  private async nuevoMovimiento_Change(
    nuevoMovimiento: MovimientoDepositoAgregar
  ) {
    if (nuevoMovimiento) {
      var newArray = new Array<MovimientoDepositoAgregar>(
        ...this.movimientoDepositoGrid
      );

      nuevoMovimiento = await this.verificarStock(nuevoMovimiento);
      newArray.push(nuevoMovimiento);
      this.movimientoDepositoGrid = newArray;
    }
  }

  quitar_Click(cpInterno: number) {
    const dialogConfig = this.deleteDialogConfirm('¿Desea eliminar?');

    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((responseDialog) => {
      if (responseDialog === 'Confirm') {
        this.eliminarMovimiento(cpInterno);
      }
    });
  }

  private async verificarStock(movimiento: MovimientoDepositoAgregar) {
    const requestOrigen = new StockActualRequest({
      cpInterno: movimiento.CpInterno,
      idDeposito: this.depositoDesdeSelected,
      idVariante: movimiento.IdVariante,
    });

    const requestDestino = new StockActualRequest({
      cpInterno: movimiento.CpInterno,
      idDeposito: this.depositoHastaSelected,
      idVariante: movimiento.IdVariante,
    });

    const stockActualOrigen = this.stockService.getStockActual(requestOrigen);

    const stockActualDestino = this.stockService.getStockActual(requestDestino);

    const resultado = await forkJoin({
      stockActualOrigen,
      stockActualDestino,
    }).toPromise();

    movimiento.StockOrigen = resultado.stockActualOrigen.Data;
    movimiento.StockDestino = resultado.stockActualDestino.Data;

    return new MovimientoDepositoAgregar(movimiento);
  }

  private eliminarMovimiento(cpInterno: number) {
    const movimiendo = this.movimientoDepositoGrid.find(
      (x) => x.CpInterno === cpInterno
    );

    if (movimiendo) {
      this.movimientoDepositoGrid = this.movimientoDepositoGrid.filter(
        (x) => x.CpInterno !== cpInterno
      );
    }
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
}
