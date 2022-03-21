"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const BlockchainAddressFactory_js_1 = require("./BlockchainAddressFactory.js");
const BlockchainContractFactory_js_1 = require("./BlockchainContractFactory.js");
const BlockchainEventFactory_js_1 = require("./BlockchainEventFactory.js");
const BlockchainEmoteFactory_1 = require("./BlockchainEmoteFactory");
const BlockchainOrderFactory_1 = require("./BlockchainOrderFactory");
const ChangeIssuerFactory_1 = require("./ChangeIssuerFactory");
const BlockchainTransactionFactory_1 = require("./BlockchainTransactionFactory");
const BlockchainBlockFactory_1 = require("./BlockchainBlockFactory");
class Blockchain {
    constructor(sandra, name = 'genericBlockchain') {
        this.name = 'genericBlockchain';
        this.name = name;
        this.addressFactory = new BlockchainAddressFactory_js_1.BlockchainAddressFactory(sandra);
        this.contractFactory = new BlockchainContractFactory_js_1.BlockchainContractFactory(sandra);
        this.eventFactory = new BlockchainEventFactory_js_1.BlockchainEventFactory(this, sandra);
        this.blockFactory = new BlockchainBlockFactory_1.BlockchainBlockFactory(this.getName(), sandra);
        this.emoteFactory = new BlockchainEmoteFactory_1.BlockchainEmoteFactory(sandra);
        this.orderFactory = new BlockchainOrderFactory_1.BlockchainOrderFactory(sandra);
        this.changeIssuerFactory = new ChangeIssuerFactory_1.ChangeIssuerFactory(sandra);
        this.transactionFactory = new BlockchainTransactionFactory_1.BlockchainTransactionFactory(sandra);
    }
    getName() {
        return this.name;
    }
}
exports.Blockchain = Blockchain;
Blockchain.TXID_CONCEPT_NAME = 'txHash';
//# sourceMappingURL=Blockchain.js.map