"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MagnumInputComponent = void 0;
var core_1 = require("@angular/core");
var MagnumInputComponent = /** @class */ (function () {
    function MagnumInputComponent() {
        this.type = 'text';
        this.inputChange = new core_1.EventEmitter();
        this.keyupEnter = new core_1.EventEmitter();
    }
    MagnumInputComponent.prototype.ngOnInit = function () { };
    MagnumInputComponent.prototype.input_Change = function (event) {
        this.inputChange.emit(event.target.value);
    };
    MagnumInputComponent.prototype.keyUpEnter = function (event) {
        this.keyupEnter.emit(event.target.value);
    };
    __decorate([
        core_1.Input()
    ], MagnumInputComponent.prototype, "inputFormControl");
    __decorate([
        core_1.Input()
    ], MagnumInputComponent.prototype, "placeHolder");
    __decorate([
        core_1.Input()
    ], MagnumInputComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], MagnumInputComponent.prototype, "ref");
    __decorate([
        core_1.Output()
    ], MagnumInputComponent.prototype, "inputChange");
    __decorate([
        core_1.Output()
    ], MagnumInputComponent.prototype, "keyupEnter");
    MagnumInputComponent = __decorate([
        core_1.Component({
            selector: 'app-magnum-input',
            templateUrl: './magnum-input.component.html',
            styleUrls: ['./magnum-input.component.scss']
        })
    ], MagnumInputComponent);
    return MagnumInputComponent;
}());
exports.MagnumInputComponent = MagnumInputComponent;
