"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ModificarMovimientoDialogComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var rxjs_1 = require("rxjs");
var DepositoRequest_1 = require("src/app/models/Deposito/DepositoRequest");
var EstadoMovimientoDeposito_1 = require("src/app/models/MovimientoDepositos/EstadoMovimientoDeposito");
var ModificarMovimientoDepositoRequest_1 = require("src/app/models/MovimientoDepositos/ModificarMovimientoDepositoRequest");
var MovimientoDepositoAgregar_1 = require("src/app/models/MovimientoDepositos/MovimientoDepositoAgregar");
var MovimientoDepositoRequest_1 = require("src/app/models/MovimientoDepositos/MovimientoDepositoRequest");
var MovimientoDepositos_1 = require("src/app/models/MovimientoDepositos/MovimientoDepositos");
var TipoMovimientoDeposito_enum_1 = require("src/app/models/MovimientoDepositos/TipoMovimientoDeposito.enum");
var Registro_1 = require("src/app/models/Registro/Registro");
var RegistroRequest_1 = require("src/app/models/Registro/RegistroRequest");
var StockActualRequest_1 = require("src/app/models/Stock/StockActualRequest");
var agregar_mercaderia_dialog_component_1 = require("../agregar-mercaderia-dialog/agregar-mercaderia-dialog/agregar-mercaderia-dialog.component");
var confirmation_dialog_component_1 = require("../confirmation.dialog/confirmation.dialog.component");
var seleccion_productos_component_1 = require("../seleccion-productos/seleccion-productos.component");
var ModificarMovimientoDialogComponent = /** @class */ (function () {
    function ModificarMovimientoDialogComponent(data, depositoService, dialog, nuevoMovimientoService, stockService, userService, movimientoService, dialogRef, snakBarService, registroService) {
        this.data = data;
        this.depositoService = depositoService;
        this.dialog = dialog;
        this.nuevoMovimientoService = nuevoMovimientoService;
        this.stockService = stockService;
        this.userService = userService;
        this.movimientoService = movimientoService;
        this.dialogRef = dialogRef;
        this.snakBarService = snakBarService;
        this.registroService = registroService;
        this.detalleFormControl = new forms_1.FormControl('');
        this.expandedElement = true;
        this.depositos = [];
        this.estados = [
            new EstadoMovimientoDeposito_1.EstadoMovimientoDeposito({ id: 3, descripcion: 'ACTIVO' }),
            new EstadoMovimientoDeposito_1.EstadoMovimientoDeposito({ id: 4, descripcion: 'PROCESO' }),
        ];
        this.displayedColumns = [
            'cantidad',
            'codigo',
            'descripcion',
            'stockOrigen',
            'stockDestino',
        ];
        this.movimientoDepositoGrid = [];
        this.movimientosEliminar = [];
        this.loadData();
    }
    ModificarMovimientoDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nuevoMovimeintoSubscription = this.nuevoMovimientoService
            .onChange()
            .subscribe(function (value) { return _this.nuevoMovimiento_Change(value); });
    };
    ModificarMovimientoDialogComponent.prototype.ngOnDestroy = function () {
        this.nuevoMovimeintoSubscription.unsubscribe();
        this.nuevoMovimientoService.resetValues();
    };
    ModificarMovimientoDialogComponent.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var depositoRequest, depositoPromise, registroRequest, registroPromise, movimiendoRequest, movimientoPromise;
            var _this = this;
            return __generator(this, function (_a) {
                depositoRequest = new DepositoRequest_1.DepositoRequest();
                depositoPromise = this.depositoService.obtenerDepositos(depositoRequest);
                registroRequest = new RegistroRequest_1.RegistroRequest({
                    idMovimiento: this.data.idMovimiento
                });
                registroPromise = this.registroService
                    .getByIdMovimiento(registroRequest)
                    .toPromise();
                movimiendoRequest = new MovimientoDepositoRequest_1.MovimientoDepositoRequest({
                    idMovimiento: this.data.idMovimiento
                });
                movimientoPromise = this.movimientoService.getMovimientoEntreDeposito(movimiendoRequest);
                rxjs_1.forkJoin({ depositoPromise: depositoPromise, registroPromise: registroPromise, movimientoPromise: movimientoPromise }).subscribe(function (res) {
                    _this.depositos = res.depositoPromise.Depositos;
                    _this.registros = res.registroPromise.Data;
                    _this.movimiento = res.movimientoPromise.Data[0];
                    _this.detalleFormControl.setValue(_this.movimiento.Detalle);
                    _this.depositoDesdeSelected = _this.movimiento.DepositoOrigen;
                    _this.depositoHastaSelected = _this.movimiento.DepositoDestino;
                    _this.estadoSelected = _this.movimiento.Estado;
                    res.registroPromise.Data.forEach(function (registro) {
                        var movimiento = new MovimientoDepositoAgregar_1.MovimientoDepositoAgregar({
                            Cantidad: registro.Cantidad,
                            Codigo: registro.Id.toString(),
                            Descripcion: registro.Descripcion,
                            CpInterno: registro.CpInterno,
                            IdVariante: registro.idVariante,
                            tipoMovimiento: TipoMovimientoDeposito_enum_1.TipoMovimientoDeposito.modificar,
                            idMovimiento: registro.IdMovimiento
                        });
                        var newArray = new (Array.bind.apply(Array, __spreadArrays([void 0], _this.movimientoDepositoGrid)))();
                        newArray.push(movimiento);
                        _this.movimientoDepositoGrid = newArray;
                    });
                    _this.verificarStock_Click();
                });
                return [2 /*return*/];
            });
        });
    };
    ModificarMovimientoDialogComponent.prototype.aceptar_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usuarioId, fechaActual, registrosInsertar, registrosModificar, registrosEliminar, movimientoDeposito, request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usuarioId = this.userService.getUserValue().Id;
                        fechaActual = new Date();
                        registrosInsertar = new Array();
                        registrosModificar = new Array();
                        registrosEliminar = new Array();
                        this.movimientoDepositoGrid.map(function (movimiento) {
                            if (movimiento.tipoMovimiento === TipoMovimientoDeposito_enum_1.TipoMovimientoDeposito.insertar) {
                                registrosInsertar.push(_this.MapRegistro(movimiento));
                            }
                            if (movimiento.tipoMovimiento === TipoMovimientoDeposito_enum_1.TipoMovimientoDeposito.modificar) {
                                registrosModificar.push(_this.MapRegistro(movimiento));
                            }
                        });
                        this.movimientosEliminar.map(function (numero) {
                            var registro = new Registro_1.Registro({
                                Id: numero
                            });
                            registrosModificar = registrosModificar.filter(function (registro) { return registro.Id !== numero; });
                            registrosEliminar.push(registro);
                        });
                        movimientoDeposito = new MovimientoDepositos_1.MovimientoDeposito({
                            Id: this.data.idMovimiento,
                            Fecha: fechaActual,
                            Detalle: this.detalleFormControl.value,
                            DepositoOrigen: this.depositoDesdeSelected,
                            DepositoDestino: this.depositoHastaSelected,
                            Estado: this.estadoSelected,
                            Usuario: usuarioId.toString()
                        });
                        request = new ModificarMovimientoDepositoRequest_1.ModificarMovimientoDepositoRequest({
                            registrosInsertar: registrosInsertar,
                            registrosModificar: registrosModificar,
                            registrosEliminar: registrosEliminar,
                            movimientoDeposito: movimientoDeposito
                        });
                        console.log(request);
                        return [4 /*yield*/, this.movimientoService
                                .modificarMovimientoDeposito(request)
                                .toPromise()];
                    case 1:
                        _a.sent();
                        this.snakBarService.showSnackBar('Movimientos modificado exitosamente');
                        this.dialogRef.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModificarMovimientoDialogComponent.prototype.agregar_Click = function () {
        this.dialog.open(seleccion_productos_component_1.SeleccionProductosComponent, {
            width: '1000px'
        });
    };
    ModificarMovimientoDialogComponent.prototype.deposito_Change = function () {
        var _this = this;
        this.movimientoDepositoGrid.forEach(function (movimiento) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verificarStock(movimiento)];
                    case 1:
                        movimiento = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ModificarMovimientoDialogComponent.prototype.quitar_Click = function (cpInterno) {
        var _this = this;
        var dialogConfig = this.deleteDialogConfirm('¿Desea eliminar?');
        var dialogRef = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (responseDialog) {
            if (responseDialog === 'Confirm') {
                _this.eliminarMovimiento(cpInterno);
            }
        });
    };
    ModificarMovimientoDialogComponent.prototype.verificarStock_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.movimientoDepositoGrid.forEach(function (movimiento) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.verificarStock(movimiento)];
                            case 1:
                                movimiento = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ModificarMovimientoDialogComponent.prototype.calcularMercaderia_Click = function () {
        var _this = this;
        this.dialog
            .open(agregar_mercaderia_dialog_component_1.AgregarMercaderiaDialogComponent, {
            width: '500px',
            data: { idDeposito: this.depositoHastaSelected }
        })
            .afterClosed()
            .subscribe(function (mercaderias) {
            if (mercaderias.length > 0)
                _this.agregarMercaderia(mercaderias);
        });
    };
    ModificarMovimientoDialogComponent.prototype.agregarMercaderia = function (mercaderias) {
        var _this = this;
        mercaderias.forEach(function (mercaderia) { return __awaiter(_this, void 0, void 0, function () {
            var nuevoMovimiento;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nuevoMovimiento = new MovimientoDepositoAgregar_1.MovimientoDepositoAgregar({
                            Cantidad: mercaderia.Cantidad,
                            Codigo: mercaderia.Codigo,
                            Descripcion: mercaderia.PreDetalle,
                            CpInterno: mercaderia.CpInterno
                        });
                        return [4 /*yield*/, this.nuevoMovimiento_Change(nuevoMovimiento)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ModificarMovimientoDialogComponent.prototype.nuevoMovimiento_Change = function (nuevoMovimiento) {
        return __awaiter(this, void 0, void 0, function () {
            var newArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!nuevoMovimiento) return [3 /*break*/, 2];
                        nuevoMovimiento.tipoMovimiento = TipoMovimientoDeposito_enum_1.TipoMovimientoDeposito.insertar;
                        newArray = new (Array.bind.apply(Array, __spreadArrays([void 0], this.movimientoDepositoGrid)))();
                        return [4 /*yield*/, this.verificarStock(nuevoMovimiento)];
                    case 1:
                        nuevoMovimiento = _a.sent();
                        newArray.push(nuevoMovimiento);
                        this.movimientoDepositoGrid = newArray;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ModificarMovimientoDialogComponent.prototype.verificarStock = function (movimiento) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOrigen, requestDestino, stockActualOrigen, stockActualDestino, resultado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestOrigen = new StockActualRequest_1.StockActualRequest({
                            cpInterno: movimiento.CpInterno,
                            idDeposito: this.depositoDesdeSelected,
                            idVariante: movimiento.IdVariante
                        });
                        requestDestino = new StockActualRequest_1.StockActualRequest({
                            cpInterno: movimiento.CpInterno,
                            idDeposito: this.depositoHastaSelected,
                            idVariante: movimiento.IdVariante
                        });
                        stockActualOrigen = this.stockService.getStockActual(requestOrigen);
                        stockActualDestino = this.stockService.getStockActual(requestDestino);
                        return [4 /*yield*/, rxjs_1.forkJoin({
                                stockActualOrigen: stockActualOrigen,
                                stockActualDestino: stockActualDestino
                            }).toPromise()];
                    case 1:
                        resultado = _a.sent();
                        movimiento.StockOrigen = resultado.stockActualOrigen.Data;
                        movimiento.StockDestino = resultado.stockActualDestino.Data;
                        return [2 /*return*/, new MovimientoDepositoAgregar_1.MovimientoDepositoAgregar(movimiento)];
                }
            });
        });
    };
    ModificarMovimientoDialogComponent.prototype.eliminarMovimiento = function (cpInterno) {
        var movimiendo = this.movimientoDepositoGrid.find(function (x) { return x.CpInterno === cpInterno; });
        if (movimiendo) {
            this.movimientosEliminar.push(Number.parseInt(movimiendo.Codigo));
            this.movimientoDepositoGrid = this.movimientoDepositoGrid.filter(function (x) { return x.CpInterno !== cpInterno; });
        }
    };
    ModificarMovimientoDialogComponent.prototype.deleteDialogConfirm = function (message) {
        var title = message;
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
    ModificarMovimientoDialogComponent.prototype.MapRegistro = function (movimiento) {
        var usuarioId = this.userService.getUserValue().Id;
        var fechaActual = new Date();
        var registro = new Registro_1.Registro({
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
            idVariante: 0
        });
        return registro;
    };
    ModificarMovimientoDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-modificar-movimiento-dialog',
            templateUrl: './modificar-movimiento-dialog.component.html',
            styleUrls: ['./modificar-movimiento-dialog.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ModificarMovimientoDialogComponent);
    return ModificarMovimientoDialogComponent;
}());
exports.ModificarMovimientoDialogComponent = ModificarMovimientoDialogComponent;
