"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SeleccionProductosComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var rxjs_1 = require("rxjs");
var DepositoRequest_1 = require("src/app/models/Deposito/DepositoRequest");
var Producto_1 = require("src/app/models/Producto/Producto");
var ProveedorRequest_1 = require("src/app/models/Proveedor/ProveedorRequest");
var RequestBase_1 = require("src/app/models/RequestBase");
var SeleccionProductoRequest_1 = require("src/app/models/SeleccionProducto/SeleccionProductoRequest");
var dialogs_types_1 = require("src/app/shared/dialogs-types");
var agregar_producto_dialog_component_1 = require("../agregar-producto-dialog/agregar-producto-dialog.component");
var confirmation_dialog_component_1 = require("../confirmation.dialog/confirmation.dialog.component");
var ProductoRequest_1 = require("src/app/models/Producto/ProductoRequest");
var AgregarProducto_1 = require("src/app/models/Producto/AgregarProducto");
var MovimientoDepositoAgregar_1 = require("src/app/models/MovimientoDepositos/MovimientoDepositoAgregar");
var SeleccionProductosComponent = /** @class */ (function () {
    function SeleccionProductosComponent(familiaService, marcaService, proveedorService, depositoService, seleccionProductoService, dialog, modalService, securityAccess, productoService, nuevoMovimientoService) {
        var _this = this;
        this.familiaService = familiaService;
        this.marcaService = marcaService;
        this.proveedorService = proveedorService;
        this.depositoService = depositoService;
        this.seleccionProductoService = seleccionProductoService;
        this.dialog = dialog;
        this.modalService = modalService;
        this.securityAccess = securityAccess;
        this.productoService = productoService;
        this.nuevoMovimientoService = nuevoMovimientoService;
        this.detalleFormControl = new forms_1.FormControl('');
        this.codigoFormControl = new forms_1.FormControl('');
        this.depositoSelected = 1;
        this.subRubros = [];
        this.subRubrosDb = [];
        this.marcas = [];
        this.proveedores = [];
        this.proveedoresDb = [];
        this.depositos = [];
        this.productosConStrock = false;
        this.expandedElement = true;
        this.proveedorFilterCtrl = new forms_1.FormControl();
        this.subRubroFilterCtrl = new forms_1.FormControl();
        this.displayedColumns = [
            'codigo',
            'detalle',
            'marca',
            'lista1',
            'stock',
            'agregar',
        ];
        this.seleccionProducto = [];
        this.loadData();
        this.proveedorFilterCtrl.valueChanges.subscribe(function () {
            _this.searchProveedores();
        });
        this.subRubroFilterCtrl.valueChanges.subscribe(function () {
            _this.searchSubRubros();
        });
    }
    SeleccionProductosComponent.prototype.ngOnInit = function () { };
    SeleccionProductosComponent.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var familiaRequest, marcaRequest, depositoRequest, proveedorRequest, familiaService, marcaService, depositoService, proveedorService, resultServices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        familiaRequest = new RequestBase_1.RequestBase();
                        marcaRequest = new RequestBase_1.RequestBase();
                        depositoRequest = new DepositoRequest_1.DepositoRequest();
                        proveedorRequest = new ProveedorRequest_1.ProveedorRequest();
                        familiaService = this.familiaService.obtener(familiaRequest);
                        marcaService = this.marcaService.obtener(marcaRequest);
                        depositoService = this.depositoService.obtenerDepositos(depositoRequest);
                        proveedorService = this.proveedorService.obtenerProveedores(proveedorRequest);
                        return [4 /*yield*/, rxjs_1.forkJoin({
                                familiaService: familiaService,
                                marcaService: marcaService,
                                depositoService: depositoService,
                                proveedorService: proveedorService
                            }).toPromise()];
                    case 1:
                        resultServices = _a.sent();
                        this.subRubros = resultServices.familiaService.Data;
                        this.subRubrosDb = resultServices.familiaService.Data;
                        this.marcas = resultServices.marcaService.Data;
                        this.proveedores = resultServices.proveedorService.Proveedores;
                        this.proveedoresDb = resultServices.proveedorService.Proveedores;
                        this.depositos = resultServices.depositoService.Depositos;
                        return [2 /*return*/];
                }
            });
        });
    };
    SeleccionProductosComponent.prototype.buscar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request, serviceResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new SeleccionProductoRequest_1.SeleccionProductoRequest({
                            numeroDeposito: this.depositoSelected,
                            familia: this.subRubroSelected,
                            idProveedor: this.proveedorSelected,
                            numeroMarca: this.marcaSelected,
                            codigo: this.codigoFormControl.value,
                            detalle: this.detalleFormControl.value,
                            conStock: this.productosConStrock
                        });
                        return [4 /*yield*/, this.seleccionProductoService
                                .obtener(request)
                                .toPromise()];
                    case 1:
                        serviceResponse = _a.sent();
                        this.seleccionProducto = serviceResponse.Data;
                        return [2 /*return*/];
                }
            });
        });
    };
    SeleccionProductosComponent.prototype.searchProveedores = function () {
        var search = this.proveedorFilterCtrl.value.toLowerCase();
        if (!search) {
            this.proveedores = this.proveedoresDb;
            return;
        }
        this.proveedores = this.proveedoresDb.filter(function (x) {
            return x.Nombre.toLowerCase().startsWith(search);
        });
    };
    SeleccionProductosComponent.prototype.searchSubRubros = function () {
        var search = this.subRubroFilterCtrl.value.toLowerCase();
        if (!search) {
            this.subRubros = this.subRubrosDb;
            return;
        }
        this.subRubros = this.subRubrosDb.filter(function (x) {
            return x.NombreFamilia.toLowerCase().startsWith(search);
        });
    };
    SeleccionProductosComponent.prototype.addProducto = function (seleccionProducto) {
        var _this = this;
        var agregarProducto = new AgregarProducto_1.AgregarProducto({
            descripcion: seleccionProducto.Detalle,
            precio: seleccionProducto.ListaX,
            litros: seleccionProducto.Litros
        });
        this.dialog
            .open(agregar_producto_dialog_component_1.AgregarProductoDialogComponent, {
            disableClose: true,
            data: { agregarProducto: agregarProducto }
        })
            .afterClosed()
            .subscribe(function (cantidad) {
            if (!cantidad)
                return;
            var movimiento = new MovimientoDepositoAgregar_1.MovimientoDepositoAgregar({
                Cantidad: cantidad,
                Codigo: seleccionProducto.Codigo,
                Descripcion: seleccionProducto.Detalle,
                CpInterno: seleccionProducto.CpInterno,
                IdVariante: seleccionProducto.IdVariante
            });
            _this.nuevoMovimientoService.changeValue(movimiento);
        });
    };
    SeleccionProductosComponent.prototype.openDialog = function (seleccionProducto, tipoDialog) {
        var _this = this;
        {
            var dialogTypes = new dialogs_types_1.DialogsTypes();
            var dialog = dialogTypes.types.find(function (x) { return x.description === tipoDialog; });
            var producto = new Producto_1.Producto({
                CpInterno: seleccionProducto.CpInterno,
                Detalle: seleccionProducto.Detalle,
                Deposito: this.depositoSelected,
                IdVariante: seleccionProducto.IdVariante
            });
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
                    _this.buscar();
                }
            });
        }
    };
    SeleccionProductosComponent.prototype["delete"] = function (data) {
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
                    _this.buscar();
                });
            }
        });
    };
    SeleccionProductosComponent.prototype.deleteDialogConfirm = function (data) {
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
    SeleccionProductosComponent = __decorate([
        core_1.Component({
            selector: 'app-seleccion-productos',
            templateUrl: './seleccion-productos.component.html',
            styleUrls: ['./seleccion-productos.component.scss'],
            animations: [
                animations_1.trigger('detailExpand1', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], SeleccionProductosComponent);
    return SeleccionProductosComponent;
}());
exports.SeleccionProductosComponent = SeleccionProductosComponent;
