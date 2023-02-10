import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { forkJoin, Subscription } from 'rxjs';
import { Deposito } from 'src/app/models/Deposito/Deposito';
import { DepositoRequest } from 'src/app/models/Deposito/DepositoRequest';
import { Mercaderia } from 'src/app/models/Mercaderia/Mercaderia';
import { CrearMovimientoDeposito } from 'src/app/models/MovimientoDepositos/CrearMovimientoDeposito';
import { EstadoMovimientoDeposito } from 'src/app/models/MovimientoDepositos/EstadoMovimientoDeposito';
import { ModificarMovimientoDepositoRequest } from 'src/app/models/MovimientoDepositos/ModificarMovimientoDepositoRequest';
import { MovimientoDepositoAgregar } from 'src/app/models/MovimientoDepositos/MovimientoDepositoAgregar';
import { MovimientoDepositoRequest } from 'src/app/models/MovimientoDepositos/MovimientoDepositoRequest';
import { MovimientoDeposito } from 'src/app/models/MovimientoDepositos/MovimientoDepositos';
import { TipoMovimientoDeposito } from 'src/app/models/MovimientoDepositos/TipoMovimientoDeposito.enum';
import { MovimientoRequest } from 'src/app/models/Movimientos/MovimientoRequest';
import { Registro } from 'src/app/models/Registro/Registro';
import { RegistroRequest } from 'src/app/models/Registro/RegistroRequest';
import { StockActualRequest } from 'src/app/models/Stock/StockActualRequest';
import { DepositoService } from 'src/app/services/deposito/deposito.service';
import { GlobalSnackbarService } from 'src/app/services/global.snackbar/global.snackbar.service';
import { MovimientoService } from 'src/app/services/movimiento/movimiento.service';
import { AgregarProductoService } from 'src/app/services/producto/agregar-producto.service';
import { RegistroService } from 'src/app/services/registro/registro.service';
import { StockService } from 'src/app/services/stock/stock.service';
import { UserService } from 'src/app/services/user/user.service';
import { AgregarMercaderiaDialogComponent } from '../agregar-mercaderia-dialog/agregar-mercaderia-dialog/agregar-mercaderia-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation.dialog/confirmation.dialog.component';
import { NuevoMovimientoDialogComponent } from '../nuevo-movimiento-dialog/nuevo-movimiento-dialog.component';
import { SeleccionProductosComponent } from '../seleccion-productos/seleccion-productos.component';

