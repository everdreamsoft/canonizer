"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainContractFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
const BlockchainContract_js_1 = require("./BlockchainContract.js");
class BlockchainContractFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super('blockchainContract', 'blockchainContractFile', sandra, sandra.get(BlockchainContractFactory.ID));
        this.contained_in_file = 'blockchainContractFile';
    }
    getOrCreate(id) {
        const contracts = this.getEntitiesWithRefValue(this.sandraManager.get(BlockchainContractFactory.ID), id);
        return contracts && (contracts === null || contracts === void 0 ? void 0 : contracts.length) > 0 ? contracts[0] : new BlockchainContract_js_1.BlockchainContract(this, id, this.sandraManager);
    }
}
exports.BlockchainContractFactory = BlockchainContractFactory;
BlockchainContractFactory.ID = 'id';
BlockchainContractFactory.JOIN_COLLECTION = 'inCollection';
BlockchainContractFactory.EXPLICIT_TOKEN_LISTING_SHORTNAME = 'explicitListing';
BlockchainContractFactory.CONTRACT_STANDARD = 'contractStandard';
BlockchainContractFactory.ON_BLOCKCHAIN_VERB = 'onBlockchain';
//# sourceMappingURL=BlockchainContractFactory.js.map