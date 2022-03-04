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
exports.BlockchainTransactionFactory = void 0;
var EntityFactory_js_1 = require("../EntityFactory.js");
var Blockchain_js_1 = require("./Blockchain.js");
var BlockchainTransactionFactory = /** @class */ (function (_super) {
    __extends(BlockchainTransactionFactory, _super);
    function BlockchainTransactionFactory(sandra) {
        var _this = _super.call(this, 'blockchainTransaction', 'blockchainTransactionFile', sandra) || this;
        _this.updateOnExistingRef = sandra.get(Blockchain_js_1.Blockchain.TXID_CONCEPT_NAME);
        return _this;
    }
    return BlockchainTransactionFactory;
}(EntityFactory_js_1.EntityFactory));
exports.BlockchainTransactionFactory = BlockchainTransactionFactory;
