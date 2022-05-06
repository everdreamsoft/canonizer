"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainAddressFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
const BlockchainAddress_js_1 = require("./BlockchainAddress.js");
class BlockchainAddressFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super('blockchainAddress', 'blockchainAddressFile', sandra, sandra.get(BlockchainAddressFactory.ID));
        this.is_a = 'blockchainAddress';
        this.contained_in_file = 'blockchainAddressFile';
        this.onBlockchain = 'genericBlockchain';
        this.sandra = sandra;
    }
    getOrCreate(address) {
        const addresses = this.getEntitiesWithRefValue(this.sandraManager.get(BlockchainAddressFactory.ID), address);
        return addresses && (addresses === null || addresses === void 0 ? void 0 : addresses.length) > 0 ? addresses[0] : new BlockchainAddress_js_1.BlockchainAddress(this, address, this.sandraManager);
    }
}
exports.BlockchainAddressFactory = BlockchainAddressFactory;
BlockchainAddressFactory.ON_BLOCKCHAIN = 'onBlockchain';
BlockchainAddressFactory.ID = "address";
//# sourceMappingURL=BlockchainAddressFactory.js.map