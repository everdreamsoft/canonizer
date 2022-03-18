"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumBlockchain = void 0;
const Blockchain_js_1 = require("../Blockchain.js");
const EntityFactory_1 = require("../../EntityFactory");
const BlockchainBlock_1 = require("../BlockchainBlock");
class EthereumBlockchain extends Blockchain_js_1.Blockchain {
    constructor(sandra) {
        super(sandra);
        this.name = 'ethereum';
        this.addressFactory.is_a = 'ethAddress';
        this.addressFactory.contained_in_file = 'ethAddressFile';
        this.addressFactory.onBlockchain = this.name;
        this.contractFactory.is_a = 'ethContract';
        this.contractFactory.contained_in_file = 'ethContractFile';
        this.blockFactory = new EntityFactory_1.EntityFactory(this.getName() + "Bloc", "blockchainBlocFile", sandra, sandra.get(BlockchainBlock_1.BlockchainBlock.INDEX_SHORTNAME));
    }
}
exports.EthereumBlockchain = EthereumBlockchain;
//# sourceMappingURL=EthereumBlockchain.js.map