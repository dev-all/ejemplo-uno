"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListaInputsComponent = void 0;
var core_1 = require("@angular/core");
var ListaInputsComponent = /** @class */ (function () {
    function ListaInputsComponent(renderer2) {
        this.renderer2 = renderer2;
        this.listaChange_Event = new core_1.EventEmitter();
    }
    ListaInputsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unlistener = this.renderer2.listen('body', 'click', function (e) {
            var listaEvent = e.target.getAttribute('listaInput');
            if (listaEvent) {
                var spanEvent = e.target.parentElement.parentElement.parentElement.getAttribute('listaInput');
                var checkEvent = e.target.parentElement.parentElement.getAttribute('listaInput');
                if (!listaEvent && !checkEvent && !spanEvent) {
                    _this.mostrarLista = false;
                }
            }
        });
    };
    ListaInputsComponent.prototype.ngOnDestroy = function () {
        this.unlistener();
    };
    ListaInputsComponent.prototype.listChange = function (input) {
        var inputDinamico = input.options[0].value;
        if (inputDinamico.isDefault ||
            inputDinamico.isDefault ||
            inputDinamico.isDefault ||
            inputDinamico.isDefault) {
            input.options[0].selected = true;
            return;
        }
        inputDinamico.checked = !inputDinamico.checked;
        this.listaChange_Event.emit(inputDinamico);
    };
    __decorate([
        core_1.Input()
    ], ListaInputsComponent.prototype, "listaInputs");
    __decorate([
        core_1.Output()
    ], ListaInputsComponent.prototype, "listaChange_Event");
    ListaInputsComponent = __decorate([
        core_1.Component({
            selector: 'app-lista-inputs',
            templateUrl: './lista-inputs.component.html',
            styleUrls: ['./lista-inputs.component.scss']
        })
    ], ListaInputsComponent);
    return ListaInputsComponent;
}());
exports.ListaInputsComponent = ListaInputsComponent;
