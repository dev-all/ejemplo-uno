"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BonificacionGeneralDialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var BonificacionGeneralDialogComponent = /** @class */ (function () {
    function BonificacionGeneralDialogComponent(dialogRegf, userService) {
        this.dialogRegf = dialogRegf;
        this.userService = userService;
        this.bonificacionFormControl = new forms_1.FormControl();
        var userValues = this.userService.getUserValue();
        if (userValues)
            this.bonificacionMax = userValues.bonificacionMax;
    }
    BonificacionGeneralDialogComponent.prototype.aplicar_Click = function () {
        this.dialogRegf.close(this.bonificacionFormControl.value);
    };
    BonificacionGeneralDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-bonificacion.general-dialog',
            templateUrl: './bonificacion.general-dialog.component.html',
            styleUrls: ['./bonificacion.general-dialog.component.scss']
        })
    ], BonificacionGeneralDialogComponent);
    return BonificacionGeneralDialogComponent;
}());
exports.BonificacionGeneralDialogComponent = BonificacionGeneralDialogComponent;
