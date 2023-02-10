"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GlobalSnackbarComponent = void 0;
var core_1 = require("@angular/core");
var GlobalSnackbarComponent = /** @class */ (function () {
    function GlobalSnackbarComponent(snackBarService, snackBar) {
        this.snackBarService = snackBarService;
        this.snackBar = snackBar;
    }
    GlobalSnackbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.snakSubscription = this.snackBarService
            .onSnackBar()
            .subscribe(function (snackBar) {
            if (snackBar.mensaje)
                _this.snackBar.open(snackBar.mensaje, snackBar.action, {
                    duration: 2000
                });
        });
    };
    GlobalSnackbarComponent.prototype.ngOnDestroy = function () {
        this.snackBarService.resetSnackBar();
        this.snakSubscription.unsubscribe();
    };
    GlobalSnackbarComponent = __decorate([
        core_1.Component({
            selector: 'app-global-snackbar',
            templateUrl: './global.snackbar.component.html',
            styleUrls: ['./global.snackbar.component.scss']
        })
    ], GlobalSnackbarComponent);
    return GlobalSnackbarComponent;
}());
exports.GlobalSnackbarComponent = GlobalSnackbarComponent;
