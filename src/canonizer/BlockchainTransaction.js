"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainTransaction = void 0;
const Entity_js_1 = require("../Entity.js");
const Reference_js_1 = require("../Reference.js");
const BlockchainBlock_1 = require("./BlockchainBlock");
class BlockchainTransaction extends Entity_js_1.Entity {
    constructor(factory, txId, timestamp, blockId, blockchainEvents, blockchain, sandra) {
        super(factory, [new Reference_js_1.Reference(sandra.get(BlockchainTransaction.TX_ID), txId)]);
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainTransaction.EVENT_BLOCK_TIME), timestamp));
        let blockchainBlock = new BlockchainBlock_1.BlockchainBlock(blockchain.blockFactory, blockId, timestamp, blockchain, sandra);
        this.joinEntity(BlockchainTransaction.EVENT_BLOCK, blockchainBlock, sandra);
        blockchainEvents.forEach(event => {
            this.joinEntity(BlockchainTransaction.JOINED_EVENT, event, sandra);
        });
        this.setTriplet(BlockchainTransaction.ON_BLOCKCHAIN, blockchain.name, sandra);
    }
}
exports.BlockchainTransaction = BlockchainTransaction;
BlockchainTransaction.ON_BLOCKCHAIN = 'onBlockchain';
// refs
BlockchainTransaction.TX_ID = 'txHash';
BlockchainTransaction.EVENT_BLOCK_TIME = 'timestamp';
// joined
BlockchainTransaction.EVENT_BLOCK = 'onBlock';
BlockchainTransaction.JOINED_EVENT = 'joinedEvent';
//# sourceMappingURL=BlockchainTransaction.js.map