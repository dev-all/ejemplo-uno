import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Deposito } from '@models/Deposito/Deposito';
import { DepositoRequest } from '@models/Deposito/DepositoRequest';
import { Familia } from '@models/Familia/Familia';
import { Marca } from '@models/Marca/Marca';
import { Producto } from '@models/Producto/Producto';
import { Proveedor } from '@models/Proveedor/Proveedor';
import { ProveedorRequest } from '@models/Proveedor/ProveedorRequest';
import { RequestBase } from '@models/RequestBase';
import { SeleccionProducto } from '@models/SeleccionProducto/SeleccionProducto';
import { SeleccionProductoRequest } from '@models/SeleccionProducto/SeleccionProductoRequest';
import { DepositoService } from '@services/deposito/deposito.service';
import { FamiliaService } from '@services/familia/familia.service';
import { MarcaService } from '@services/marca/marca.service';
import { ProveedorService } from '@services/proveedor/proveedor.service';
import { SeleccionProductoService } from '@services/seleccionProducto/seleccionProducto.service';
import { DialogsTypes } from '@shared/dialogs-types';
import { AgregarProductoDialogComponent } from '../agregar-producto-dialog/agregar-producto-dialog.component';
import { ModalService } from '@services/modal/modal.service';
import { SecurityAccess } from '@shared/securityAccess';
import { ConfirmationDialogComponent } from '../confirmation.dialog/confirmation.dialog.component';
import { ProductoService } from '@services/producto/producto.service';
import { ProductoRequest } from '@models/Producto/ProductoRequest';
import { AgregarProducto } from '@models/Producto/AgregarProducto';
import { AgregarProductoService } from '@services/producto/agregar-producto.service';
import { MovimientoDepositoAgregar } from '@models/MovimientoDepositos/MovimientoDepositoAgregar';

