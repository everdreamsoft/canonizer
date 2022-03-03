"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainBlock = void 0;
const Entity_js_1 = require("../Entity.js");
const Reference_js_1 = require("../Reference.js");
class BlockchainBlock extends Entity_js_1.Entity {
    constructor(factory, blockId, blockTimestamp, sandraManager) {
        super(factory, [
            new Reference_js_1.Reference(sandraManager.get(BlockchainBlock.INDEX_SHORTNAME), blockId.toString()),
            new Reference_js_1.Reference(sandraManager.get(BlockchainBlock.BLOCK_TIMESTAMP), blockTimestamp)
        ]);
    }
    getBlockId() {
        return this.getRefValue(BlockchainBlock.INDEX_SHORTNAME);
    }
}
exports.BlockchainBlock = BlockchainBlock;
BlockchainBlock.INDEX_SHORTNAME = 'blockIndex';
BlockchainBlock.BLOCK_TIMESTAMP = 'timestamp';
//# sourceMappingURL=BlockchainBlock.js.map