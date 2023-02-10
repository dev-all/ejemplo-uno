"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiInterceptorService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ApiInterceptorService = /** @class */ (function () {
    function ApiInterceptorService(spinnerService, snackBarService, userService, router) {
        this.spinnerService = spinnerService;
        this.snackBarService = snackBarService;
        this.userService = userService;
        this.router = router;
        this.service_count = 0;
    }
    ApiInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        var tokenEndpoint = req.url.split('/').find(function (x) { return x === 'token'; });
        var accesoEndPoint = req.url.split('/').find(function (x) { return x === 'getByVendedor'; });
        if (!tokenEndpoint && !accesoEndPoint) {
            req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + this.userService.getUserToken()
                }
            });
        }
        this.service_count++;
        this.spinnerService.showSpinner();
        if (!this.spinnerService.value())
            this.spinnerService.showSpinner();
        return next
            .handle(req)
            .pipe(operators_1.finalize(function () {
            _this.service_count--;
            if (_this.service_count == 0) {
                _this.spinnerService.hideSpinner();
            }
        }))
            .pipe(operators_1.catchError(function (err) {
            // this.snackBarService.showSnackBar(
            //   'Ha ocurrido un error en la comunicacion con el servidor',JSON.stringify(err)
            // );
            console.log(err);
            _this.spinnerService.hideSpinner();
            _this.snackBarService.showSnackBar('Error en los servicios');
            if (err.status === 401) {
                _this.userService.removeUserValue();
                _this.router.navigate(['login']);
            }
            return rxjs_1.throwError(err);
        }));
    };
    ApiInterceptorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiInterceptorService);
    return ApiInterceptorService;
}());
exports.ApiInterceptorService = ApiInterceptorService;
