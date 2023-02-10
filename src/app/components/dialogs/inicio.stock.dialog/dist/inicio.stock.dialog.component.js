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
exports.__esModule = true;
exports.InicioStockDialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Deposito_1 = require("src/app/models/Deposito/Deposito");
var DepositoRequest_1 = require("src/app/models/Deposito/DepositoRequest");
var StockInicial_1 = require("src/app/models/Stock/StockInicial");
var StockRequest_1 = require("src/app/models/Stock/StockRequest");
var core_2 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var VarianteRequest_1 = require("src/app/models/Variante/VarianteRequest");
var message_dialog_component_1 = require("../message.dialog/message.dialog.component");
var InicioStockDialogComponent = /** @class */ (function () {
    function InicioStockDialogComponent(depositoSertive, stockService, varianteService, dialog, data) {
        var _this = this;
        this.depositoSertive = depositoSertive;
        this.stockService = stockService;
        this.varianteService = varianteService;
        this.dialog = dialog;
        this.data = data;
        this.spanUbicacion = true;
        this.cantidadFormControl = new forms_1.FormControl(0);
        this.stockMinimoFormControl = new forms_1.FormControl(0);
        this.stockMaximoFormControl = new forms_1.FormControl(0);
        this.ubicacionFormControl = new forms_1.FormControl('');
        this.displayedColumns = [
            'deposito',
            'stockActual',
            'minimo',
            'maximo',
            'ubicación',
            'variante',
        ];
        this.dialogData = this.data.producto;
        this.descripcionProducto = this.dialogData.Detalle;
        this.depositoSertive
            .obtenerDepositos(new DepositoRequest_1.DepositoRequest({ database: null }))
            .subscribe(function (respuesta) {
            _this.depositos = respuesta.Depositos;
        });
        var varianteRequest = new VarianteRequest_1.VarianteRequest({
            cpInterno: this.dialogData.CpInterno
        });
        this.varianteService
            .getByCpInterno(varianteRequest)
            .subscribe(function (response) {
            _this.variantes = response.Data;
            if (_this.variantes.length > 0)
                _this.spanUbicacion = false;
            else
                _this.spanUbicacion = true;
        });
        this.obtenerStock();
    }
    InicioStockDialogComponent.prototype.ngOnInit = function () { };
    InicioStockDialogComponent.prototype.addStock = function () {
        var _this = this;
        if (!this.depositoSelected) {
            this.dialog.open(message_dialog_component_1.MessageDialogComponent, {
                data: {
                    message: 'Debe seleccionar un deposito'
                }
            });
            return;
        }
        if (this.variantes.length > 0 && !this.varianteSelected) {
            this.dialog.open(message_dialog_component_1.MessageDialogComponent, {
                data: {
                    message: 'Debe seleccionar una variante'
                }
            });
            return;
        }
        var stockInicialRequest = new StockInicial_1.Stock({
            CpInterno: this.dialogData.CpInterno,
            Ubicacion: this.ubicacionFormControl.value,
            StockInicial: this.cantidadFormControl.value,
            Minimo: this.stockMinimoFormControl.value,
            Maximo: this.stockMaximoFormControl.value,
            IdVariante: this.variantes.length > 0 ? this.varianteSelected : 0,
            DetalleDeposito: new Deposito_1.Deposito({
                Numero: this.depositoSelected
            }),
            Horario: new Date()
        });
        this.stockService.insertStockInicial(stockInicialRequest).subscribe(function () {
            _this.obtenerStock();
            _this.limpiarFiltros();
        }, function (err) {
            var errorStatus = err.error.Error.Status;
            if (errorStatus === 1) {
                _this.dialog.open(message_dialog_component_1.MessageDialogComponent, {
                    data: {
                        message: 'Ya existe un producto con este deposito'
                    }
                });
            }
            else {
                _this.dialog.open(message_dialog_component_1.MessageDialogComponent, {
                    data: {
                        message: 'Hubo un error en iniciar este stock'
                    }
                });
            }
        });
    };
    InicioStockDialogComponent.prototype.obtenerStock = function () {
        var _this = this;
        var stockInicialRequest = new StockRequest_1.StockRequest({
            cpInterno: this.dialogData.CpInterno
        });
        this.stockService.getStock(stockInicialRequest).subscribe(function (response) {
            _this.stocks = response.ProductosStock;
        });
    };
    InicioStockDialogComponent.prototype.limpiarFiltros = function () {
        this.ubicacionFormControl.reset();
        this.depositoSelected = undefined;
        this.cantidadFormControl.reset();
        this.stockMaximoFormControl.reset();
        this.stockMinimoFormControl.reset();
        this.varianteSelected = undefined;
    };
    InicioStockDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-inicio.stock.dialog',
            templateUrl: './inicio.stock.dialog.component.html',
            styleUrls: ['./inicio.stock.dialog.component.scss']
        }),
        __param(4, core_2.Inject(dialog_1.MAT_DIALOG_DATA))
    ], InicioStockDialogComponent);
    return InicioStockDialogComponent;
}());
exports.InicioStockDialogComponent = InicioStockDialogComponent;
