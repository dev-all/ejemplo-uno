"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocalService = void 0;
var core_1 = require("@angular/core");
var LocalService = /** @class */ (function () {
    function LocalService(storageService) {
        this.storageService = storageService;
    }
    // Set the json data to local storage
    LocalService.prototype.setJsonValue = function (key, value) {
        this.storageService.secureStorage.setItem(key, value);
    };
    // Get the json value from local storage
    LocalService.prototype.getJsonValue = function (key) {
        return this.storageService.secureStorage.getItem(key);
    };
    // Clear the local storage
    LocalService.prototype.clearToken = function () {
        return this.storageService.secureStorage.clear();
    };
    LocalService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocalService);
    return LocalService;
}());
exports.LocalService = LocalService;
