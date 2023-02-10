"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BonificacionComercialRequest = void 0;
var RequestBase_1 = require("../RequestBase");
var BonificacionComercialRequest = /** @class */ (function (_super) {
    __extends(BonificacionComercialRequest, _super);
    function BonificacionComercialRequest(init) {
        var _this = _super.call(this, init) || this;
        Object.assign(_this, init);
        return _this;
    }
    return BonificacionComercialRequest;
}(RequestBase_1.RequestBase));
exports.BonificacionComercialRequest = BonificacionComercialRequest;
