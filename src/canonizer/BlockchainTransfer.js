"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainTransfer = void 0;
const BlockchainEventFactory_js_1 = require("./BlockchainEventFactory.js");
const Reference_js_1 = require("../Reference.js");
const Blockchain_js_1 = require("./Blockchain.js");
const BlockchainEvent_js_1 = require("./BlockchainEvent.js");
class BlockchainTransfer extends BlockchainEvent_js_1.BlockchainEvent {
    constructor(factory, source, destination, contract, txid, timestamp, quantity, blockchain, blockId, token, sandra) {
        if (factory == null)
            factory = new BlockchainEventFactory_js_1.BlockchainEventFactory(blockchain, sandra);
        let txidRef = new Reference_js_1.Reference(sandra.get(Blockchain_js_1.Blockchain.TXID_CONCEPT_NAME), txid);
        super(factory, [txidRef]);
        if (typeof source == "string") {
            source = blockchain.addressFactory.getOrCreate(source);
        }
        if (typeof destination == "string") {
            destination = blockchain.addressFactory.getOrCreate(destination);
        }
        if (typeof contract == "string") {
            contract = blockchain.contractFactory.getOrCreate(contract);
        }
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainEvent_js_1.BlockchainEvent.EVENT_BLOCK_TIME), timestamp));
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainEvent_js_1.BlockchainEvent.QUANTITY), quantity));
        this.joinEntity(BlockchainEvent_js_1.BlockchainEvent.EVENT_SOURCE_ADDRESS, source, sandra);
        this.joinEntity(BlockchainEvent_js_1.BlockchainEvent.EVENT_DESTINATION_VERB, destination, sandra);
        //create the block
        const blockchainBlock = blockchain.blockFactory.getOrCreate(blockId).addOrUpdateTimestamp(timestamp, blockchain.getName());
        this.joinEntity(BlockchainEvent_js_1.BlockchainEvent.EVENT_BLOCK, blockchainBlock, sandra);
        this.setTriplet(BlockchainEvent_js_1.BlockchainEvent.ON_BLOCKCHAIN, blockchain.name, sandra);
        let refArray = [];
        if (token) {
            //we need to get the tokenpath data and add it as reference on the event
            let specifierMap = token.getSpecifierArray();
            for (let specifier of specifierMap) {
                console.log(specifier[0]);
                refArray.push(new Reference_js_1.Reference(specifier[0], specifier[1]));
            }
        }
        this.joinEntity(BlockchainEvent_js_1.BlockchainEvent.EVENT_SOURCE_CONTRACT, contract, sandra, refArray);
    }
}
exports.BlockchainTransfer = BlockchainTransfer;
BlockchainTransfer.EVENT_SOURCE_ADDRESS = 'source';
BlockchainTransfer.EVENT_DESTINATION_VERB = 'hasSingleDestination';
BlockchainTransfer.EVENT_SOURCE_CONTRACT = 'blockchainContract';
BlockchainTransfer.EVENT_BLOCK_TIME = 'timestamp';
BlockchainTransfer.QUANTITY = 'quantity';
BlockchainTransfer.ON_BLOCKCHAIN = 'onBlockchain';
BlockchainTransfer.EVENT_BLOCK = 'onBlock';
//# sourceMappingURL=BlockchainTransfer.js.map