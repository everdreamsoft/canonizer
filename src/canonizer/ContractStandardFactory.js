"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ContractStandardFactory = void 0;
var EntityFactory_js_1 = require("../EntityFactory.js");
var ContractStandardFactory = /** @class */ (function (_super) {
    __extends(ContractStandardFactory, _super);
    function ContractStandardFactory(sandra) {
        var _this = _super.call(this, 'blockchainContract', 'blockchainStandardFile', sandra) || this;
        _this.is_a = 'blockchainStandard';
        _this.contained_in_file = 'blockchainStandardFile';
        _this.updateOnExistingRef = sandra.get('class_name');
        return _this;
    }
    return ContractStandardFactory;
}(EntityFactory_js_1.EntityFactory));
exports.ContractStandardFactory = ContractStandardFactory;
