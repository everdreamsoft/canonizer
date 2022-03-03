"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeIssuer = void 0;
const Entity_1 = require("../Entity");
const ChangeIssuerFactory_1 = require("./ChangeIssuerFactory");
const Blockchain_1 = require("./Blockchain");
const Reference_1 = require("../Reference");
const BlockchainEvent_1 = require("./BlockchainEvent");
const BlockchainBlock_1 = require("./BlockchainBlock");
class ChangeIssuer extends Entity_1.Entity {
    constructor(factory, source, collectionId, newIssuer, txId, timestamp, blockId, blockchain, sandra) {
        super(factory, [new Reference_1.Reference(sandra.get(Blockchain_1.Blockchain.TXID_CONCEPT_NAME), txId)]);
        this.eventType = "changeIssuer";
        this.addReference(new Reference_1.Reference(sandra.get(ChangeIssuerFactory_1.ChangeIssuerFactory.COLLECTION_ID), collectionId));
        if (typeof source == "string") {
            source = blockchain.addressFactory.getOrCreate(source);
        }
        if (typeof newIssuer == "string") {
            newIssuer = blockchain.addressFactory.getOrCreate(newIssuer);
        }
        this.addReference(new Reference_1.Reference(sandra.get(ChangeIssuerFactory_1.ChangeIssuerFactory.EVENT_BLOCK_TIME), timestamp));
        this.setTriplet(ChangeIssuerFactory_1.ChangeIssuerFactory.ON_BLOCKCHAIN, blockchain.name, sandra);
        this.setTriplet(BlockchainEvent_1.BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB, this.eventType, sandra);
        const blockchainBlock = new BlockchainBlock_1.BlockchainBlock(blockchain.blockFactory, blockId, timestamp, sandra);
        this.joinEntity(ChangeIssuerFactory_1.ChangeIssuerFactory.EVENT_BLOCK, blockchainBlock, sandra);
        this.joinEntity(ChangeIssuerFactory_1.ChangeIssuerFactory.EVENT_SOURCE_ADDRESS, source, sandra);
        this.joinEntity(ChangeIssuerFactory_1.ChangeIssuerFactory.NEW_ISSUER, newIssuer, sandra);
    }
}
exports.ChangeIssuer = ChangeIssuer;
//# sourceMappingURL=ChangeIssuer.js.map