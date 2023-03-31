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
exports.VentasComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var agregar_producto_dialog_component_1 = require("src/app/components/dialogs/agregar-producto-dialog/agregar-producto-dialog.component");
var bonificacion_general_dialog_component_1 = require("src/app/components/dialogs/bonificacion.general-dialog/bonificacion.general-dialog.component");
var bonificacion_item_dialog_component_1 = require("src/app/components/dialogs/bonificacion.item-dialog/bonificacion.item-dialog.component");
var cliente_dialog_component_1 = require("src/app/components/dialogs/cliente-dialog/cliente-dialog.component");
var login_dialog_component_1 = require("src/app/components/dialogs/login.dialog/login.dialog.component");
var message_dialog_component_1 = require("src/app/components/dialogs/message.dialog/message.dialog.component");
var pedido_mercaderia_dialog_component_1 = require("src/app/components/dialogs/pedido.mercaderia.dialog/pedido.mercaderia.dialog.component");
var producto_dialog_component_1 = require("src/app/components/dialogs/producto.dialog/producto.dialog.component");
var seleccion_productos_component_1 = require("src/app/components/dialogs/seleccion-productos/seleccion-productos.component");
var magnum_select_component_1 = require("src/app/components/magnum-select/magnum-select.component");
var BonificacionComercialRequest_1 = require("src/app/models/Bonificacion/BonificacionComercialRequest");
var BonificacionOfertaRequest_1 = require("src/app/models/Bonificacion/BonificacionOfertaRequest");
var ClienteCuentaRequest_1 = require("src/app/models/Cliente/ClienteCuentaRequest");
var ClienteCuentaResponse_1 = require("src/app/models/Cliente/ClienteCuentaResponse");
var ComprobanteCabeceraRequest_1 = require("src/app/models/Comprobante/ComprobanteCabeceraRequest");
var ComprobanteDetalleRequest_1 = require("src/app/models/Comprobante/ComprobanteDetalleRequest");
var PedidoMercaderiaRequest_1 = require("src/app/models/Mercaderia/PedidoMercaderiaRequest");
var AgregarProducto_1 = require("src/app/models/Producto/AgregarProducto");
var ProductoCostosRequest_1 = require("src/app/models/Producto/ProductoCostosRequest");
var ProductoRequest_1 = require("src/app/models/Producto/ProductoRequest");
var ProductoVentaGridRequest_1 = require("src/app/models/Producto/ProductoVentaGridRequest");
var ProductoVentaRequest_1 = require("src/app/models/Producto/ProductoVentaRequest");
var ProductoVentas_1 = require("src/app/models/Producto/ProductoVentas");
var RequestBase_1 = require("src/app/models/RequestBase");
var StockRequest_1 = require("src/app/models/Stock/StockRequest");
var VentasComponent = /** @class */ (function () {
    function VentasComponent(seccionService, tipoFacturaService, formasService, listaService, transporteService, clienteEntregaService, vendedorService, clienteService, productoService, dialog, userService, stockService, nuevoMovimientoService, bonificacionService) {
        this.seccionService = seccionService;
        this.tipoFacturaService = tipoFacturaService;
        this.formasService = formasService;
        this.listaService = listaService;
        this.transporteService = transporteService;
        this.clienteEntregaService = clienteEntregaService;
        this.vendedorService = vendedorService;
        this.clienteService = clienteService;
        this.productoService = productoService;
        this.dialog = dialog;
        this.userService = userService;
        this.stockService = stockService;
        this.nuevoMovimientoService = nuevoMovimientoService;
        this.bonificacionService = bonificacionService;
        this.clientFormControl = new forms_1.FormControl();
        this.cantidadFormControl = new forms_1.FormControl(1);
        this.codigoFormControl = new forms_1.FormControl();
        this.observacionesFormControl = new forms_1.FormControl();
        this.tipoComprobantesSelect = [];
        this.condicionSelect = [];
        this.formasVentaSelect = [];
        this.listaSelect = [];
        this.vendedorSelect = [];
        this.transporteSelect = [];
        this.formaEntregaSelect = [];
        this.lugarSelect = [];
        this.tipoDocumentosSelect = [];
        this.descripcionesSelect = [];
        this.descripciones = [];
        this.vendedores = [];
        this.clienteCuenta = new ClienteCuentaResponse_1.ClienteCuentaResponse();
        this.productosGrid = [];
        this.columnasTabla = [
            'cantidad',
            'codigo',
            'unitario',
            'bonif',
            'descripcion',
            'optionX',
            'parcial',
            'stock',
            'iva',
            'neto',
        ];
        this.totalParcial = '0';
        this.subTotal = 0;
        this.totalBonificacion = 0;
        this.totalIva = '0';
        this.clienteCuentaDefault = -1;
        this.buscarPorDetalle = true;
        this.bonificacionUsuario = 0;
        this.vendedorSelect.push(new magnum_select_component_1.SelectOption({ value: 0, descriptions: 'USUARIO ACTUAL' }));
        this.loadData();
    }
    VentasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nuevoMovimeintoSubscription = this.nuevoMovimientoService
            .onChange()
            .subscribe(function (value) {
            if (!value)
                return;
            _this.agregarProductoSuscription(value.CpInterno, value.Cantidad);
        });
    };
    VentasComponent.prototype.ngOnDestroy = function () {
        this.nuevoMovimeintoSubscription.unsubscribe();
        this.nuevoMovimientoService.resetValues();
    };
    VentasComponent.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseRequest, seccionesPromise, tipoFacturaPromise, formasPromise, listaPromise, transportePromise, clienteEntregaPromise, vendedorPromise, clienteCuentaRequest, clienteCuentaPromise;
            var _this = this;
            return __generator(this, function (_a) {
                baseRequest = new RequestBase_1.RequestBase({ database: null });
                seccionesPromise = this.seccionService.obtener(baseRequest, 'seccion');
                tipoFacturaPromise = this.tipoFacturaService.obtener(baseRequest, 'tipoFactura');
                formasPromise = this.formasService.obtener(baseRequest, 'formas');
                listaPromise = this.listaService.obtener(baseRequest, 'lista');
                transportePromise = this.transporteService.obtener(baseRequest, 'transporte');
                clienteEntregaPromise = this.clienteEntregaService.obtener(baseRequest, 'clienteEntrega');
                vendedorPromise = this.vendedorService.obtener(baseRequest);
                clienteCuentaRequest = new ClienteCuentaRequest_1.ClienteCuentaRequest({
                    cuenta: this.clienteCuentaDefault,
                    database: null
                });
                clienteCuentaPromise = this.clienteService
                    .obtenerClienteCuenta(clienteCuentaRequest)
                    .toPromise();
                rxjs_1.forkJoin({
                    seccionesPromise: seccionesPromise,
                    tipoFacturaPromise: tipoFacturaPromise,
                    formasPromise: formasPromise,
                    listaPromise: listaPromise,
                    transportePromise: transportePromise,
                    clienteEntregaPromise: clienteEntregaPromise,
                    vendedorPromise: vendedorPromise,
                    clienteCuentaPromise: clienteCuentaPromise
                }).subscribe(function (res) {
                    _this.secciones = res.seccionesPromise.Data;
                    _this.tipoFacturas = res.tipoFacturaPromise.Data;
                    _this.formas = res.formasPromise.Data;
                    _this.listas = res.listaPromise.Data;
                    _this.transportes = res.transportePromise.Data;
                    _this.clienteEntregas = res.clienteEntregaPromise.Data;
                    _this.vendedores = res.vendedorPromise.Data;
                    _this.clienteCuenta = res.clienteCuentaPromise.Data;
                    _this.secciones.forEach(function (seccion) {
                        _this.tipoComprobantesSelect.push(new magnum_select_component_1.SelectOption({
                            value: seccion.Id,
                            descriptions: seccion.Seccion1,
                            alternativeDesc: seccion.Detalle
                        }));
                    });
                    _this.tipoFacturas.forEach(function (tipoFactura) {
                        _this.condicionSelect.push(new magnum_select_component_1.SelectOption({
                            value: tipoFactura.CodigoFactura,
                            descriptions: tipoFactura.Condicion
                        }));
                    });
                    _this.formas.forEach(function (forma) {
                        _this.formasVentaSelect.push(new magnum_select_component_1.SelectOption({
                            value: forma.Id,
                            descriptions: forma.Expresion
                        }));
                    });
                    _this.listas.forEach(function (lista) {
                        if (lista.Habil.toLowerCase() === 'si')
                            _this.listaSelect.push(new magnum_select_component_1.SelectOption({
                                value: lista.Id,
                                descriptions: lista.Aclaracion
                            }));
                    });
                    _this.vendedores.forEach(function (vendedor) {
                        _this.vendedorSelect.push(new magnum_select_component_1.SelectOption({
                            value: vendedor.Id,
                            descriptions: vendedor.Nombre
                        }));
                    });
                    _this.transportes.forEach(function (transporte) {
                        _this.transporteSelect.push(new magnum_select_component_1.SelectOption({
                            value: transporte.Id,
                            descriptions: transporte.RazonSocial
                        }));
                    });
                    _this.clienteEntregas.forEach(function (clienteEntrega) {
                        _this.formaEntregaSelect.push(new magnum_select_component_1.SelectOption({
                            value: clienteEntrega.Id,
                            descriptions: clienteEntrega.Direccion
                        }));
                    });
                    _this.clientFormControl.setValue(_this.clienteCuenta.Nombre);
                    _this.listaSelected = _this.clienteCuenta.IdLista;
                    _this.tipoDocumentosSelect = _this.getTiposDocumento();
                });
                return [2 /*return*/];
            });
        });
    };
    VentasComponent.prototype.buscarCliente_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var clienteDialog, data, clienteCuenta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clienteDialog = this.dialog.open(cliente_dialog_component_1.ClienteDialogComponent, {
                            width: '1000px'
                        });
                        return [4 /*yield*/, clienteDialog.afterClosed().toPromise()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.getClienteCuenta(data.cuenta)];
                    case 2:
                        clienteCuenta = _a.sent();
                        this.clienteCuenta = clienteCuenta;
                        this.clientFormControl.setValue(this.clienteCuenta.Nombre);
                        this.lista_Change(this.clienteCuenta.IdLista);
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.resetCliente_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clienteCuenta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.clienteCuenta.Cuenta === this.clienteCuentaDefault)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.getClienteCuenta(this.clienteCuentaDefault)];
                    case 1:
                        clienteCuenta = _a.sent();
                        this.clienteCuenta = clienteCuenta;
                        this.clientFormControl.setValue(this.clienteCuenta.Nombre);
                        this.lista_Change(this.clienteCuenta.IdLista);
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.getProductosVentas = function (value) {
        if (value === void 0) { value = null; }
        return __awaiter(this, void 0, void 0, function () {
            var request, productosVentas;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.descripcionesSelect = [];
                        request = new ProductoVentaRequest_1.ProductoVentaRequest({
                            database: null,
                            detalle: value
                        });
                        return [4 /*yield*/, this.productoService
                                .getProductosVentas(request)
                                .toPromise()];
                    case 1:
                        productosVentas = _a.sent();
                        this.productosVentas = productosVentas.Data;
                        productosVentas.Data.forEach(function (producto) {
                            _this.descripcionesSelect.push(new magnum_select_component_1.SelectOption({
                                value: producto.CpInterno,
                                descriptions: "" + producto.Detalle,
                                alternativeDesc: producto.Lista1.toString()
                            }));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.addProducto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cpInterno, dialogResult, user, productoRequest, stockRequest, productoResponse, stockResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.codigoFormControl.value) return [3 /*break*/, 4];
                        this.productoSelected = new ProductoVentas_1.ProductoVentas();
                        return [4 /*yield*/, this.getCpInternoFromCodigo()];
                    case 1:
                        cpInterno = _a.sent();
                        if (!cpInterno) return [3 /*break*/, 2];
                        this.productoSelected.CpInterno = cpInterno;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.obtenerCodigosFromDialog()];
                    case 3:
                        dialogResult = _a.sent();
                        this.productoSelected.CpInterno = dialogResult;
                        _a.label = 4;
                    case 4:
                        if (!this.productoSelected.CpInterno)
                            return [2 /*return*/];
                        user = this.userService.getUserValue();
                        productoRequest = new ProductoVentaGridRequest_1.ProductoVentaGridRequest({
                            cpInterno: this.productoSelected.CpInterno,
                            numeroDeposito: user.deposito,
                            tipoLista: this.listaSelected
                        });
                        stockRequest = new StockRequest_1.StockRequest({
                            cpInterno: this.productoSelected.CpInterno
                        });
                        return [4 /*yield*/, this.productoService
                                .getProductoVentaGrid(productoRequest)
                                .toPromise()];
                    case 5:
                        productoResponse = (_a.sent()).Data;
                        return [4 /*yield*/, this.stockService
                                .getStock(stockRequest)
                                .toPromise()];
                    case 6:
                        stockResponse = _a.sent();
                        if (this.codigoFormControl.value) {
                            this.addProductoGrilla(this.cantidadFormControl.value, productoResponse, user.deposito);
                        }
                        else {
                            this.addProductoGrillaDesdeModal(productoResponse, stockResponse, user.deposito);
                        }
                        this.cantidadFormControl.setValue(1);
                        this.codigoFormControl.reset();
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.getCpInternoFromCodigo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request, productoResponse, producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new ProductoRequest_1.ProductoRequest({
                            page: 1,
                            pageSize: 3,
                            codigo: this.codigoFormControl.value,
                            orderby: 'CP_INTERNO'
                        });
                        return [4 /*yield*/, this.productoService
                                .getByFiltros(request)
                                .toPromise()];
                    case 1:
                        productoResponse = _a.sent();
                        producto = productoResponse.Data.Productos;
                        if (producto.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, producto[0].CpInterno];
                }
            });
        });
    };
    VentasComponent.prototype.productosChange = function (value) {
        var selected = this.productosVentas.find(function (x) { return x.CpInterno === value; });
        this.productoSelected = selected;
    };
    VentasComponent.prototype.deleteProductoGrid = function (currentProducto) {
        var productosGrid = this.productosGrid.filter(function (x) { return x.NumItem !== currentProducto.NumItem; });
        this.productosGrid = __spreadArrays(productosGrid);
        this.sumTotales();
    };
    VentasComponent.prototype.sumTotales = function () {
        var total = this.productosGrid.reduce(function (previous, current) { return previous + current.Parcial; }, 0);
        var subtotal = this.productosGrid.reduce(function (previous, current) {
            return previous + current.Neto * current.Cantidad;
        }, 0);
        var totalBonificacion = this.productosGrid.reduce(function (previous, current) {
            return previous + (current.Bonificacion / 100) * current.NetoBackup;
        }, 0);
        var totalIva = this.productosGrid.reduce(function (previous, current) {
            return previous + (current.Iva / 100) * (current.Neto * current.Cantidad);
        }, 0);
        this.totalBonificacion = -Math.abs(totalBonificacion).toFixed(2);
        this.subTotal = subtotal;
        this.totalIva = totalIva.toFixed(2);
        this.totalParcial = total.toFixed(2);
    };
    VentasComponent.prototype.imprimir = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginDialog, dialogResult, comprobanteDetalle, pedidoMercaderiaRequest, mercaderiaDialog, mercaderiaDialogResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.productosGrid.length === 0)
                            return [2 /*return*/];
                        if (this.checkBonificaciones()) {
                            this.dialog.open(message_dialog_component_1.MessageDialogComponent, {
                                data: {
                                    title: 'Bonificación máxima superada',
                                    message: 'Alguno de los productos excede la bonificación máxima permitida'
                                }
                            });
                            return [2 /*return*/];
                        }
                        loginDialog = this.dialog.open(login_dialog_component_1.LoginDialogComponent, {
                            width: '500px',
                            height: '500px'
                        });
                        return [4 /*yield*/, loginDialog.afterClosed().toPromise()];
                    case 1:
                        dialogResult = _a.sent();
                        if (!dialogResult) {
                            return [2 /*return*/];
                        }
                        comprobanteDetalle = [];
                        this.productosGrid.forEach(function (producto, index) {
                            var costoPro = (producto.Costo -
                                (producto.Bonificar * producto.Costo) / 100).toFixed(4);
                            comprobanteDetalle.push(new ComprobanteDetalleRequest_1.ComprobanteDetalleRequest({
                                codigo: producto.Codigo,
                                familia: producto.Familia,
                                cantidad: producto.Cantidad,
                                despachar: 0,
                                predetalle: producto.Descripcion,
                                unitario: producto.Unitario,
                                costopro: Number.parseFloat(costoPro),
                                descuento: producto.Bonificacion,
                                parcial: producto.Parcial,
                                unidad: producto.Unidad,
                                sucursal: 0,
                                fecha: new Date(),
                                pactado: 0,
                                bonificar: 0,
                                valorneto: producto.Neto,
                                impuesto: 0,
                                recargo: 0,
                                cambiar: '',
                                aclaracion: '',
                                grupofam: 0,
                                bajostock: '',
                                cpinterno: producto.CpInterno,
                                nroitem: index + 1,
                                moneda: 0,
                                globaldesc: 0,
                                fechaega: new Date(),
                                completo: 0,
                                idvariante: producto.IdVariante,
                                deposito: producto.Deposito
                            }));
                        });
                        pedidoMercaderiaRequest = new PedidoMercaderiaRequest_1.PedidoMercaderiaRequest({
                            comprobanteCabecera: new ComprobanteCabeceraRequest_1.ComprobanteCabeceraRequest({
                                tipocbte: 1,
                                fecha: new Date(),
                                cuenta: this.clienteCuenta.Cuenta,
                                importe: Number.parseFloat(this.totalParcial),
                                nombre: this.clienteCuenta.Nombre,
                                listpre: this.listaSelected,
                                numcity: this.clienteCuenta.IdCiudad,
                                ciudad: this.clienteCuenta.Ciudad,
                                direccion: this.clienteCuenta.Direccion,
                                facturado: '',
                                oferta: '',
                                pedido: '',
                                factura: 0,
                                remito: 0,
                                cotizado: '',
                                discrimina: 0,
                                incluyeiva: 0,
                                infcontab: '',
                                detalle: '',
                                numprovi: this.clienteCuenta.IdProvincia,
                                idpais: 0,
                                idlote: '',
                                mercadopagoid: 0,
                                sucursal: 0,
                                web: 0
                            }),
                            comprobantesDetalle: comprobanteDetalle
                        });
                        mercaderiaDialog = this.dialog.open(pedido_mercaderia_dialog_component_1.PedidoMercaderiaDialogComponent, {
                            width: '600px',
                            data: { pedidoMercaderiaRequest: pedidoMercaderiaRequest }
                        });
                        return [4 /*yield*/, mercaderiaDialog
                                .afterClosed()
                                .toPromise()];
                    case 2:
                        mercaderiaDialogResult = _a.sent();
                        if (!mercaderiaDialogResult)
                            return [2 /*return*/];
                        this.resetData();
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.lista_Change = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var cpInternos, request, productosCostos;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.listaSelected = value;
                        if (this.productosGrid.length === 0)
                            return [2 /*return*/];
                        cpInternos = [];
                        this.productosGrid.forEach(function (x) { return cpInternos.push(x.CpInterno); });
                        request = new ProductoCostosRequest_1.ProductoCostosRequest({
                            cpInternos: cpInternos,
                            tipoLista: this.listaSelected
                        });
                        return [4 /*yield*/, this.productoService.getProductosCostos(request).toPromise()];
                    case 1:
                        productosCostos = (_a.sent()).Data;
                        this.productosGrid.forEach(function (producto) { return __awaiter(_this, void 0, void 0, function () {
                            var productoCosto, bonif, unitario, parcial;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        productoCosto = productosCostos.find(function (x) { return x.CpInterno === producto.CpInterno; });
                                        return [4 /*yield*/, this.calcularBonificacion(producto.CpInterno, producto.Cantidad, producto.BonificacionUsuario)];
                                    case 1:
                                        bonif = _a.sent();
                                        producto.Neto = productoCosto.ListaX;
                                        producto.NetoBackup = productoCosto.ListaX;
                                        producto.Iva = productoCosto.Iva;
                                        unitario = (producto.Iva / 100) * producto.NetoBackup + producto.NetoBackup;
                                        producto.Unitario = unitario;
                                        producto.UnitarioBackup = unitario;
                                        parcial = this.getParcial(unitario, producto.Cantidad);
                                        producto.Unitario = this.getUnitario(producto.UnitarioBackup, bonif);
                                        producto.Neto = this.getNeto(producto.NetoBackup, bonif);
                                        producto.Parcial = parcial - (bonif / 100) * parcial;
                                        producto.Bonificacion = bonif;
                                        this.sumTotales();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.bonificacionGeneral_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dialog, dialogResult, productosGrid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dialog = this.dialog.open(bonificacion_general_dialog_component_1.BonificacionGeneralDialogComponent);
                        return [4 /*yield*/, dialog.afterClosed().toPromise()];
                    case 1:
                        dialogResult = _a.sent();
                        if (!dialogResult)
                            return [2 /*return*/];
                        productosGrid = __spreadArrays(this.productosGrid);
                        productosGrid.forEach(function (producto) { return __awaiter(_this, void 0, void 0, function () {
                            var bonif, unitario, parcial;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.calcularBonificacion(producto.CpInterno, producto.Cantidad, dialogResult)];
                                    case 1:
                                        bonif = _a.sent();
                                        producto.BonificacionUsuario = dialogResult;
                                        unitario = (producto.Iva / 100) * producto.NetoBackup + producto.NetoBackup;
                                        producto.Unitario = unitario;
                                        producto.UnitarioBackup = unitario;
                                        parcial = this.getParcial(unitario, producto.Cantidad);
                                        producto.Unitario = this.getUnitario(producto.UnitarioBackup, bonif);
                                        producto.Neto = this.getNeto(producto.NetoBackup, bonif);
                                        producto.Parcial = parcial - (bonif / 100) * parcial;
                                        producto.Bonificacion = bonif;
                                        this.productosGrid = __spreadArrays(productosGrid);
                                        this.sumTotales();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.bonificacion_Click = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var dialog, dialogResult, bonif, unitario, parcial;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(producto);
                        dialog = this.dialog.open(bonificacion_item_dialog_component_1.BonificacionItemDialogComponent, {
                            data: {
                                cpInterno: producto.CpInterno,
                                numeroCuenta: this.clienteCuenta.Cuenta,
                                cantidad: producto.Cantidad
                            }
                        });
                        return [4 /*yield*/, dialog.afterClosed().toPromise()];
                    case 1:
                        dialogResult = _a.sent();
                        if (!dialogResult)
                            return [2 /*return*/];
                        producto.BonificacionUsuario = dialogResult;
                        return [4 /*yield*/, this.calcularBonificacion(producto.CpInterno, producto.Cantidad, producto.BonificacionUsuario)];
                    case 2:
                        bonif = _a.sent();
                        unitario = (producto.Iva / 100) * producto.NetoBackup + producto.NetoBackup;
                        producto.Unitario = unitario;
                        producto.UnitarioBackup = unitario;
                        console.log('unitario', producto.Unitario);
                        console.log('unitarioBackup', producto.UnitarioBackup);
                        parcial = this.getParcial(producto.UnitarioBackup, producto.Cantidad);
                        producto.Unitario = this.getUnitario(producto.UnitarioBackup, bonif);
                        producto.Neto = this.getNeto(producto.NetoBackup, bonif);
                        producto.Parcial = parcial - (bonif / 100) * parcial;
                        producto.Bonificacion = bonif;
                        this.sumTotales();
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.detalleCodigo_Click = function () {
        this.buscarPorDetalle = !this.buscarPorDetalle;
        this.descripcionesSelect = null;
        this.descripcionSelected = null;
        this.productoSelected = null;
        this.codigoFormControl.reset();
    };
    VentasComponent.prototype.seleccionProductos_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.dialog.open(seleccion_productos_component_1.SeleccionProductosComponent, {
                    width: '1000px'
                });
                return [2 /*return*/];
            });
        });
    };
    VentasComponent.prototype.agregarProductoSuscription = function (cpInterno, cantidad) {
        return __awaiter(this, void 0, void 0, function () {
            var user, productoRequest, productoResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.productoSelected = new ProductoVentas_1.ProductoVentas();
                        this.productoSelected.CpInterno = cpInterno;
                        user = this.userService.getUserValue();
                        productoRequest = new ProductoVentaGridRequest_1.ProductoVentaGridRequest({
                            cpInterno: this.productoSelected.CpInterno,
                            numeroDeposito: user.deposito,
                            tipoLista: this.listaSelected
                        });
                        return [4 /*yield*/, this.productoService
                                .getProductoVentaGrid(productoRequest)
                                .toPromise()];
                    case 1:
                        productoResponse = (_a.sent()).Data;
                        this.addProductoGrilla(cantidad, productoResponse, user.deposito);
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.checkBonificaciones = function () {
        var bonificacionMaxima = this.userService.getUserValue().bonificacionMax;
        var existeBonifiacionMax = this.productosGrid.find(function (x) { return x.Bonificacion > bonificacionMaxima; });
        return existeBonifiacionMax != null;
    };
    VentasComponent.prototype.getClienteCuenta = function (cuenta) {
        return __awaiter(this, void 0, void 0, function () {
            var clienteCuentaRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clienteCuentaRequest = new ClienteCuentaRequest_1.ClienteCuentaRequest({
                            cuenta: cuenta,
                            database: null
                        });
                        return [4 /*yield*/, this.clienteService
                                .obtenerClienteCuenta(clienteCuentaRequest)
                                .toPromise()];
                    case 1: return [2 /*return*/, (_a.sent()).Data];
                }
            });
        });
    };
    VentasComponent.prototype.getTiposDocumento = function () {
        var tiposDocumentos = [];
        tiposDocumentos.push(new magnum_select_component_1.SelectOption({ value: 1, descriptions: 'PEDIDO DE MERCADERIA' }));
        return tiposDocumentos;
    };
    VentasComponent.prototype.resetData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clienteCuentaRequest, clienteCuentaPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.productosGrid = [];
                        this.totalBonificacion = 0;
                        this.subTotal = 0;
                        this.totalIva = '0';
                        this.totalParcial = '0';
                        this.observacionesFormControl.setValue('');
                        clienteCuentaRequest = new ClienteCuentaRequest_1.ClienteCuentaRequest({
                            cuenta: this.clienteCuentaDefault,
                            database: null
                        });
                        return [4 /*yield*/, this.clienteService
                                .obtenerClienteCuenta(clienteCuentaRequest)
                                .toPromise()];
                    case 1:
                        clienteCuentaPromise = _a.sent();
                        this.clienteCuenta = clienteCuentaPromise.Data;
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.addProductoGrillaDesdeModal = function (productoResponse, stockResponse, deposito) {
        var _this = this;
        var agregarProducto = new AgregarProducto_1.AgregarProducto({
            descripcion: productoResponse.Detalle,
            precio: productoResponse.Unitario,
            stockActual: productoResponse.StkActual,
            stocks: stockResponse.ProductosStock
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
            _this.addProductoGrilla(cantidad, productoResponse, deposito);
        });
    };
    VentasComponent.prototype.addProductoGrilla = function (cantidad, productoResponse, depositoUsuario) {
        return __awaiter(this, void 0, void 0, function () {
            var ventasgrid, dialogRef, bonif, parcial;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ventasgrid = [];
                        if (productoResponse.StkActual < productoResponse.StkMinimo) {
                            dialogRef = this.dialog.open(message_dialog_component_1.MessageDialogComponent, {
                                data: {
                                    title: 'Advertencia',
                                    message: 'STOCK CRITICO'
                                }
                            });
                            dialogRef.afterClosed().subscribe(function () {
                                if (_this.cantidadElement)
                                    _this.cantidadElement.nativeElement.focus();
                            });
                        }
                        return [4 /*yield*/, this.calcularBonificacion(productoResponse.CpInterno, cantidad, 0)];
                    case 1:
                        bonif = _a.sent();
                        parcial = this.getParcial(productoResponse.Unitario, cantidad);
                        productoResponse.Unitario = this.getUnitario(productoResponse.Unitario, bonif);
                        productoResponse.Neto = this.getNeto(productoResponse.Neto, bonif);
                        ventasgrid.push(new ProductoGrid({
                            NumItem: this.productosGrid.length,
                            Cantidad: cantidad,
                            Codigo: productoResponse.Codigo,
                            Unitario: productoResponse.Unitario,
                            UnitarioBackup: productoResponse.Unitario,
                            Bonificacion: bonif,
                            BonificacionUsuario: 0,
                            Descripcion: productoResponse.Detalle,
                            Parcial: parcial - (bonif / 100) * parcial,
                            Stock: productoResponse.StkActual,
                            Iva: productoResponse.Iva,
                            Neto: productoResponse.Neto,
                            Costo: productoResponse.Costo,
                            Bonificar: productoResponse.Bonificar,
                            NetoBackup: productoResponse.Neto,
                            CpInterno: productoResponse.CpInterno,
                            Deposito: depositoUsuario
                        }));
                        this.productosGrid = __spreadArrays(this.productosGrid, ventasgrid);
                        if (this.cantidadElement)
                            this.cantidadElement.nativeElement.focus();
                        this.sumTotales();
                        return [2 /*return*/];
                }
            });
        });
    };
    VentasComponent.prototype.obtenerCodigosFromDialog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productoDialogResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dialog
                            .open(producto_dialog_component_1.ProductoDialogComponent, {
                            data: { codigo: this.codigoFormControl.value },
                            width: '700px'
                        })
                            .afterClosed()
                            .toPromise()];
                    case 1:
                        productoDialogResult = _a.sent();
                        return [2 /*return*/, productoDialogResult.CpInterno];
                }
            });
        });
    };
    VentasComponent.prototype.calcularBonificacion = function (cpInterno, cantidad, bonif_user) {
        return __awaiter(this, void 0, void 0, function () {
            var numeroCuenta, comercialRequest, ofertaRequest, bonificacionComercialPromise, bonificacionOfertaPromise, resPromises, bonifComercial, bonifOferta, lnbonif, descuento;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numeroCuenta = this.clienteCuenta.Cuenta;
                        comercialRequest = new BonificacionComercialRequest_1.BonificacionComercialRequest({
                            cpInterno: cpInterno,
                            numeroCuenta: numeroCuenta,
                            cantidad: cantidad
                        });
                        ofertaRequest = new BonificacionOfertaRequest_1.BonificacionOfertaRequest({
                            cpInterno: cpInterno,
                            cantidad: cantidad
                        });
                        bonificacionComercialPromise = this.bonificacionService.obtenerComercial(comercialRequest);
                        bonificacionOfertaPromise = this.bonificacionService.obtenerOferta(ofertaRequest);
                        return [4 /*yield*/, rxjs_1.forkJoin({
                                bonificacionComercialPromise: bonificacionComercialPromise,
                                bonificacionOfertaPromise: bonificacionOfertaPromise
                            }).toPromise()];
                    case 1:
                        resPromises = _a.sent();
                        bonifComercial = resPromises.bonificacionComercialPromise.Data.Porcentaje;
                        bonifOferta = resPromises.bonificacionOfertaPromise.Data.Porcentaje;
                        return [4 /*yield*/, rxjs_1.of(bonifComercial, bonifOferta).pipe(operators_1.max()).toPromise()];
                    case 2:
                        lnbonif = _a.sent();
                        descuento = 100 - 100 * (1 - lnbonif / 100) * (1 - bonif_user / 100);
                        return [2 /*return*/, descuento];
                }
            });
        });
    };
    VentasComponent.prototype.getParcial = function (unitario, cantidad) {
        return unitario * cantidad;
    };
    VentasComponent.prototype.getUnitario = function (unitario, bonif) {
        return unitario - (bonif / 100) * unitario;
    };
    VentasComponent.prototype.getNeto = function (neto, bonif) {
        return neto - (bonif / 100) * neto;
    };
    __decorate([
        core_1.ViewChild('cantidad')
    ], VentasComponent.prototype, "cantidadElement");
    VentasComponent = __decorate([
        core_1.Component({
            selector: 'app-ventas',
            templateUrl: './ventas.component.html',
            styleUrls: ['./ventas.component.scss']
        })
    ], VentasComponent);
    return VentasComponent;
}());
exports.VentasComponent = VentasComponent;
var ProductoGrid = /** @class */ (function () {
    function ProductoGrid(init) {
        Object.assign(this, init);
    }
    return ProductoGrid;
}());
