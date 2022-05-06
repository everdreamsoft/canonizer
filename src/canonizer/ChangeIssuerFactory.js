"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeIssuerFactory = void 0;
const Blockchain_1 = require("./Blockchain");
const EntityFactory_1 = require("../EntityFactory");
class ChangeIssuerFactory extends EntityFactory_1.EntityFactory {
    constructor(sandra) {
        super('changeIssuer', 'changeIssuerFile', sandra, sandra.get(Blockchain_1.Blockchain.TXID_CONCEPT_NAME));
        this.is_a = "changeIssuer";
        this.contained_in_file = "changeIssuerFile";
    }
}
exports.ChangeIssuerFactory = ChangeIssuerFactory;
ChangeIssuerFactory.EVENT_SOURCE_ADDRESS = 'source';
ChangeIssuerFactory.EVENT_BLOCK_TIME = 'timestamp';
ChangeIssuerFactory.ON_BLOCKCHAIN = 'onBlockchain';
ChangeIssuerFactory.EVENT_BLOCK = 'onBlock';
ChangeIssuerFactory.NEW_ISSUER = 'newIssuer';
ChangeIssuerFactory.COLLECTION_ID = 'collectionId';
//# sourceMappingURL=ChangeIssuerFactory.js.map