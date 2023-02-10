"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GlobalSnackbarService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var SnackBar_1 = require("src/app/models/SnackBar/SnackBar");
var GlobalSnackbarService = /** @class */ (function () {
    function GlobalSnackbarService() {
        this.subject = new rxjs_1.BehaviorSubject(new SnackBar_1.SnackBar());
    }
    GlobalSnackbarService.prototype.onSnackBar = function () {
        return this.subject.asObservable();
    };
    GlobalSnackbarService.prototype.value = function () {
        return this.subject.value;
    };
    GlobalSnackbarService.prototype.showSnackBar = function (mensaje, action) {
        if (action === void 0) { action = 'Cerrar'; }
        this.subject.next(new SnackBar_1.SnackBar({ mensaje: mensaje, action: action }));
    };
    GlobalSnackbarService.prototype.resetSnackBar = function () {
        this.subject.next(new SnackBar_1.SnackBar());
    };
    GlobalSnackbarService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GlobalSnackbarService);
    return GlobalSnackbarService;
}());
exports.GlobalSnackbarService = GlobalSnackbarService;
