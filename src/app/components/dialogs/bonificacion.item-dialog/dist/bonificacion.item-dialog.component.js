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
exports.BonificacionItemDialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var rxjs_1 = require("rxjs");
var BonificacionComercialRequest_1 = require("src/app/models/Bonificacion/BonificacionComercialRequest");
var BonificacionOfertaRequest_1 = require("src/app/models/Bonificacion/BonificacionOfertaRequest");
var BonificacionItemDialogComponent = /** @class */ (function () {
    function BonificacionItemDialogComponent(dialogRegf, userService, bonificacionService, data) {
        var _this = this;
        this.dialogRegf = dialogRegf;
        this.userService = userService;
        this.bonificacionService = bonificacionService;
        this.data = data;
        this.bonificacionFormControl = new forms_1.FormControl();
        var userValues = this.userService.getUserValue();
        if (userValues)
            this.bonificacionMax = userValues.bonificacionMax;
        var comercialRequest = new BonificacionComercialRequest_1.BonificacionComercialRequest({
            cpInterno: this.data.cpInterno,
            numeroCuenta: this.data.numeroCuenta,
            cantidad: this.data.cantidad
        });
        var ofertaRequest = new BonificacionOfertaRequest_1.BonificacionOfertaRequest({
            cpInterno: this.data.cpInterno,
            cantidad: this.data.cantidad
        });
        var bonificacionComercialPromise = this.bonificacionService.obtenerComercial(comercialRequest);
        var bonificacionOfertaPromise = this.bonificacionService.obtenerOferta(ofertaRequest);
        rxjs_1.forkJoin({
            bonificacionComercialPromise: bonificacionComercialPromise,
            bonificacionOfertaPromise: bonificacionOfertaPromise
        }).subscribe(function (res) {
            _this.bonificacionComercial =
                res.bonificacionComercialPromise.Data.Porcentaje;
            _this.bonificacionOferta = res.bonificacionOfertaPromise.Data.Porcentaje;
        });
    }
    BonificacionItemDialogComponent.prototype.aplicar_Click = function () {
        this.dialogRegf.close(this.bonificacionFormControl.value);
    };
    BonificacionItemDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-bonificacion.item-dialog',
            templateUrl: './bonificacion.item-dialog.component.html',
            styleUrls: ['./bonificacion.item-dialog.component.scss']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], BonificacionItemDialogComponent);
    return BonificacionItemDialogComponent;
}());
exports.BonificacionItemDialogComponent = BonificacionItemDialogComponent;
