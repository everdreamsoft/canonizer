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
exports.BlockchainTokenFactory = void 0;
var EntityFactory_js_1 = require("../EntityFactory.js");
var BlockchainTokenFactory = /** @class */ (function (_super) {
    __extends(BlockchainTokenFactory, _super);
    function BlockchainTokenFactory(canonizeManager) {
        var _this = _super.call(this, 'tokenPath', 'tokenPathFile', canonizeManager.getSandra()) || this;
        _this.is_a = 'tokenPath';
        _this.contained_in_file = 'tokenPathFile';
        _this.updateOnExistingRef = canonizeManager.getSandra().get(BlockchainTokenFactory.ID);
        return _this;
    }
    BlockchainTokenFactory.ID = 'code';
    return BlockchainTokenFactory;
}(EntityFactory_js_1.EntityFactory));
exports.BlockchainTokenFactory = BlockchainTokenFactory;
