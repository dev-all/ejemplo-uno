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
exports.ProductoDialogComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var ProductoByCodigoRequest_1 = require("src/app/models/Producto/ProductoByCodigoRequest");
var ProductoDialogComponent = /** @class */ (function () {
    function ProductoDialogComponent(productoService, dialogRef, data) {
        var _this = this;
        this.productoService = productoService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.clickedRows = new Set();
        this.columnasTabla = ['codigo', 'descripcion', 'lista1'];
        var request = new ProductoByCodigoRequest_1.ProductoByCodigoRequest({ codigo: this.data.codigo });
        this.productoService
            .getProductosByCodigo(request)
            .subscribe(function (x) { return (_this.productos = x.Data); });
    }
    ProductoDialogComponent.prototype.row_Cick = function (row) {
        this.clickedRows.clear();
        this.clickedRows.add(row);
    };
    ProductoDialogComponent.prototype.aceptar_Click = function () {
        var productoSeleccionado;
        this.clickedRows.forEach(function (x) { return (productoSeleccionado = x); });
        this.dialogRef.close(productoSeleccionado);
    };
    ProductoDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-producto.dialog',
            templateUrl: './producto.dialog.component.html',
            styleUrls: ['./producto.dialog.component.scss']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ProductoDialogComponent);
    return ProductoDialogComponent;
}());
exports.ProductoDialogComponent = ProductoDialogComponent;
