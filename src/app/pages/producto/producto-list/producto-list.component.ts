import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Producto } from '@models/Producto/Producto';
import { ProductoRequest } from '@models/Producto/ProductoRequest';
import { ProductoService } from '@services/producto/producto.service';
import { animate,  state,  style,  transition,  trigger,} from '@angular/animations';
import { ProveedorService } from '@services/proveedor/proveedor.service';
import { Proveedor } from '@models/Proveedor/Proveedor';
import { ProveedorRequest } from '@models/Proveedor/ProveedorRequest';
import { DepositoRequest } from '@models/Deposito/DepositoRequest';
import { Deposito } from '@models/Deposito/Deposito';
import { DepositoService } from '@services/deposito/deposito.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalService } from '@services/modal/modal.service';
import { ConfirmationDialogComponent } from '@components/dialogs/confirmation.dialog/confirmation.dialog.component';
import { DialogsTypes } from '@shared/dialogs-types';
import { SecurityAccess } from '@shared/securityAccess';
import { PageEvent } from '@angular/material/paginator';
import { TreeEvent } from '@models/Tree/TreeEvent';
import { MarcaService } from '@services/marca/marca.service';
import { MonedaService } from '@services/moneda/moneda.service';
import { RequestBase } from '@models/RequestBase';
import { Marca } from '@models/Marca/Marca';
import { Moneda } from '@models/Moneda/Moneda';
import { InputDinamico } from '@models/FormDinamico/InputDinamico';
import { StockInput } from '@shared/enums/StockInput.enum';
import { NovedadInput } from '@shared/enums/NovedadInput.enum';
import { OfertaInput } from '@shared/enums/OfertaInput.enum';
import { SuspendidoInput } from '@shared/enums/SuspendidoInput.enum';
import { CodigoInput } from '@shared/enums/CodigoInput.enum';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss'],
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
export class ProductoListComponent implements OnInit {
  columnasTabla: string[] = [
    'codigo',
    'descripcion',
    'ubicacion',
    'stockActual',
    'precio1',
    'precio2',
    'costo',
    'ultiPrecio',
    'ultiVenta',
  ];

  listaInputs1: string[] = [
    'Proveedor',
    'Detalle',
    'Codigo',
    'Deposito',
    'Marca',
    'Moneda',
  ];

  listaInputsParaMostrar1: string[] = [
    'Proveedor',
    'Detalle',
    'Codigo',
    'Deposito',
  ];

