"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainBlockFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
const BlockchainBlock_1 = require("./BlockchainBlock");
class BlockchainBlockFactory extends EntityFactory_js_1.EntityFactory {
    constructor(chain, sandra) {
        super(chain + "Bloc", chain + 'BlocFile', sandra, sandra.get(BlockchainBlock_1.BlockchainBlock.INDEX_SHORTNAME));
    }
    getOrCreate(blockId, timestamp, blockchain) {
        if (this.entityByRevValMap.has(this.sandraManager.get(BlockchainBlock_1.BlockchainBlock.INDEX_SHORTNAME))) {
            let addressRefMap = this.entityByRevValMap.get(this.sandraManager.get(BlockchainBlock_1.BlockchainBlock.INDEX_SHORTNAME));
            // @ts-ignore
            if (addressRefMap.has(blockId.toString())) {
                //address exists in factory
                // @ts-ignore
                return addressRefMap.get(blockId.toString())[0];
            }
        }
        return new BlockchainBlock_1.BlockchainBlock(this, blockId, timestamp, blockchain, this.sandraManager);
    }
}
exports.BlockchainBlockFactory = BlockchainBlockFactory;
//# sourceMappingURL=BlockchainBlockFactory.js.map