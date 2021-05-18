"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityFactory_1 = require("../EntityFactory");
const Blockchain_1 = require("./Blockchain");
class BlockchainOrderFactory extends EntityFactory_1.EntityFactory {
    constructor(blockchain, sandra) {
        super('BlockchainOrder', 'blockchainOrderFile', sandra);
        this.updateOnExistingRef = sandra.get(Blockchain_1.Blockchain.TXID_CONCEPT_NAME);
    }
}
exports.BlockchainOrderFactory = BlockchainOrderFactory;
//# sourceMappingURL=BlockchainOrderFactory.js.map