@Component({
  selector: 'app-modificar-movimiento-dialog',
  templateUrl: './modificar-movimiento-dialog.component.html',
  styleUrls: ['./modificar-movimiento-dialog.component.scss'],
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
export class ModificarMovimientoDialogComponent implements OnInit {
  detalleFormControl = new FormControl('');
  depositoDesdeSelected: number;
  depositoHastaSelected: number;
  estadoSelected: number;
  expandedElement = true;
  registros: Registro[];
  depositos: Deposito[] = [];
  estados: EstadoMovimientoDeposito[] = [
    new EstadoMovimientoDeposito({ id: 3, descripcion: 'ACTIVO' }),
    new EstadoMovimientoDeposito({ id: 4, descripcion: 'PROCESO' }),
  ];

  movimiento: MovimientoDeposito;
  displayedColumns: string[] = [
    'cantidad',
    'codigo',
    'descripcion',
    'stockOrigen',
    'stockDestino',
  ];

  movimientoDepositoGrid: MovimientoDepositoAgregar[] = [];
  nuevoMovimeintoSubscription: Subscription;
  movimientosEliminar: number[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private depositoService: DepositoService,
    private dialog: MatDialog,
    private nuevoMovimientoService: AgregarProductoService,
    private stockService: StockService,
    private userService: UserService,
    private movimientoService: MovimientoService,
    private dialogRef: MatDialogRef<NuevoMovimientoDialogComponent>,
    private snakBarService: GlobalSnackbarService,
    private registroService: RegistroService
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

    const depositoPromise =
      this.depositoService.obtenerDepositos(depositoRequest);

    const registroRequest = new RegistroRequest({
      idMovimiento: this.data.idMovimiento,
    });

    const registroPromise = this.registroService
      .getByIdMovimiento(registroRequest)
      .toPromise();

    const movimiendoRequest = new MovimientoDepositoRequest({
      idMovimiento: this.data.idMovimiento,
    });

    const movimientoPromise =
      this.movimientoService.getMovimientoEntreDeposito(movimiendoRequest);

    forkJoin({ depositoPromise, registroPromise, movimientoPromise }).subscribe(
      (res) => {
        this.depositos = res.depositoPromise.Depositos;
        this.registros = res.registroPromise.Data;
        this.movimiento = res.movimientoPromise.Data[0];

        this.detalleFormControl.setValue(this.movimiento.Detalle);
        this.depositoDesdeSelected = this.movimiento.DepositoOrigen;
        this.depositoHastaSelected = this.movimiento.DepositoDestino;
        this.estadoSelected = this.movimiento.Estado;

        res.registroPromise.Data.forEach((registro) => {
          var movimiento = new MovimientoDepositoAgregar({
            Cantidad: registro.Cantidad,
            Codigo: registro.Id.toString(),
            Descripcion: registro.Descripcion,
            CpInterno: registro.CpInterno,
            IdVariante: registro.idVariante,
            tipoMovimiento: TipoMovimientoDeposito.modificar,
            idMovimiento: registro.IdMovimiento,
          });

          var newArray = new Array<MovimientoDepositoAgregar>(
            ...this.movimientoDepositoGrid
          );

          newArray.push(movimiento);
          this.movimientoDepositoGrid = newArray;
        });

        this.verificarStock_Click();
      }
    );
  }

  async aceptar_Click() {
    var usuarioId = this.userService.getUserValue().Id;
    var fechaActual = new Date();
    var registrosInsertar = new Array<Registro>();
    var registrosModificar = new Array<Registro>();
    var registrosEliminar = new Array<Registro>();

    this.movimientoDepositoGrid.map((movimiento) => {
      if (movimiento.tipoMovimiento === TipoMovimientoDeposito.insertar) {
        registrosInsertar.push(this.MapRegistro(movimiento));
      }

      if (movimiento.tipoMovimiento === TipoMovimientoDeposito.modificar) {
        registrosModificar.push(this.MapRegistro(movimiento));
      }
    });

    this.movimientosEliminar.map((numero) => {
      var registro = new Registro({
        Id: numero,
      });

      registrosModificar = registrosModificar.filter(
        (registro) => registro.Id !== numero
      );
      registrosEliminar.push(registro);
    });

    var movimientoDeposito = new MovimientoDeposito({
      Id: this.data.idMovimiento,
      Fecha: fechaActual,
      Detalle: this.detalleFormControl.value,
      DepositoOrigen: this.depositoDesdeSelected,
      DepositoDestino: this.depositoHastaSelected,
      Estado: this.estadoSelected,
      Usuario: usuarioId.toString(),
    });

    var request = new ModificarMovimientoDepositoRequest({
      registrosInsertar,
      registrosModificar,
      registrosEliminar,
      movimientoDeposito,
    });

    console.log(request);
    await this.movimientoService
      .modificarMovimientoDeposito(request)
      .toPromise();

    this.snakBarService.showSnackBar('Movimientos modificado exitosamente');
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
      nuevoMovimiento.tipoMovimiento = TipoMovimientoDeposito.insertar;
      var newArray = new Array<MovimientoDepositoAgregar>(
        ...this.movimientoDepositoGrid
      );

      nuevoMovimiento = await this.verificarStock(nuevoMovimiento);
      newArray.push(nuevoMovimiento);
      this.movimientoDepositoGrid = newArray;
    }
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
      this.movimientosEliminar.push(Number.parseInt(movimiendo.Codigo));
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

  private MapRegistro(movimiento: MovimientoDepositoAgregar): Registro {
    var usuarioId = this.userService.getUserValue().Id;
    var fechaActual = new Date();
    var registro = new Registro({
      Id: Number.parseInt(movimiento.Codigo),
      IdMovimiento: this.data.idMovimiento,
      Cantidad: movimiento.Cantidad,
      Tipo: 3,
      Descripcion: movimiento.Descripcion,
      CpInterno: movimiento.CpInterno,
      Deposito: 0,
      Vendedor: usuarioId,
      Horario: fechaActual,
      MovimientoOrigen: this.depositoDesdeSelected,
      MovimientoDestino: this.depositoHastaSelected,
      idVariante: 0,
    });

    return registro;
  }
}
