"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainTransactionFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
const Blockchain_js_1 = require("./Blockchain.js");
class BlockchainTransactionFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super('blockchainTransaction', 'blockchainTransactionFile', sandra);
        this.updateOnExistingRef = sandra.get(Blockchain_js_1.Blockchain.TXID_CONCEPT_NAME);
    }
}
exports.BlockchainTransactionFactory = BlockchainTransactionFactory;
//# sourceMappingURL=BlockchainTransactionFactory.js.map