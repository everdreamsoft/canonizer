"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KusamaBlockchain = void 0;
const Blockchain_js_1 = require("../../Blockchain.js");
const BlockchainBlockFactory_1 = require("../../BlockchainBlockFactory");
class KusamaBlockchain extends Blockchain_js_1.Blockchain {
    constructor(sandra) {
        super(sandra, 'kusama');
        this.name = 'kusama';
        this.name = 'kusama';
        this.addressFactory.is_a = 'kusamaAddress';
        this.addressFactory.contained_in_file = 'blockchainAddressFile';
        this.addressFactory.onBlockchain = this.name;
        this.contractFactory.is_a = 'rmrkContract';
        this.contractFactory.contained_in_file = 'blockchainContractFile';
        this.blockFactory = new BlockchainBlockFactory_1.BlockchainBlockFactory(sandra); //new EntityFactory(this.getName()+"Block","blockchainBlocFile",sandra,sandra.get(BlockchainBlock.INDEX_SHORTNAME));
    }
}
exports.KusamaBlockchain = KusamaBlockchain;
//# sourceMappingURL=KusamaBlockchain.js.map