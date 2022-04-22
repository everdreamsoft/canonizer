"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumBlockchain = void 0;
const Blockchain_js_1 = require("../Blockchain.js");
class EthereumBlockchain extends Blockchain_js_1.Blockchain {
    constructor(sandra) {
        super(sandra, 'ethereum');
        this.addressFactory.is_a = 'ethAddress';
        this.addressFactory.contained_in_file = 'ethAddressFile';
        this.addressFactory.onBlockchain = this.name;
        this.contractFactory.is_a = 'ethContract';
        this.contractFactory.contained_in_file = 'blockchainContractFile';
    }
}
exports.EthereumBlockchain = EthereumBlockchain;
//# sourceMappingURL=EthereumBlockchain.js.map