var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EntityFactory } from "../EntityFactory.js";
import { Blockchain } from "./Blockchain.js";
var BlockchainEventFactory = /** @class */ (function (_super) {
    __extends(BlockchainEventFactory, _super);
    function BlockchainEventFactory(blockchain, sandra) {
        var _this = _super.call(this, 'blockchainEvent', 'blockchainEventFile', sandra) || this;
        _this.updateOnExistingRef = sandra.get(Blockchain.TXID_CONCEPT_NAME);
        return _this;
        // this.joinFactory(blockchain.addressFactory,BlockchainEvent.EVENT_SOURCE_ADDRESS);
        // this.joinFactory(blockchain.addressFactory,BlockchainEvent.EVENT_DESTINATION_VERB);
        // this.joinFactory(blockchain.contractFactory,BlockchainEvent.EVENT_SOURCE_CONTRACT);
        // this.joinFactory(blockchain.blockFactory,BlockchainEvent.EVENT_BLOCK);
    }
    return BlockchainEventFactory;
}(EntityFactory));
export { BlockchainEventFactory };
//# sourceMappingURL=BlockchainEventFactory.js.map