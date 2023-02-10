"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AgregarProductoService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var AgregarProductoService = /** @class */ (function () {
    function AgregarProductoService() {
        this.subject = new rxjs_1.BehaviorSubject(null);
    }
    AgregarProductoService.prototype.onChange = function () {
        return this.subject.asObservable();
    };
    AgregarProductoService.prototype.value = function () {
        return this.subject.value;
    };
    AgregarProductoService.prototype.changeValue = function (value) {
        this.subject.next(value);
    };
    AgregarProductoService.prototype.resetValues = function () {
        this.subject = new rxjs_1.BehaviorSubject(null);
    };
    AgregarProductoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AgregarProductoService);
    return AgregarProductoService;
}());
exports.AgregarProductoService = AgregarProductoService;
