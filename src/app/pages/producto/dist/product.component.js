"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ProductoRequest_1 = require("src/app/models/Producto/ProductoRequest");
var animations_1 = require("@angular/animations");
var ProveedorRequest_1 = require("src/app/models/Proveedor/ProveedorRequest");
var DepositoRequest_1 = require("src/app/models/Deposito/DepositoRequest");
var dialog_1 = require("@angular/material/dialog");
var confirmation_dialog_component_1 = require("src/app/components/dialogs/confirmation.dialog/confirmation.dialog.component");
var dialogs_types_1 = require("src/app/shared/dialogs-types");
var RequestBase_1 = require("src/app/models/RequestBase");
var InputDinamico_1 = require("src/app/models/FormDinamico/InputDinamico");
var StockInput_enum_1 = require("src/app/shared/enums/StockInput.enum");
var NovedadInput_enum_1 = require("src/app/shared/enums/NovedadInput.enum");
var OfertaInput_enum_1 = require("src/app/shared/enums/OfertaInput.enum");
var SuspendidoInput_enum_1 = require("src/app/shared/enums/SuspendidoInput.enum");
var CodigoInput_enum_1 = require("src/app/shared/enums/CodigoInput.enum");
var ProductPage = /** @class */ (function () {
    function ProductPage(productoService, proveedorService, depositoService, modalService, marcaService, monedaService, dialog, securityAccess) {
        this.productoService = productoService;
        this.proveedorService = proveedorService;
        this.depositoService = depositoService;
        this.modalService = modalService;
        this.marcaService = marcaService;
        this.monedaService = monedaService;
        this.dialog = dialog;
        this.securityAccess = securityAccess;
        this.columnasTabla = [
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
        this.listaInputs1 = [
            'Proveedor',
            'Detalle',
            'Codigo',
            'Deposito',
            'Marca',
            'Moneda',
        ];
        this.listaInputsParaMostrar1 = [
            'Proveedor',
            'Detalle',
            'Codigo',
            'Deposito',
        ];
        this.listaInputs = [
            new InputDinamico_1.InputDinamico({
                descripcion: 'Codigo',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({
                descripcion: 'Proveedor',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({
                descripcion: 'Detalle',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({
                descripcion: 'Deposito',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Marca' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Moneda' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Stock' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Novedad' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Oferta' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Suspendido' }),
        ];
        this.listaInputsParaMostrar = [
            new InputDinamico_1.InputDinamico({
                descripcion: 'Codigo',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({
                descripcion: 'Proveedor',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({
                descripcion: 'Detalle',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({
                descripcion: 'Deposito',
                checked: true,
                isDefault: true
            }),
        ];
        this.stockInput = [
            new InputDinamico_1.InputDinamico({ descripcion: StockInput_enum_1.StockInput[0] }),
            new InputDinamico_1.InputDinamico({ descripcion: StockInput_enum_1.StockInput[1] }),
            new InputDinamico_1.InputDinamico({ descripcion: StockInput_enum_1.StockInput[2] }),
            new InputDinamico_1.InputDinamico({ descripcion: StockInput_enum_1.StockInput[3] }),
        ];
        this.novedadInput = [
            new InputDinamico_1.InputDinamico({ descripcion: NovedadInput_enum_1.NovedadInput[0] }),
            new InputDinamico_1.InputDinamico({ descripcion: NovedadInput_enum_1.NovedadInput[1] }),
        ];
        this.ofertaInput = [
            new InputDinamico_1.InputDinamico({ descripcion: OfertaInput_enum_1.OfertaInput[0] }),
            new InputDinamico_1.InputDinamico({ descripcion: OfertaInput_enum_1.OfertaInput[1] }),
        ];
        this.suspendidoInput = [
            new InputDinamico_1.InputDinamico({ descripcion: SuspendidoInput_enum_1.SuspendidoInput[0] }),
            new InputDinamico_1.InputDinamico({ descripcion: SuspendidoInput_enum_1.SuspendidoInput[1] }),
        ];
        this.codigoInput = [
            new InputDinamico_1.InputDinamico({ descripcion: CodigoInput_enum_1.CodigoInput[0] }),
            new InputDinamico_1.InputDinamico({ descripcion: CodigoInput_enum_1.CodigoInput[1] }),
            new InputDinamico_1.InputDinamico({ descripcion: CodigoInput_enum_1.CodigoInput[2] }),
        ];
        this.cargando = true;
        this.expandedElement = true;
        this.dataSource = [];
        this.codigoSelected = 0;
        this.codigoFormControl = new forms_1.FormControl('');
        this.detalleFormControl = new forms_1.FormControl('');
        this.proveedorFormControl = new forms_1.FormControl('');
        this.page = 0;
        this.pageSize = 100;
        this.incluirVariantes = false;
        this.bankFilterCtrl = new forms_1.FormControl();
    }
    ProductPage.prototype.ngOnInit = function () {
        /*Seguridad*/
        // this.allowed = this.securityAccess.validateAccess(
        //   'MANPRODU',
        //   'ver productos'
        // );
        var _this = this;
        // if (!this.allowed) {
        //   return;
        // }
        this.allowed = true;
        var requestProveedor = new ProveedorRequest_1.ProveedorRequest({ database: null });
        var requestDeposito = new DepositoRequest_1.DepositoRequest({ database: null });
        this.depositoService.obtenerDepositos(requestDeposito).subscribe(function (x) {
            _this.depositos = x.Depositos;
        }, function () { return (_this.cargando = false); });
        this.marcaService.obtener(new RequestBase_1.RequestBase({ database: null })).subscribe(function (x) { return (_this.marcas = x.Data); }, function () { return (_this.cargando = false); });
        this.monedaService.obtener(new RequestBase_1.RequestBase({ database: null })).subscribe(function (x) { return (_this.monedas = x.Data); }, function () { return (_this.cargando = false); });
        this.proveedorService.obtenerProveedores(requestProveedor).subscribe(function (x) {
            _this.proveedores = x.Proveedores;
            _this.proveedoresDb = x.Proveedores;
        }, function () { return (_this.cargando = false); });
        this.obtenerProductosPorFiltros();
        this.bankFilterCtrl.valueChanges.subscribe(function () {
            _this.search();
        }, function () { return (_this.cargando = false); });
    };
    ProductPage.prototype.lista_Event = function (tipoInput) {
        var existe = this.listaInputsParaMostrar.find(function (x) { return x.descripcion === tipoInput.descripcion; });
        if (existe) {
            var index = this.listaInputsParaMostrar.findIndex(function (x) { return x.descripcion === tipoInput.descripcion; });
            this.listaInputsParaMostrar.splice(index, 1);
        }
        else {
            this.listaInputsParaMostrar.push(tipoInput);
        }
    };
    ProductPage.prototype.incluirVariante_Change = function () {
        this.page = this.page - 1;
        this.obtenerProductosPorFiltros();
    };
    ProductPage.prototype.buscar = function (treeEvent) {
        if (treeEvent === void 0) { treeEvent = null; }
        this.page = 0;
        this.errorEnServicios = false;
        this.obtenerProductosPorFiltros(null, treeEvent);
    };
    ProductPage.prototype.openDialog = function (producto, tipoDialog) {
        var _this = this;
        {
            var dialogTypes = new dialogs_types_1.DialogsTypes();
            var dialog = dialogTypes.types.find(function (x) { return x.description === tipoDialog; });
            this.dialog
                .open(dialog.component, {
                data: {
                    producto: producto
                },
                width: dialog.width
            })
                .afterClosed()
                .subscribe(function () {
                if (_this.modalService.value()) {
                    _this.modalService.changeValue();
                    _this.page = _this.page - 1;
                    _this.obtenerProductosPorFiltros();
                }
            });
        }
    };
    ProductPage.prototype.search = function () {
        var search = this.bankFilterCtrl.value.toLowerCase();
        if (!search) {
            this.proveedores = this.proveedoresDb;
            return;
        }
        this.proveedores = this.proveedoresDb.filter(function (x) {
            return x.Nombre.toLowerCase().startsWith(search);
        });
    };
    ProductPage.prototype["delete"] = function (data) {
        var _this = this;
        if (!this.securityAccess.validateAccess('BORRAR_PRODUCTO')) {
            return;
        }
        var dialogConfig = this.deleteDialogConfirm(data);
        var dialogRef = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (responseDialog) {
            if (responseDialog === 'Confirm') {
                _this.productoService["delete"](new ProductoRequest_1.ProductoRequest({ cpInterno: data.CpInterno, database: null }))
                    .subscribe(function (response) {
                    _this.page = _this.page - 1;
                    _this.obtenerProductosPorFiltros();
                });
            }
        });
    };
    ProductPage.prototype.pagesChange = function (event) {
        this.pageSize = event.pageSize;
        this.page = event.pageIndex;
        this.obtenerProductosPorFiltros();
    };
    ProductPage.prototype.deleteDialogConfirm = function (data) {
        var title = "\u00BFDesea eliminar el producto: " + data.Detalle + " ?";
        var disableStoreDialogConfig = new dialog_1.MatDialogConfig();
        disableStoreDialogConfig.disableClose = false;
        disableStoreDialogConfig.autoFocus = true;
        disableStoreDialogConfig.data = {
            title: title,
            text: '',
            btnPrimaryText: 'Eliminar'
        };
        return disableStoreDialogConfig;
    };
    ProductPage.prototype.obtenerProductosPorFiltros = function (database, treeEvent) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        if (database === void 0) { database = null; }
        if (treeEvent === void 0) { treeEvent = null; }
        this.dataSource = [];
        this.cargando = true;
        var request = new ProductoRequest_1.ProductoRequest({
            codigo: this.codigoSelected == 0 && this.codigoFormControl.value
                ? this.codigoFormControl.value
                : null,
            codigoBarra: this.codigoSelected == 1 && this.codigoFormControl.value
                ? this.codigoFormControl.value
                : null,
            codigoProveedor: this.codigoSelected == 2 && this.codigoFormControl.value
                ? this.codigoFormControl.value
                : null,
            bajoControlStock: this.obtenerControlStockValor(),
            stockPositivo: this.obtenerStockPositivoValor(),
            excluirNovedades: this.obtenerNovedadesValor(),
            enOferta: this.obtenerOfertaValor(),
            suspendido: this.obtenerSuspendidoValor(),
            detalle: (_a = this.detalleFormControl.value) !== null && _a !== void 0 ? _a : null,
            idProveedor: (_b = this.proveedorSelected) !== null && _b !== void 0 ? _b : null,
            idDeposito: (_c = this.depositoSelected) !== null && _c !== void 0 ? _c : null,
            codigoMarca: (_d = this.marcaSelected) !== null && _d !== void 0 ? _d : null,
            codigoMoneda: (_e = this.monedaSelected) !== null && _e !== void 0 ? _e : null,
            page: this.page + 1,
            pageSize: this.pageSize,
            database: database,
            idGrupo: treeEvent && treeEvent.idGrupo ? treeEvent.idGrupo : null,
            idRubro: treeEvent && treeEvent.idRubro ? treeEvent.idRubro : null,
            idSubrubro: treeEvent && treeEvent.idSubRubro ? treeEvent.idSubRubro : null,
            IncluirVariante: this.incluirVariantes
        });
        this.productoService.getByFiltros(request).subscribe(function (x) {
            _this.cargando = false;
            _this.dataSource = x.Data.Productos;
            _this.page = x.Data.CurrentPage;
            _this.totalPages = x.Data.TotalPages;
            _this.totalRows = x.Data.TotalRows;
            return;
        }, function (error) {
            _this.errorEnServicios = true;
            _this.cargando = false;
        }, function () { return (_this.cargando = false); });
    };
    ProductPage.prototype.obtenerControlStockValor = function () {
        if (this.stockSelected &&
            this.stockSelected === StockInput_enum_1.StockInput['Bajo Control Stock']) {
            return true;
        }
        else if (this.stockSelected &&
            this.stockSelected === StockInput_enum_1.StockInput['Sin Control Stock']) {
            return false;
        }
        else {
            return null;
        }
    };
    ProductPage.prototype.obtenerStockPositivoValor = function () {
        if (this.stockSelected && this.stockSelected === StockInput_enum_1.StockInput.Positivo) {
            return true;
        }
        else if (this.stockSelected &&
            this.stockSelected === StockInput_enum_1.StockInput.Negativo) {
            return false;
        }
        else {
            return null;
        }
    };
    ProductPage.prototype.obtenerNovedadesValor = function () {
        if (this.novedadSelected &&
            this.novedadSelected === NovedadInput_enum_1.NovedadInput['Excluir Novedades']) {
            return true;
        }
        else if (this.novedadSelected === NovedadInput_enum_1.NovedadInput['Solo Novedades']) {
            return false;
        }
        else {
            return null;
        }
    };
    ProductPage.prototype.obtenerOfertaValor = function () {
        if (this.ofertaSelected &&
            this.ofertaSelected === OfertaInput_enum_1.OfertaInput['En Oferta']) {
            return true;
        }
        else if (this.ofertaSelected === OfertaInput_enum_1.OfertaInput['Sin Oferta']) {
            return false;
        }
        else {
            return null;
        }
    };
    ProductPage.prototype.obtenerSuspendidoValor = function () {
        if (this.suspendidoSelected &&
            this.suspendidoSelected === SuspendidoInput_enum_1.SuspendidoInput.Suspendidos) {
            return true;
        }
        else if (this.suspendidoSelected === SuspendidoInput_enum_1.SuspendidoInput['No suspendidos']) {
            return false;
        }
        else {
            return null;
        }
    };
    ProductPage = __decorate([
        core_1.Component({
            selector: 'app-producto',
            templateUrl: './producto.component.html',
            styleUrls: ['./producto.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], ProductPage);
    return ProductPage;
}());
exports.ProductPage = ProductPage;
