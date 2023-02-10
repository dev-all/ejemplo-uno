"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductoService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var ProductoService = /** @class */ (function () {
    function ProductoService(http) {
        this.http = http;
    }
    ProductoService.prototype.getByFiltros = function (request) {
        return this.http.post(environment_1.environment.apiUrl + "/v1/producto/getByFiltros", request);
    };
    ProductoService.prototype.getProductosVentas = function (request) {
        return this.http.post(environment_1.environment.apiUrl + "/v1/producto/getProductosVentas", request);
    };
    ProductoService.prototype.getProductoVentaGrid = function (request) {
        return this.http.post(environment_1.environment.apiUrl + "/v1/producto/getProductoVentaGrid", request);
    };
    ProductoService.prototype.getProductosCostos = function (request) {
        return this.http.post(environment_1.environment.apiUrl + "/v1/producto/getProductosCostos", request);
    };
    ProductoService.prototype.getProductosByCodigo = function (request) {
        return this.http.post(environment_1.environment.apiUrl + "/v1/producto/getProductosByCodigo", request);
    };
    ProductoService.prototype["delete"] = function (request) {
        var options = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: {
                cpInterno: request.cpInterno,
                dataBaser: request.database
            }
        };
        return this.http["delete"](environment_1.environment.apiUrl + "/v1/producto", options);
    };
    ProductoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductoService);
    return ProductoService;
}());
exports.ProductoService = ProductoService;
