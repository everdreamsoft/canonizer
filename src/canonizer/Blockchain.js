"use strict";
exports.__esModule = true;
exports.Blockchain = void 0;
var BlockchainAddressFactory_js_1 = require("./BlockchainAddressFactory.js");
var BlockchainContractFactory_js_1 = require("./BlockchainContractFactory.js");
var BlockchainEventFactory_js_1 = require("./BlockchainEventFactory.js");
var EntityFactory_js_1 = require("../EntityFactory.js");
var BlockchainBlock_js_1 = require("./BlockchainBlock.js");
var BlockchainEmoteFactory_1 = require("./BlockchainEmoteFactory");
var BlockchainOrderFactory_1 = require("./BlockchainOrderFactory");
var ChangeIssuerFactory_1 = require("./ChangeIssuerFactory");
var BlockchainTransactionFactory_1 = require("./BlockchainTransactionFactory");
var Blockchain = /** @class */ (function () {
    function Blockchain(sandra, name) {
        if (name === void 0) { name = 'genericBlockchain'; }
        this.name = 'genericBlockchain';
        this.name = name;
        this.addressFactory = new BlockchainAddressFactory_js_1.BlockchainAddressFactory(sandra);
        this.contractFactory = new BlockchainContractFactory_js_1.BlockchainContractFactory(sandra);
        this.eventFactory = new BlockchainEventFactory_js_1.BlockchainEventFactory(this, sandra);
        this.blockFactory = new EntityFactory_js_1.EntityFactory(this.getName() + "Block", "blockchainBlocFile", sandra, sandra.get(BlockchainBlock_js_1.BlockchainBlock.INDEX_SHORTNAME));
        this.emoteFactory = new BlockchainEmoteFactory_1.BlockchainEmoteFactory(sandra);
        this.orderFactory = new BlockchainOrderFactory_1.BlockchainOrderFactory(sandra);
        this.changeIssuerFactory = new ChangeIssuerFactory_1.ChangeIssuerFactory(sandra);
        this.transactionFactory = new BlockchainTransactionFactory_1.BlockchainTransactionFactory(sandra);
    }
    Blockchain.prototype.getName = function () {
        return this.name;
    };
    Blockchain.TXID_CONCEPT_NAME = 'txHash';
    return Blockchain;
}());
exports.Blockchain = Blockchain;
