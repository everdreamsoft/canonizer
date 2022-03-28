"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceBlockchain = void 0;
const Blockchain_js_1 = require("../Blockchain.js");
class BinanceBlockchain extends Blockchain_js_1.Blockchain {
    constructor(sandra) {
        super(sandra, "binance");
        this.addressFactory.is_a = 'bscAddress';
        this.addressFactory.contained_in_file = 'bscAddressFile';
        this.addressFactory.onBlockchain = this.name;
        this.contractFactory.is_a = 'bscContract';
        this.contractFactory.contained_in_file = 'blockchainContractFile';
    }
}
exports.BinanceBlockchain = BinanceBlockchain;
//# sourceMappingURL=BinanceBlockchain.js.map