@Component({
  selector: 'app-seleccion-productos',
  templateUrl: './seleccion-productos.component.html',
  styleUrls: ['./seleccion-productos.component.scss'],
  animations: [
    trigger('detailExpand1', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SeleccionProductosComponent implements OnInit {
  detalleFormControl = new FormControl('');
  codigoFormControl = new FormControl('');
  subRubroSelected: string;
  marcaSelected: number;
  proveedorSelected: number;
  depositoSelected: number = 1;
  subRubros: Familia[] = [];
  subRubrosDb: Familia[] = [];
  marcas: Marca[] = [];
  proveedores: Proveedor[] = [];
  proveedoresDb: Proveedor[] = [];
  depositos: Deposito[] = [];
  productosConStrock: boolean = false;
  expandedElement = true;

  public proveedorFilterCtrl: FormControl = new FormControl();
  public subRubroFilterCtrl: FormControl = new FormControl();

  displayedColumns: string[] = [
    'codigo',
    'detalle',
    'marca',
    'lista1',
    'stock',
    'agregar',
  ];

  seleccionProducto: SeleccionProducto[] = [];
  constructor(
    private familiaService: FamiliaService,
    private marcaService: MarcaService,
    private proveedorService: ProveedorService,
    private depositoService: DepositoService,
    private seleccionProductoService: SeleccionProductoService,
    private dialog: MatDialog,
    private modalService: ModalService,
    public securityAccess: SecurityAccess,
    private productoService: ProductoService,
    private nuevoMovimientoService: AgregarProductoService
  ) {
    this.loadData();

    this.proveedorFilterCtrl.valueChanges.subscribe(() => {
      this.searchProveedores();
    });

    this.subRubroFilterCtrl.valueChanges.subscribe(() => {
      this.searchSubRubros();
    });
  }

  ngOnInit() {}

  async loadData() {
    const familiaRequest = new RequestBase();
    const marcaRequest = new RequestBase();
    const depositoRequest = new DepositoRequest();
    const proveedorRequest = new ProveedorRequest();

    const familiaService = this.familiaService.obtener(familiaRequest);

    const marcaService = this.marcaService.obtener(marcaRequest);

    const depositoService =
      this.depositoService.obtenerDepositos(depositoRequest);

    const proveedorService =
      this.proveedorService.obtenerProveedores(proveedorRequest);

    const resultServices = await forkJoin({
      familiaService,
      marcaService,
      depositoService,
      proveedorService,
    }).toPromise();

    this.subRubros = resultServices.familiaService.Data;
    this.subRubrosDb = resultServices.familiaService.Data;
    this.marcas = resultServices.marcaService.Data;
    this.proveedores = resultServices.proveedorService.Proveedores;
    this.proveedoresDb = resultServices.proveedorService.Proveedores;
    this.depositos = resultServices.depositoService.Depositos;
  }

  async buscar() {
    const request = new SeleccionProductoRequest({
      numeroDeposito: this.depositoSelected,
      familia: this.subRubroSelected,
      idProveedor: this.proveedorSelected,
      numeroMarca: this.marcaSelected,
      codigo: this.codigoFormControl.value,
      detalle: this.detalleFormControl.value,
      conStock: this.productosConStrock,
    });

    const serviceResponse = await this.seleccionProductoService
      .obtener(request)
      .toPromise();

    this.seleccionProducto = serviceResponse.Data;
  }

  searchProveedores() {
    let search = this.proveedorFilterCtrl.value.toLowerCase();

    if (!search) {
      this.proveedores = this.proveedoresDb;
      return;
    }

    this.proveedores = this.proveedoresDb.filter((x) =>
      x.Nombre.toLowerCase().startsWith(search)
    );
  }

  searchSubRubros() {
    let search = this.subRubroFilterCtrl.value.toLowerCase();

    if (!search) {
      this.subRubros = this.subRubrosDb;
      return;
    }

    this.subRubros = this.subRubrosDb.filter((x) =>
      x.NombreFamilia.toLowerCase().startsWith(search)
    );
  }

  addProducto(seleccionProducto: SeleccionProducto) {
    var agregarProducto = new AgregarProducto({
      descripcion: seleccionProducto.Detalle,
      precio: seleccionProducto.ListaX,
      litros: seleccionProducto.Litros,
    });
    this.dialog
      .open(AgregarProductoDialogComponent, {
        disableClose: false,
        data: { agregarProducto },
      })
      .afterClosed()
      .subscribe((cantidad) => {
        if (!cantidad) return;
        var movimiento = new MovimientoDepositoAgregar({
          Cantidad: cantidad,
          Codigo: seleccionProducto.Codigo,
          Descripcion: seleccionProducto.Detalle,
          CpInterno: seleccionProducto.CpInterno,
          IdVariante: seleccionProducto.IdVariante,
        });
        this.nuevoMovimientoService.changeValue(movimiento);
      });
  }

  openDialog(seleccionProducto: SeleccionProducto, tipoDialog: string) {
    {
      const dialogTypes = new DialogsTypes();

      const dialog = dialogTypes.types.find(
        (x) => x.description === tipoDialog
      );

      var producto = new Producto({
        CpInterno: seleccionProducto.CpInterno,
        Detalle: seleccionProducto.Detalle,
        Deposito: this.depositoSelected,
        IdVariante: seleccionProducto.IdVariante,
      });

      this.dialog
        .open(dialog.component, {
          data: {
            producto,
          },
          width: dialog.width,
        })
        .afterClosed()
        .subscribe(() => {
          if (this.modalService.value()) {
            this.modalService.changeValue();
            this.buscar();
          }
        });
    }
  }

  delete(data: SeleccionProducto) {
    if (!this.securityAccess.validateAccess('BORRAR_PRODUCTO')) {
      return;
    }
    const dialogConfig = this.deleteDialogConfirm(data);

    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((responseDialog) => {
      if (responseDialog === 'Confirm') {
        this.productoService
          .delete(
            new ProductoRequest({ cpInterno: data.CpInterno, database: null })
          )
          .subscribe((response) => {
            this.buscar();
          });
      }
    });
  }

  private deleteDialogConfirm(data: SeleccionProducto) {
    const title = `¿Desea eliminar el producto: ${data.Detalle} ?`;
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
