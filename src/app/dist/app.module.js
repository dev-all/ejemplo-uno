"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
var api_interceptor_service_1 = require("./interceptors/api.interceptor.service");
var common_1 = require("@angular/common");
var es_AR_1 = require("@angular/common/locales/es-AR");
var dialog_1 = require("@angular/material/dialog");
common_1.registerLocaleData(es_AR_1["default"], 'es-AR');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                common_1.CommonModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                dialog_1.MatDialogModule
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: api_interceptor_service_1.ApiInterceptorService,
                    multi: true
                },
                { provide: core_1.LOCALE_ID, useValue: 'es-AR' },
                { provide: common_1.APP_BASE_HREF, useValue: '/' },
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
