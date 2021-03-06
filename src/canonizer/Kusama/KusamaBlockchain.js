"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KusamaBlockchain = void 0;
const Blockchain_js_1 = require("../Blockchain.js");
const EntityFactory_js_1 = require("../../EntityFactory.js");
const BlockchainBlock_js_1 = require("../BlockchainBlock.js");
class KusamaBlockchain extends Blockchain_js_1.Blockchain {
    constructor(sandra) {
        super(sandra);
        this.name = 'kusama';
        this.addressFactory.is_a = 'kusamaAddress';
        this.addressFactory.contained_in_file = 'blockchainAddressFile';
        this.addressFactory.onBlockchain = this.name;
        this.contractFactory.is_a = 'rmrkContract';
        this.contractFactory.contained_in_file = 'blockchainContractFile';
        this.blockFactory = new EntityFactory_js_1.EntityFactory(this.getName() + "Block", "blockchainBlocFile", sandra, sandra.get(BlockchainBlock_js_1.BlockchainBlock.INDEX_SHORTNAME));
    }
}
exports.KusamaBlockchain = KusamaBlockchain;
//# sourceMappingURL=KusamaBlockchain.js.map