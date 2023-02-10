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
exports.ClienteComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var resumen_cuenta_dialog_component_1 = require("src/app/components/dialogs/resumen.cuenta.dialog/resumen.cuenta.dialog.component");
var ClienteRequest_1 = require("src/app/models/Cliente/ClienteRequest");
var InputDinamico_1 = require("src/app/models/FormDinamico/InputDinamico");
var RequestBase_1 = require("src/app/models/RequestBase");
var ClienteComponent = /** @class */ (function () {
    function ClienteComponent(provinciaService, categoriaService, formasService, ciudadService, listaService, zonaService, vendedorService, sucursalService, clienteServicie, dialog) {
        this.provinciaService = provinciaService;
        this.categoriaService = categoriaService;
        this.formasService = formasService;
        this.ciudadService = ciudadService;
        this.listaService = listaService;
        this.zonaService = zonaService;
        this.vendedorService = vendedorService;
        this.sucursalService = sucursalService;
        this.clienteServicie = clienteServicie;
        this.dialog = dialog;
        this.nombreFormControl = new forms_1.FormControl('');
        this.cuitFormControl = new forms_1.FormControl('');
        this.cuentaFormControl = new forms_1.FormControl('');
        this.nombreFantasiaFormControl = new forms_1.FormControl('');
        this.agendaFormControl = new forms_1.FormControl('');
        this.direccionFormControl = new forms_1.FormControl('');
        this.expandedElement = true;
        this.columnasTabla = [
            'razonSocial',
            'nombreFantasia',
            'tlf',
            'ciudad',
            'direccion',
        ];
        this.clientes = [];
        this.listaInputs = [
            new InputDinamico_1.InputDinamico({
                descripcion: 'Nombre',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({ descripcion: 'CUIT', checked: true, isDefault: true }),
            new InputDinamico_1.InputDinamico({
                descripcion: 'Cuenta',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({
                descripcion: 'Nomre Fantasia',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Provincia' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Categoria' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Forma Venta' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Ciudad' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Lista' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Zona' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Vendedor exclusivo' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Agenda' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Direccion' }),
            new InputDinamico_1.InputDinamico({ descripcion: 'Sucursal' }),
        ];
        this.listaInputsParaMostrar = [
            new InputDinamico_1.InputDinamico({
                descripcion: 'Nombre',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({ descripcion: 'CUIT', checked: true, isDefault: true }),
            new InputDinamico_1.InputDinamico({
                descripcion: 'Cuenta',
                checked: true,
                isDefault: true
            }),
            new InputDinamico_1.InputDinamico({
                descripcion: 'Nomre Fantasia',
                checked: true,
                isDefault: true
            }),
        ];
        this.page = 0;
        this.pageSize = 5;
        this.totalRows = 0;
    }
    ClienteComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    ClienteComponent.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseRequest, provinciaPromise, categoriaPromise, formasPromise, ciudadPromise, listaPromise, zonaPromise, vendedorPromise, sucursalPromise, clienteBuscarPromise;
            var _this = this;
            return __generator(this, function (_a) {
                baseRequest = new RequestBase_1.RequestBase({ database: null });
                provinciaPromise = this.provinciaService.obtener(baseRequest, 'provincia');
                categoriaPromise = this.categoriaService.obtener(baseRequest, 'categoria');
                formasPromise = this.formasService.obtener(baseRequest, 'formas');
                ciudadPromise = this.ciudadService.obtener(baseRequest, 'ciudad');
                listaPromise = this.listaService.obtener(baseRequest, 'lista');
                zonaPromise = this.zonaService.obtener(baseRequest, 'zona');
                vendedorPromise = this.vendedorService.obtener(baseRequest);
                sucursalPromise = this.sucursalService.obtener(baseRequest, 'sucursal');
                clienteBuscarPromise = this.buscarClientes();
                rxjs_1.forkJoin({
                    provinciaPromise: provinciaPromise,
                    categoriaPromise: categoriaPromise,
                    formasPromise: formasPromise,
                    ciudadPromise: ciudadPromise,
                    listaPromise: listaPromise,
                    zonaPromise: zonaPromise,
                    vendedorPromise: vendedorPromise,
                    sucursalPromise: sucursalPromise,
                    clienteBuscarPromise: clienteBuscarPromise
                }).subscribe(function (res) {
                    _this.provincias = res.provinciaPromise.Data;
                    _this.categorias = res.categoriaPromise.Data;
                    _this.formas = res.formasPromise.Data;
                    _this.ciudades = res.ciudadPromise.Data;
                    _this.listas = res.listaPromise.Data.filter(function (x) { return x.Habil.toLowerCase() == 'si'; });
                    _this.zonas = res.zonaPromise.Data;
                    _this.vendedores = res.vendedorPromise.Data;
                    _this.sucursales = res.sucursalPromise.Data;
                });
                return [2 /*return*/];
            });
        });
    };
    ClienteComponent.prototype.lista_Event = function (tipoInput) {
        var existe = this.listaInputsParaMostrar.find(function (x) { return x.descripcion === tipoInput.descripcion; });
        if (existe) {
            var index = this.listaInputsParaMostrar.findIndex(function (x) { return x.descripcion === tipoInput.descripcion; });
            this.listaInputsParaMostrar.splice(index, 1);
        }
        else {
            this.listaInputsParaMostrar.push(tipoInput);
        }
    };
    ClienteComponent.prototype.pagesChange = function (event) {
        this.pageSize = event.pageSize;
        this.page = event.pageIndex;
        this.buscarClientes();
    };
    ClienteComponent.prototype.buscar_Click = function () {
        this.page = 0;
        this.buscarClientes();
    };
    ClienteComponent.prototype.buscarClientes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request, clienteResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.clientes = [];
                        request = new ClienteRequest_1.ClienteRequest({
                            Cuenta: this.cuentaFormControl.value,
                            Nombre: this.nombreFormControl.value,
                            NombreFantasia: this.nombreFantasiaFormControl.value,
                            FormaVenta: this.formaVentaSelected >= 0 ? this.formaVentaSelected : null,
                            IdLista: this.listaSelected >= 0 ? this.listaSelected : null,
                            Direccion: this.direccionFormControl.value,
                            CUIT: this.cuitFormControl.value,
                            IdProvincia: this.provinciaSelected >= 0 ? this.provinciaSelected : null,
                            IdCuidad: this.ciudadSelected >= 0 ? this.ciudadSelected : null,
                            IdVendedor: this.vendedorSelected >= 0 ? this.vendedorSelected : null,
                            idZona: this.zonaSelected >= 0 ? this.zonaSelected : null,
                            Idsucursal: this.sucursalSelected >= 0 ? this.sucursalSelected : null,
                            IdCategoria: this.categoriaSelected >= 0 ? this.categoriaSelected : null,
                            Aclaracion: this.agendaFormControl.value,
                            page: this.page + 1,
                            pageSize: this.pageSize
                        });
                        return [4 /*yield*/, this.clienteServicie
                                .getByFiltros(request)
                                .toPromise()];
                    case 1:
                        clienteResponse = _a.sent();
                        this.page = clienteResponse.CurrentPage;
                        this.clientes = clienteResponse.Clientes;
                        this.totalPages = clienteResponse.TotalPages;
                        this.totalRows = clienteResponse.TotalRows;
                        return [2 /*return*/];
                }
            });
        });
    };
    ClienteComponent.prototype.resumenCuentaClick = function (numeroCuenta, nombreCliente) {
        this.dialog.open(resumen_cuenta_dialog_component_1.ResumenCuentaDialogComponent, {
            data: { numeroCuenta: numeroCuenta, nombreCliente: nombreCliente },
            width: '800px'
        });
    };
    ClienteComponent = __decorate([
        core_1.Component({
            selector: 'app-cliente',
            templateUrl: './cliente.component.html',
            styleUrls: ['./cliente.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], ClienteComponent);
    return ClienteComponent;
}());
exports.ClienteComponent = ClienteComponent;
