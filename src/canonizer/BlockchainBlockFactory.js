"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainBlockFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
const BlockchainBlock_1 = require("./BlockchainBlock");
class BlockchainBlockFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super("blockchainBloc", 'blockchainBlocFile', sandra, sandra.get(BlockchainBlock_1.BlockchainBlock.INDEX_SHORTNAME));
    }
    getOrCreate(blockId) {
        const blocks = this.getEntitiesWithRefValue(this.sandraManager.get(BlockchainBlock_1.BlockchainBlock.INDEX_SHORTNAME), blockId.toString());
        return blocks && (blocks === null || blocks === void 0 ? void 0 : blocks.length) > 0 ? blocks[0] : new BlockchainBlock_1.BlockchainBlock(this, blockId, this.sandraManager);
    }
}
exports.BlockchainBlockFactory = BlockchainBlockFactory;
//# sourceMappingURL=BlockchainBlockFactory.js.map