  listaInputs: InputDinamico[] = [
    new InputDinamico({
      descripcion: 'Codigo',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({
      descripcion: 'Proveedor',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({
      descripcion: 'Detalle',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({
      descripcion: 'Deposito',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({ descripcion: 'Marca' }),
    new InputDinamico({ descripcion: 'Moneda' }),
    new InputDinamico({ descripcion: 'Stock' }),
    new InputDinamico({ descripcion: 'Novedad' }),
    new InputDinamico({ descripcion: 'Oferta' }),
    new InputDinamico({ descripcion: 'Suspendido' }),
  ];

  listaInputsParaMostrar: InputDinamico[] = [
    new InputDinamico({
      descripcion: 'Codigo',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({
      descripcion: 'Proveedor',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({
      descripcion: 'Detalle',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({
      descripcion: 'Deposito',
      checked: true,
      isDefault: true,
    }),
  ];

  stockInput: InputDinamico[] = [
    new InputDinamico({ descripcion: StockInput[0] }),
    new InputDinamico({ descripcion: StockInput[1] }),
    new InputDinamico({ descripcion: StockInput[2] }),
    new InputDinamico({ descripcion: StockInput[3] }),
  ];

  novedadInput: InputDinamico[] = [
    new InputDinamico({ descripcion: NovedadInput[0] }),
    new InputDinamico({ descripcion: NovedadInput[1] }),
  ];

  ofertaInput: InputDinamico[] = [
    new InputDinamico({ descripcion: OfertaInput[0] }),
    new InputDinamico({ descripcion: OfertaInput[1] }),
  ];

  suspendidoInput: InputDinamico[] = [
    new InputDinamico({ descripcion: SuspendidoInput[0] }),
    new InputDinamico({ descripcion: SuspendidoInput[1] }),
  ];

  codigoInput: InputDinamico[] = [
    new InputDinamico({ descripcion: CodigoInput[0] }),
    new InputDinamico({ descripcion: CodigoInput[1] }),
    new InputDinamico({ descripcion: CodigoInput[2] }),
  ];

  cargando = true;
  expandedElement = true;
  depositos: Deposito[];
  proveedores: Proveedor[];
  proveedoresDb: Proveedor[];
  marcas: Marca[];
  monedas: Moneda[];
  dataSource: Producto[] = [];
  depositoSelected: number;
  proveedorSelected: number;
  marcaSelected: number;
  monedaSelected: number;
  novedadSelected: number;
  ofertaSelected: number;
  codigoSelected: number = 0;
  suspendidoSelected: number;
  stockSelected: number;
  codigoFormControl = new FormControl('');
  detalleFormControl = new FormControl('');
  proveedorFormControl = new FormControl('');
  allowed: boolean;
  totalPages: number;
  totalRows: number;
  page: number = 0;
  pageSize: number = 100;
  codigoForm: string;
  errorEnServicios: boolean;
  incluirVariantes: boolean = false;

  public bankFilterCtrl: FormControl = new FormControl();

  constructor(
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private depositoService: DepositoService,
    private modalService: ModalService,
    private marcaService: MarcaService,
    private monedaService: MonedaService,
    private dialog: MatDialog,
    public securityAccess: SecurityAccess,
    private UserService: UserService
  ) {}

  ngOnInit() {
    /*Seguridad*/
    // this.allowed = this.securityAccess.validateAccess(
    //   'MANPRODU',
    //   'ver productos'
    // );

    // if (!this.allowed) {
    //   return;
    // }

    this.allowed = true;
    var requestProveedor = new ProveedorRequest({ database: null });

    var requestDeposito = new DepositoRequest({ database: null });

    this.depositoService.obtenerDepositos(requestDeposito).subscribe(
      (x) => {
        this.depositos = x.Depositos;
      },
      () => (this.cargando = false)
    );

    this.marcaService.obtener(new RequestBase({ database: null })).subscribe(
      (x) => (this.marcas = x.Data),
      () => (this.cargando = false)
    );

    this.monedaService.obtener(new RequestBase({ database: null })).subscribe(
      (x) => (this.monedas = x.Data),
      () => (this.cargando = false)
    );

    this.proveedorService.obtenerProveedores(requestProveedor).subscribe(
      (x) => {
        this.proveedores = x.Proveedores;
        this.proveedoresDb = x.Proveedores;
      },
      () => (this.cargando = false)
    );

    this.obtenerProductosPorFiltros();

    this.bankFilterCtrl.valueChanges.subscribe(
      () => {
        this.search();
      },
      () => (this.cargando = false)
    );
  }

  lista_Event(tipoInput: InputDinamico) {
    const existe = this.listaInputsParaMostrar.find(
      (x) => x.descripcion === tipoInput.descripcion
    );

    if (existe) {
      const index = this.listaInputsParaMostrar.findIndex(
        (x) => x.descripcion === tipoInput.descripcion
      );
      this.listaInputsParaMostrar.splice(index, 1);
    } else {
      this.listaInputsParaMostrar.push(tipoInput);
    }
  }

  incluirVariante_Change() {
    this.page = this.page - 1;

    this.obtenerProductosPorFiltros();
  }

  buscar(treeEvent: TreeEvent = null) {

    this.page = 0;
    this.errorEnServicios = false;
    this.obtenerProductosPorFiltros(null, treeEvent);
  }

  openDialog(producto: Producto, tipoDialog: string) {
    {
      const dialogTypes = new DialogsTypes();
      const dialog = dialogTypes.types.find(
        (x) => x.description === tipoDialog
      );

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
            this.page = this.page - 1;

            this.obtenerProductosPorFiltros();
          }
        });
    }
  }

  search() {
    let search = this.bankFilterCtrl.value.toLowerCase();

    if (!search) {
      this.proveedores = this.proveedoresDb;
      return;
    }

    this.proveedores = this.proveedoresDb.filter((x) =>
      x.Nombre.toLowerCase().startsWith(search)
    );
  }

  delete(data: Producto) {
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
            this.page = this.page - 1;
            this.obtenerProductosPorFiltros();
          });
      }
    });
  }

  pagesChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;

    this.obtenerProductosPorFiltros();
  }

  private deleteDialogConfirm(data: Producto) {
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

  private obtenerProductosPorFiltros(
    database: string = null,
    treeEvent: TreeEvent = null
  ) {
    this.dataSource = [];
    this.cargando = true;
    var codigoCustom = this.removeSign(this.codigoFormControl.value);
    this.codigoFormControl.setValue(codigoCustom);
    var request = new ProductoRequest({
      codigo:
        this.codigoSelected == 0 && this.codigoFormControl.value
          ? codigoCustom
          : null,
      codigoBarra:
        this.codigoSelected == 1 && this.codigoFormControl.value
          ? codigoCustom
          : null,
      codigoProveedor:
        this.codigoSelected == 2 && this.codigoFormControl.value
          ? codigoCustom
          : null,
      CodigoGlobal:null,
      bajoControlStock: this.obtenerControlStockValor(),
      stockPositivo: this.obtenerStockPositivoValor(),
      excluirNovedades: this.obtenerNovedadesValor(),
      enOferta: this.obtenerOfertaValor(),
      suspendido: this.obtenerSuspendidoValor(),
      detalle: this.detalleFormControl.value ?? null,
      idProveedor: this.proveedorSelected ?? null,
      idDeposito: this.depositoSelected ?? null,
      codigoMarca: this.marcaSelected ?? null,
      codigoMoneda: this.monedaSelected ?? null,
      page: this.page + 1,
      pageSize: this.pageSize,
      database,
      idGrupo: treeEvent && treeEvent.idGrupo ? treeEvent.idGrupo : null,
      idRubro: treeEvent && treeEvent.idRubro ? treeEvent.idRubro : null,
      idSubrubro:
        treeEvent && treeEvent.idSubRubro ? treeEvent.idSubRubro : null,
      IncluirVariante: this.incluirVariantes,
    });

    this.productoService.getByFiltros(request).subscribe(
      (x) => {
        this.cargando = false;
        this.dataSource = x.Data.Productos;
        this.page = x.Data.CurrentPage;
        this.totalPages = x.Data.TotalPages;
        this.totalRows = x.Data.TotalRows;
        return;
      },
      (error) => {
        this.errorEnServicios = true;
        this.cargando = false;
      },
      () => (this.cargando = false)
    );
  }

  private obtenerControlStockValor() {
    if (
      this.stockSelected &&
      this.stockSelected === StockInput['Bajo Control Stock']
    ) {
      return true;
    } else if (
      this.stockSelected &&
      this.stockSelected === StockInput['Sin Control Stock']
    ) {
      return false;
    } else {
      return null;
    }
  }

  private obtenerStockPositivoValor() {
    if (this.stockSelected && this.stockSelected === StockInput.Positivo) {
      return true;
    } else if (
      this.stockSelected &&
      this.stockSelected === StockInput.Negativo
    ) {
      return false;
    } else {
      return null;
    }
  }

  private obtenerNovedadesValor() {
    if (
      this.novedadSelected &&
      this.novedadSelected === NovedadInput['Excluir Novedades']
    ) {
      return true;
    } else if (this.novedadSelected === NovedadInput['Solo Novedades']) {
      return false;
    } else {
      return null;
    }
  }

  private obtenerOfertaValor() {
    if (
      this.ofertaSelected &&
      this.ofertaSelected === OfertaInput['En Oferta']
    ) {
      return true;
    } else if (this.ofertaSelected === OfertaInput['Sin Oferta']) {
      return false;
    } else {
      return null;
    }
  }

  private obtenerSuspendidoValor() {
    if (
      this.suspendidoSelected &&
      this.suspendidoSelected === SuspendidoInput.Suspendidos
    ) {
      return true;
    } else if (this.suspendidoSelected === SuspendidoInput['No suspendidos']) {
      return false;
    } else {
      return null;
    }
  }

  private removeSign(codigo: string) {
    const sign = this.UserService.getUserValue().prefiScan;

    if (codigo[0] == sign) {
      return codigo.substring(1);
    }

    return codigo;
  }
}
