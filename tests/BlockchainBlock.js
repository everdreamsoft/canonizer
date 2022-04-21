"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainBlock = void 0;
const SandraManager_1 = require("../src/SandraManager");
const BlockchainBlockFactory_1 = require("../src/canonizer/BlockchainBlockFactory");
const CanonManager_1 = require("./CanonManager");
class BlockchainBlock {
    constructor() {
    }
    static async test() {
        await BlockchainBlock.testBlockchainBlockEntity();
    }
    static async testBlockchainBlockEntity() {
        let sandra = new SandraManager_1.SandraManager();
        // Creating factory without updateExistingReference
        let blockchainBlockFactory = new BlockchainBlockFactory_1.BlockchainBlockFactory("binance", sandra);
        blockchainBlockFactory.getOrCreate(1234, "1650379581572");
        let res = await CanonManager_1.CanonManager.getInstance().getCSCanonizeManager().gossip(blockchainBlockFactory);
        console.log(res);
        describe("Entity Instance and References without updateExistingReference ", () => {
            test('Instance of Entity', () => {
                expect(1).toBe(1);
            });
        });
    }
}
exports.BlockchainBlock = BlockchainBlock;
//# sourceMappingURL=BlockchainBlock.js.map