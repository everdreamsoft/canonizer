"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainEventFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
const Blockchain_js_1 = require("./Blockchain.js");
class BlockchainEventFactory extends EntityFactory_js_1.EntityFactory {
    constructor(blockchain, sandra) {
        super('blockchainEvent', 'blockchainEventFile', sandra, sandra.get(Blockchain_js_1.Blockchain.TXID_CONCEPT_NAME));
    }
}
exports.BlockchainEventFactory = BlockchainEventFactory;
//# sourceMappingURL=BlockchainEventFactory.js.map