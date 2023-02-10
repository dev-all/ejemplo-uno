"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Usuario_1 = require("src/app/models/Usuario");
var UserService = /** @class */ (function () {
    function UserService(localService) {
        this.localService = localService;
        var cache = localService.getJsonValue('user');
        var userCache = cache ? JSON.parse(cache) : null;
        this.userSubject = new rxjs_1.BehaviorSubject(userCache);
    }
    UserService.prototype.getUserValue = function () {
        return this.userSubject.value;
    };
    UserService.prototype.getAllUserAccess = function () {
        return this.userSubject.value.accesos;
    };
    UserService.prototype.getUserAccess = function (nombreAcceso) {
        return this.userSubject.value.accesos.find(function (x) { return x.Nombre.toUpperCase() === nombreAcceso.toUpperCase(); });
    };
    UserService.prototype.getUserToken = function () {
        var _a;
        return (_a = this.userSubject.value) === null || _a === void 0 ? void 0 : _a.token;
    };
    UserService.prototype.setUserValue = function (loginResponse, accesoReponse) {
        var user = new Usuario_1.Usuario({
            Id: loginResponse.idVendedor,
            token: loginResponse.access_token,
            accesos: accesoReponse.Accesos,
            idCasilla: loginResponse.idCasilla,
            nombre: loginResponse.nombre,
            deposito: loginResponse.deposito,
            bonificacionMax: loginResponse.bonificacionMax
        });
        this.localService.setJsonValue('user', JSON.stringify(user));
        this.userSubject.next(user);
    };
    UserService.prototype.removeUserValue = function () {
        this.localService.clearToken();
        this.userSubject.next(null);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
