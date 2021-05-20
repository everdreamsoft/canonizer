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
import { Entity } from "../Entity.js";
import { Reference } from "../Reference.js";
import { Blockchain } from "./Blockchain.js";
import { BlockchainBlock } from "./BlockchainBlock.js";
var BlockchainEvent = /** @class */ (function (_super) {
    __extends(BlockchainEvent, _super);
    function BlockchainEvent(factory, source, destination, contract, txid, timestamp, quantity, blockchain, blockId, token, sandra) {
        var _this = _super.call(this, factory) || this;
        _this.eventType = 'transfer';
        _this.addReference(new Reference(sandra.get(Blockchain.TXID_CONCEPT_NAME), txid));
        if (typeof source == "string") {
            source = blockchain.addressFactory.getOrCreate(source);
        }
        if (typeof destination == "string") {
            destination = blockchain.addressFactory.getOrCreate(destination);
        }
        if (typeof contract == "string") {
            contract = blockchain.contractFactory.getOrCreate(contract);
        }
        _this.setTriplet(BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB, _this.eventType, sandra);
        _this.addReference(new Reference(sandra.get(BlockchainEvent.EVENT_BLOCK_TIME), timestamp));
        _this.addReference(new Reference(sandra.get(BlockchainEvent.QUANTITY), quantity));
        _this.joinEntity(BlockchainEvent.EVENT_SOURCE_ADDRESS, source, sandra);
        _this.joinEntity(BlockchainEvent.EVENT_DESTINATION_VERB, destination, sandra);
        //create the block
        var blockchainBlock = new BlockchainBlock(blockchain.blockFactory, blockId, timestamp, sandra);
        _this.joinEntity(BlockchainEvent.EVENT_BLOCK, blockchainBlock, sandra);
        _this.setTriplet(BlockchainEvent.ON_BLOCKCHAIN, blockchain.name, sandra);
        var refArray = [];
        if (token) {
            //we need to get the tokenpath data and add it as reference on the event
            var specifierMap = token.getSpecifierArray();
            for (var _i = 0, specifierMap_1 = specifierMap; _i < specifierMap_1.length; _i++) {
                var specifier = specifierMap_1[_i];
                console.log(specifier[0]);
                refArray.push(new Reference(specifier[0], specifier[1]));
            }
        }
        _this.joinEntity(BlockchainEvent.EVENT_SOURCE_CONTRACT, contract, sandra, refArray);
        return _this;
    }
    BlockchainEvent.EVENT_SOURCE_ADDRESS = 'source';
    BlockchainEvent.EVENT_DESTINATION_VERB = 'hasSingleDestination';
    BlockchainEvent.EVENT_SOURCE_CONTRACT = 'blockchainContract';
    BlockchainEvent.EVENT_BLOCK_TIME = 'timestamp';
    BlockchainEvent.QUANTITY = 'quantity';
    BlockchainEvent.ON_BLOCKCHAIN = 'onBlockchain';
    BlockchainEvent.EVENT_BLOCK = 'onBlock';
    BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB = "blockchainEventType";
    return BlockchainEvent;
}(Entity));
export { BlockchainEvent };
//# sourceMappingURL=BlockchainEvent.js.map