"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainContract = void 0;
const Entity_js_1 = require("../Entity.js");
const Reference_js_1 = require("../Reference.js");
const BlockchainContractFactory_js_1 = require("./BlockchainContractFactory.js");
class BlockchainContract extends Entity_js_1.Entity {
    constructor(factory, id, sandraManager, standard = null) {
        if (factory == null)
            factory = new BlockchainContractFactory_js_1.BlockchainContractFactory(sandraManager);
        super(factory, [new Reference_js_1.Reference(sandraManager.get('id'), id)]);
        //if the contract has a standard we bind it
        if (standard) {
            this.joinEntity('contractStandard', standard, sandraManager);
        }
    }
    bindToCollection(collection) {
        this.joinEntity(BlockchainContractFactory_js_1.BlockchainContractFactory.JOIN_COLLECTION, collection, this.factory.sandraManager);
        return this;
    }
    setStandard(standard) {
        this.joinEntity(BlockchainContractFactory_js_1.BlockchainContractFactory.CONTRACT_STANDARD, standard, this.factory.sandraManager);
        return this;
    }
    setBlockchain(name) {
        this.setTriplet(BlockchainContractFactory_js_1.BlockchainContractFactory.ON_BLOCKCHAIN_VERB, name, this.factory.sandraManager);
        return this;
    }
    getStandard() {
        return this.getJoinedEntitiesOnVerb(BlockchainContractFactory_js_1.BlockchainContractFactory.CONTRACT_STANDARD);
    }
}
exports.BlockchainContract = BlockchainContract;
//# sourceMappingURL=BlockchainContract.js.map