import { BlockchainAddressFactory } from "./BlockchainAddressFactory.js";
import { BlockchainContractFactory } from "./BlockchainContractFactory.js";
import { BlockchainEventFactory } from "./BlockchainEventFactory.js";
import { EntityFactory } from "../EntityFactory.js";
import { BlockchainBlock } from "./BlockchainBlock.js";
var Blockchain = /** @class */ (function () {
    function Blockchain(sandra, name) {
        if (name === void 0) { name = 'genericBlockchain'; }
        this.name = 'genericBlockchain';
        this.name = name;
        this.addressFactory = new BlockchainAddressFactory(sandra);
        this.contractFactory = new BlockchainContractFactory(sandra);
        this.eventFactory = new BlockchainEventFactory(this, sandra);
        this.blockFactory = new EntityFactory(this.getName() + "Block", "blockchainBlocFile", sandra, sandra.get(BlockchainBlock.INDEX_SHORTNAME));
    }
    Blockchain.prototype.getName = function () {
        return this.name;
    };
    Blockchain.TXID_CONCEPT_NAME = 'txHash';
    return Blockchain;
}());
export { Blockchain };
//# sourceMappingURL=Blockchain.js.map