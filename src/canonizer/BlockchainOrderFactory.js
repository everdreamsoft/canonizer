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
exports.BlockchainOrderFactory = void 0;
var EntityFactory_1 = require("../EntityFactory");
var Blockchain_1 = require("./Blockchain");
var BlockchainOrderFactory = /** @class */ (function (_super) {
    __extends(BlockchainOrderFactory, _super);
    function BlockchainOrderFactory(sandra) {
        var _this = _super.call(this, 'blockchainOrder', 'blockchainOrderFile', sandra) || this;
        _this.updateOnExistingRef = sandra.get(Blockchain_1.Blockchain.TXID_CONCEPT_NAME);
        return _this;
    }
    BlockchainOrderFactory.EVENT_SOURCE_ADDRESS = 'source';
    BlockchainOrderFactory.EVENT_BLOCK_TIME = 'timestamp';
    BlockchainOrderFactory.ON_BLOCKCHAIN = 'onBlockchain';
    BlockchainOrderFactory.EVENT_BLOCK = 'onBlock';
    BlockchainOrderFactory.BUY_AMOUNT = "buyAmount";
    BlockchainOrderFactory.SELL_PRICE = "sellPrice";
    BlockchainOrderFactory.BUY_TOTAL = "buyTotal";
    BlockchainOrderFactory.ORDER_BUY_CONTRACT = "buyContract";
    BlockchainOrderFactory.ORDER_SELL_CONTRACT = "sellContract";
    BlockchainOrderFactory.BUY_DESTINATION = "buyDestination";
    BlockchainOrderFactory.TOKEN_BUY = "tokenBuy";
    BlockchainOrderFactory.TOKEN_SELL = "tokenSell";
    return BlockchainOrderFactory;
}(EntityFactory_1.EntityFactory));
exports.BlockchainOrderFactory = BlockchainOrderFactory;
