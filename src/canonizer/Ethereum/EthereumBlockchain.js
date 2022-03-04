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
exports.EthereumBlockchain = void 0;
var Blockchain_js_1 = require("../Blockchain.js");
var EntityFactory_1 = require("../../EntityFactory");
var BlockchainBlock_1 = require("../BlockchainBlock");
var EthereumBlockchain = /** @class */ (function (_super) {
    __extends(EthereumBlockchain, _super);
    function EthereumBlockchain(sandra) {
        var _this = _super.call(this, sandra) || this;
        _this.name = 'ethereum';
        _this.addressFactory.is_a = 'ethAddress';
        _this.addressFactory.contained_in_file = 'ethAddressFile';
        _this.addressFactory.onBlockchain = _this.name;
        _this.contractFactory.is_a = 'ethContract';
        _this.contractFactory.contained_in_file = 'ethContractFile';
        _this.blockFactory = new EntityFactory_1.EntityFactory(_this.getName() + "Block", "blockchainBlocFile", sandra, sandra.get(BlockchainBlock_1.BlockchainBlock.INDEX_SHORTNAME));
        return _this;
    }
    return EthereumBlockchain;
}(Blockchain_js_1.Blockchain));
exports.EthereumBlockchain = EthereumBlockchain;
