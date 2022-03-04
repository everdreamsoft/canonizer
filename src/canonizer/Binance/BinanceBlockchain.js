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
exports.BinanceBlockchain = void 0;
var Blockchain_js_1 = require("../Blockchain.js");
var EntityFactory_js_1 = require("../../EntityFactory.js");
var BlockchainBlock_js_1 = require("../BlockchainBlock.js");
var BinanceBlockchain = /** @class */ (function (_super) {
    __extends(BinanceBlockchain, _super);
    function BinanceBlockchain(sandra) {
        var _this = _super.call(this, sandra) || this;
        _this.name = 'binance';
        _this.addressFactory.is_a = 'bscAddress';
        _this.addressFactory.contained_in_file = 'blockchainAddressFile';
        _this.addressFactory.onBlockchain = _this.name;
        _this.contractFactory.is_a = 'bscContract';
        _this.contractFactory.contained_in_file = 'blockchainContractFile';
        _this.blockFactory = new EntityFactory_js_1.EntityFactory(_this.getName() + "Block", "blockchainBlocFile", sandra, sandra.get(BlockchainBlock_js_1.BlockchainBlock.INDEX_SHORTNAME));
        return _this;
    }
    return BinanceBlockchain;
}(Blockchain_js_1.Blockchain));
exports.BinanceBlockchain = BinanceBlockchain;
