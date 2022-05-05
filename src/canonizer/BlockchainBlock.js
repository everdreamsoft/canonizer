"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainBlock = void 0;
const Entity_js_1 = require("../Entity.js");
const Reference_js_1 = require("../Reference.js");
class BlockchainBlock extends Entity_js_1.Entity {
    constructor(factory, blockId, sandraManager) {
        super(factory, [
            new Reference_js_1.Reference(sandraManager.get(BlockchainBlock.INDEX_SHORTNAME), blockId.toString()),
        ]);
        this.sandra = sandraManager;
    }
    getBlockId() {
        return this.getRefValue(BlockchainBlock.INDEX_SHORTNAME);
    }
    addOrUpdateTimestamp(timestamp, chain) {
        const timestampPrefix = !chain || (chain && chain.length == 0) ? "" : chain + "-";
        this.createOrUpdateRef(this.sandra.get(timestampPrefix + BlockchainBlock.BLOCK_TIMESTAMP), timestamp);
        return this;
    }
}
exports.BlockchainBlock = BlockchainBlock;
BlockchainBlock.INDEX_SHORTNAME = 'blockIndex';
BlockchainBlock.BLOCK_TIMESTAMP = 'timestamp';
//# sourceMappingURL=BlockchainBlock.js.map