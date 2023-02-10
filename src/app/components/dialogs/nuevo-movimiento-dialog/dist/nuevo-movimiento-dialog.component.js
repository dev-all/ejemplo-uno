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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.NuevoMovimientoDialogComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var rxjs_1 = require("rxjs");
var DepositoRequest_1 = require("src/app/models/Deposito/DepositoRequest");
var EstadoMovimientoDeposito_1 = require("src/app/models/MovimientoDepositos/EstadoMovimientoDeposito");
var MovimientoDepositoAgregar_1 = require("src/app/models/MovimientoDepositos/MovimientoDepositoAgregar");
var MovimientoDepositos_1 = require("src/app/models/MovimientoDepositos/MovimientoDepositos");
var StockActualRequest_1 = require("src/app/models/Stock/StockActualRequest");
var confirmation_dialog_component_1 = require("../confirmation.dialog/confirmation.dialog.component");
var seleccion_productos_component_1 = require("../seleccion-productos/seleccion-productos.component");
var Registro_1 = require("../../../models/Registro/Registro");
var CrearMovimientoDeposito_1 = require("src/app/models/MovimientoDepositos/CrearMovimientoDeposito");
var agregar_mercaderia_dialog_component_1 = require("../agregar-mercaderia-dialog/agregar-mercaderia-dialog/agregar-mercaderia-dialog.component");
var NuevoMovimientoDialogComponent = /** @class */ (function () {
    function NuevoMovimientoDialogComponent(depositoService, dialog, nuevoMovimientoService, stockService, userService, movimientoService, dialogRef, snakBarService) {
        this.depositoService = depositoService;
        this.dialog = dialog;
        this.nuevoMovimientoService = nuevoMovimientoService;
        this.stockService = stockService;
        this.userService = userService;
        this.movimientoService = movimientoService;
        this.dialogRef = dialogRef;
        this.snakBarService = snakBarService;
        this.detalleFormControl = new forms_1.FormControl('');
        this.depositoDesdeSelected = 1;
        this.depositoHastaSelected = 2;
        this.estadoSelected = 3;
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
        this.loadData();
    }
    NuevoMovimientoDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nuevoMovimeintoSubscription = this.nuevoMovimientoService
            .onChange()
            .subscribe(function (value) { return _this.nuevoMovimiento_Change(value); });
    };
    NuevoMovimientoDialogComponent.prototype.ngOnDestroy = function () {
        this.nuevoMovimeintoSubscription.unsubscribe();
        this.nuevoMovimientoService.resetValues();
    };
    NuevoMovimientoDialogComponent.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var depositoRequest, depositoResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        depositoRequest = new DepositoRequest_1.DepositoRequest();
                        return [4 /*yield*/, this.depositoService
                                .obtenerDepositos(depositoRequest)
                                .toPromise()];
                    case 1:
                        depositoResponse = _a.sent();
                        this.depositos = depositoResponse.Depositos;
                        return [2 /*return*/];
                }
            });
        });
    };
    NuevoMovimientoDialogComponent.prototype.aceptar_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usuarioId, fechaActual;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usuarioId = this.userService.getUserValue().Id;
                        fechaActual = new Date();
                        return [4 /*yield*/, Promise.all(this.movimientoDepositoGrid.map(function (movimiento) { return __awaiter(_this, void 0, void 0, function () {
                                var movimiendoDeposito, registro, request;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            movimiendoDeposito = new MovimientoDepositos_1.MovimientoDeposito({
                                                Fecha: fechaActual,
                                                Detalle: this.detalleFormControl.value,
                                                DepositoOrigen: this.depositoDesdeSelected,
                                                DepositoDestino: this.depositoHastaSelected,
                                                Estado: this.estadoSelected,
                                                Usuario: usuarioId.toString()
                                            });
                                            registro = new Registro_1.Registro({
                                                Cantidad: movimiento.Cantidad,
                                                Tipo: 3,
                                                Descripcion: movimiento.Descripcion,
                                                CpInterno: movimiento.CpInterno,
                                                Vendedor: usuarioId,
                                                Horario: fechaActual,
                                                MovimientoOrigen: this.depositoDesdeSelected,
                                                MovimientoDestino: this.depositoHastaSelected,
                                                Deposito: 0,
                                                idVariante: 0
                                            });
                                            request = new CrearMovimientoDeposito_1.CrearMovimientoDeposito({
                                                movimiento: movimiendoDeposito,
                                                registro: registro
                                            });
                                            return [4 /*yield*/, this.movimientoService
                                                    .insertarMovimientoDeposito(request)
                                                    .toPromise()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        this.snakBarService.showSnackBar('Movimientos agregados exitosamente');
                        this.dialogRef.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    NuevoMovimientoDialogComponent.prototype.agregar_Click = function () {
        this.dialog.open(seleccion_productos_component_1.SeleccionProductosComponent, {
            width: '1000px'
        });
    };
    NuevoMovimientoDialogComponent.prototype.deposito_Change = function () {
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
    NuevoMovimientoDialogComponent.prototype.verificarStock_Click = function () {
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
    NuevoMovimientoDialogComponent.prototype.calcularMercaderia_Click = function () {
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
    NuevoMovimientoDialogComponent.prototype.agregarMercaderia = function (mercaderias) {
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
    NuevoMovimientoDialogComponent.prototype.nuevoMovimiento_Change = function (nuevoMovimiento) {
        return __awaiter(this, void 0, void 0, function () {
            var newArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!nuevoMovimiento) return [3 /*break*/, 2];
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
    NuevoMovimientoDialogComponent.prototype.quitar_Click = function (cpInterno) {
        var _this = this;
        var dialogConfig = this.deleteDialogConfirm('¿Desea eliminar?');
        var dialogRef = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (responseDialog) {
            if (responseDialog === 'Confirm') {
                _this.eliminarMovimiento(cpInterno);
            }
        });
    };
    NuevoMovimientoDialogComponent.prototype.verificarStock = function (movimiento) {
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
    NuevoMovimientoDialogComponent.prototype.eliminarMovimiento = function (cpInterno) {
        var movimiendo = this.movimientoDepositoGrid.find(function (x) { return x.CpInterno === cpInterno; });
        if (movimiendo) {
            this.movimientoDepositoGrid = this.movimientoDepositoGrid.filter(function (x) { return x.CpInterno !== cpInterno; });
        }
    };
    NuevoMovimientoDialogComponent.prototype.deleteDialogConfirm = function (message) {
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
    NuevoMovimientoDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-nuevo-movimiento-dialog',
            templateUrl: './nuevo-movimiento-dialog.component.html',
            styleUrls: ['./nuevo-movimiento-dialog.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], NuevoMovimientoDialogComponent);
    return NuevoMovimientoDialogComponent;
}());
exports.NuevoMovimientoDialogComponent = NuevoMovimientoDialogComponent;
