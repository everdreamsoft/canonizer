"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainEmoteFactory = void 0;
const EntityFactory_1 = require("../EntityFactory");
class BlockchainEmoteFactory extends EntityFactory_1.EntityFactory {
    constructor(sandra) {
        super('emoteEvent', 'emoteEventFile', sandra);
        this.is_a = 'emoteEvent';
        this.contained_in_file = 'emoteEventFile';
        this.updateOnExistingRef = sandra.get(BlockchainEmoteFactory.EVENT_BLOCK_TIME);
    }
}
exports.BlockchainEmoteFactory = BlockchainEmoteFactory;
BlockchainEmoteFactory.EMOTE_ID = "emoteId";
BlockchainEmoteFactory.EMOTE_SOURCE_ADDRESS = 'source';
BlockchainEmoteFactory.EVENT_BLOCK_TIME = 'timestamp';
BlockchainEmoteFactory.ON_BLOCKCHAIN = 'onBlockchain';
BlockchainEmoteFactory.EMOTE_BLOCK = 'onBlock';
BlockchainEmoteFactory.EMOTE_UNICODE = 'emote';
BlockchainEmoteFactory.TARGET_CONTRACT = "targetContract";
BlockchainEmoteFactory.TARGET_TOKEN = "targetToken";
BlockchainEmoteFactory.BLOCKCHAIN_EVENT_TYPE_VERB = "blockchainEventType";
//# sourceMappingURL=BlockchainEmoteFactory.js.map