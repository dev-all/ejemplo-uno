"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SelectOption = exports.MagnumSelectComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MagnumSelectComponent = /** @class */ (function () {
    function MagnumSelectComponent() {
        this.selectChange = new core_1.EventEmitter();
        this.selectOpen = new core_1.EventEmitter();
        this.filterChange = new core_1.EventEmitter();
        this.filterCtrl = new forms_1.FormControl();
    }
    MagnumSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filterCtrl.valueChanges.subscribe(function () {
            _this.filterChange.emit(_this.filterCtrl.value.toLowerCase());
        });
    };
    MagnumSelectComponent.prototype.onChange = function () {
        this.selectChange.emit(this.itemSelected);
    };
    MagnumSelectComponent.prototype.onOpen = function () {
        this.selectOpen.emit();
    };
    __decorate([
        core_1.Input()
    ], MagnumSelectComponent.prototype, "text");
    __decorate([
        core_1.Input()
    ], MagnumSelectComponent.prototype, "itemSelected");
    __decorate([
        core_1.Input()
    ], MagnumSelectComponent.prototype, "options");
    __decorate([
        core_1.Input()
    ], MagnumSelectComponent.prototype, "showSearchBar");
    __decorate([
        core_1.Output()
    ], MagnumSelectComponent.prototype, "selectChange");
    __decorate([
        core_1.Output()
    ], MagnumSelectComponent.prototype, "selectOpen");
    __decorate([
        core_1.Output()
    ], MagnumSelectComponent.prototype, "filterChange");
    MagnumSelectComponent = __decorate([
        core_1.Component({
            selector: 'app-magnum-select',
            templateUrl: './magnum-select.component.html',
            styleUrls: ['./magnum-select.component.scss']
        })
    ], MagnumSelectComponent);
    return MagnumSelectComponent;
}());
exports.MagnumSelectComponent = MagnumSelectComponent;
var SelectOption = /** @class */ (function () {
    function SelectOption(init) {
        Object.assign(this, init);
    }
    return SelectOption;
}());
exports.SelectOption = SelectOption;
