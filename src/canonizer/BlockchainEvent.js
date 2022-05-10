"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainEvent = void 0;
const Entity_js_1 = require("../Entity.js");
const Reference_js_1 = require("../Reference.js");
const Blockchain_js_1 = require("./Blockchain.js");
class BlockchainEvent extends Entity_js_1.Entity {
    constructor(factory, source, destination, contract, txid, timestamp, quantity, blockchain, blockId, token, sandra) {
        super(factory, [new Reference_js_1.Reference(sandra.get(Blockchain_js_1.Blockchain.TXID_CONCEPT_NAME), txid)]);
        this.eventType = 'transfer';
        if (typeof source == "string") {
            source = blockchain.addressFactory.getOrCreate(source);
        }
        if (typeof destination == "string") {
            destination = blockchain.addressFactory.getOrCreate(destination);
        }
        if (typeof contract == "string") {
            contract = blockchain.contractFactory.getOrCreate(contract);
        }
        this.setTriplet(BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB, this.eventType, sandra);
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainEvent.EVENT_BLOCK_TIME), timestamp));
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainEvent.QUANTITY), quantity));
        this.joinEntity(BlockchainEvent.EVENT_SOURCE_ADDRESS, source, sandra);
        this.joinEntity(BlockchainEvent.EVENT_DESTINATION_VERB, destination, sandra);
        //get or create the block
        let blockchainBlock = blockchain.blockFactory.getOrCreate(blockId, timestamp, blockchain);
        this.joinEntity(BlockchainEvent.EVENT_BLOCK, blockchainBlock, sandra);
        this.setTriplet(BlockchainEvent.ON_BLOCKCHAIN, blockchain.name, sandra);
        let refArray = [];
        if (token) {
            //we need to get the tokenpath data and add it as reference on the event
            let specifierMap = token.getSpecifierArray();
            for (let specifier of specifierMap) {
                refArray.push(new Reference_js_1.Reference(specifier[0], specifier[1]));
            }
        }
        this.joinEntity(BlockchainEvent.EVENT_SOURCE_CONTRACT, contract, sandra, refArray);
    }
}
exports.BlockchainEvent = BlockchainEvent;
BlockchainEvent.EVENT_SOURCE_ADDRESS = 'source';
BlockchainEvent.EVENT_DESTINATION_VERB = 'hasSingleDestination';
BlockchainEvent.EVENT_SOURCE_CONTRACT = 'blockchainContract';
BlockchainEvent.EVENT_BLOCK_TIME = 'timestamp';
BlockchainEvent.QUANTITY = 'quantity';
BlockchainEvent.ON_BLOCKCHAIN = 'onBlockchain';
BlockchainEvent.EVENT_BLOCK = 'onBlock';
BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB = "blockchainEventType";
//# sourceMappingURL=BlockchainEvent.js.map