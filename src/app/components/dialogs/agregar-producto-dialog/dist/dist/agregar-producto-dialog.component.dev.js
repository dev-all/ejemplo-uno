"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

exports.__esModule = true;
exports.AgregarProductoDialogComponent = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var dialog_1 = require("@angular/material/dialog");

var AgregarProductoDialogComponent =
/** @class */
function () {
  function AgregarProductoDialogComponent(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.cantidadFormControl = new forms_1.FormControl(1);
    this.dialogData = this.data.agregarProducto;
  }

  AgregarProductoDialogComponent.prototype.ngOnInit = function () {};

  AgregarProductoDialogComponent.prototype.agregarProducto = function () {
    this.dialogRef.close(this.cantidadFormControl.value);
  };

  AgregarProductoDialogComponent = __decorate([core_1.Component({
    selector: 'app-agregar-producto-dialog',
    templateUrl: './agregar-producto-dialog.component.html',
    styleUrls: ['./agregar-producto-dialog.component.scss']
  }), __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))], AgregarProductoDialogComponent);
  return AgregarProductoDialogComponent;
}();

exports.AgregarProductoDialogComponent = AgregarProductoDialogComponent;