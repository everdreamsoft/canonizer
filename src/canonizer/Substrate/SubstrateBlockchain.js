"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Blockchain_js_1 = require("../Blockchain.js");
class SubstrateBlockchain extends Blockchain_js_1.Blockchain {
    constructor(sandra) {
        super(sandra);
        this.addressFactory.is_a = 'substrateAddress';
        this.addressFactory.contained_in_file = 'substrateAddressFile';
    }
}
exports.SubstrateBlockchain = SubstrateBlockchain;
SubstrateBlockchain.blockchainName = 'substrate';
//# sourceMappingURL=SubstrateBlockchain.js.map