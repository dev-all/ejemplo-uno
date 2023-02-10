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
exports.__esModule = true;
exports.EstadosPedido = exports.PedidoMercaderiaDialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var RequestBase_1 = require("src/app/models/RequestBase");
var PedidoMercaderiaDialogComponent = /** @class */ (function () {
    function PedidoMercaderiaDialogComponent(data, ciudadService, comprobanteService, dialogRef, snackbarService) {
        var _this = this;
        this.data = data;
        this.ciudadService = ciudadService;
        this.comprobanteService = comprobanteService;
        this.dialogRef = dialogRef;
        this.snackbarService = snackbarService;
        this.estados = [];
        this.nombreClienteFormControl = new forms_1.FormControl();
        this.direccionFormControl = new forms_1.FormControl();
        this.tlfFormControl = new forms_1.FormControl();
        this.correoFormControl = new forms_1.FormControl();
        this.solicitadoPorFormControl = new forms_1.FormControl();
        this.plazoFormControl = new forms_1.FormControl();
        this.condicionPagoFormControl = new forms_1.FormControl();
        this.lugarEntregaFormControl = new forms_1.FormControl();
        this.transportadoPorFormControl = new forms_1.FormControl();
        this.aclaracionFormControl = new forms_1.FormControl();
        this.observacionFormControl = new forms_1.FormControl();
        this.ciudades = [];
        this.dialogData = this.data.pedidoMercaderiaRequest;
        var baseRequest = new RequestBase_1.RequestBase({ database: null });
        this.ciudadService.obtener(baseRequest, 'ciudad').subscribe(function (x) {
            _this.ciudades = x.Data;
            _this.localidadSelected = _this.dialogData.comprobanteCabecera.numcity;
        });
        this.estados.push(new EstadosPedido({ valor: 'A', descripcion: 'Activo' }), new EstadosPedido({ valor: 'P', descripcion: 'Pagado' }), new EstadosPedido({ valor: 'I', descripcion: 'Picking Iniciado' }), new EstadosPedido({ valor: 'K', descripcion: 'Picking Finalizado' }), new EstadosPedido({ valor: 'F', descripcion: 'Facturado' }), new EstadosPedido({ valor: 'E', descripcion: 'Entregado' }), new EstadosPedido({ valor: 'C', descripcion: 'Cancelado' }));
        this.nombreClienteFormControl.setValue(this.dialogData.comprobanteCabecera.nombre);
        this.direccionFormControl.setValue(this.dialogData.comprobanteCabecera.direccion);
        this.tlfFormControl.setValue('111 /');
        this.estadoSelected = 'A';
    }
    PedidoMercaderiaDialogComponent.prototype.ngOnInit = function () { };
    PedidoMercaderiaDialogComponent.prototype.aceptar_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request, ciudadSelected;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.dialogData;
                        ciudadSelected = this.ciudades.find(function (x) { return x.Id === _this.localidadSelected; });
                        request.comprobanteCabecera.nombre = this.nombreClienteFormControl.value;
                        request.comprobanteCabecera.direccion = this.direccionFormControl.value;
                        request.comprobanteCabecera.ciudad = ciudadSelected.Ciudad;
                        request.comprobanteCabecera.telefono = this.tlfFormControl.value;
                        request.comprobanteCabecera.correo = this.correoFormControl.value;
                        request.comprobanteCabecera.oficina = this.solicitadoPorFormControl.value;
                        request.comprobanteCabecera.plazoentrega = this.plazoFormControl.value;
                        request.comprobanteCabecera.condicionpago =
                            this.condicionPagoFormControl.value;
                        request.comprobanteCabecera.lugar = this.lugarEntregaFormControl.value;
                        request.comprobanteCabecera.envio = this.transportadoPorFormControl.value;
                        request.comprobanteCabecera.aclaracion = this.aclaracionFormControl.value;
                        request.comprobanteCabecera.auxiliar = this.observacionFormControl.value;
                        request.comprobanteCabecera.estado = this.estadoSelected;
                        request.comprobanteCabecera.tipocbte = 1;
                        return [4 /*yield*/, this.comprobanteService
                                .crearPedidoMercaderia(this.dialogData)
                                .toPromise()];
                    case 1:
                        _a.sent();
                        this.snackbarService.showSnackBar('Pedido creado correctamente');
                        this.dialogRef.close(true);
                        return [2 /*return*/];
                }
            });
        });
    };
    PedidoMercaderiaDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-pedido.mercaderia.dialog',
            templateUrl: './pedido.mercaderia.dialog.component.html',
            styleUrls: ['./pedido.mercaderia.dialog.component.scss']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], PedidoMercaderiaDialogComponent);
    return PedidoMercaderiaDialogComponent;
}());
exports.PedidoMercaderiaDialogComponent = PedidoMercaderiaDialogComponent;
var EstadosPedido = /** @class */ (function () {
    function EstadosPedido(init) {
        Object.assign(this, init);
    }
    return EstadosPedido;
}());
exports.EstadosPedido = EstadosPedido;
