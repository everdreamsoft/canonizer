"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const SandraManager_1 = require("../src/SandraManager");
const BlockchainBlockFactory_1 = require("../src/canonizer/BlockchainBlockFactory");
const BlockchainBlock_1 = require("../src/canonizer/BlockchainBlock");
const CanonManager_1 = require("./CanonManager");
class Block {
    constructor() {
    }
    static async test() {
        // await Block.testBlockObjects();
        await Block.testBlockGossips();
    }
    static async testBlockObjects() {
        let sandra = new SandraManager_1.SandraManager();
        let blockFactory = new BlockchainBlockFactory_1.BlockchainBlockFactory(sandra);
        let block1 = blockFactory.getOrCreate(1);
        let block2 = blockFactory.getOrCreate(1);
        let block3 = blockFactory.getOrCreate(3);
        block1.addOrUpdateTimestamp("11", "ethereum");
        block1.addOrUpdateTimestamp("12", "ethereum");
        block1.addOrUpdateTimestamp("11", "binance");
        block2.addOrUpdateTimestamp("21", "ethereum");
        block2.addOrUpdateTimestamp("22", "ethereum");
        block2.addOrUpdateTimestamp("21", "binance");
        block3.addOrUpdateTimestamp("31", "ethereum");
        block3.addOrUpdateTimestamp("32", "ethereum");
        block3.addOrUpdateTimestamp("31", "binance");
        describe("Block Test", () => {
            test('Factory Entity ', () => {
                expect(blockFactory.entityArray.length).toBe(2);
                expect(blockFactory.entityArray[0].getRefValue(sandra.get(BlockchainBlock_1.BlockchainBlock.INDEX_SHORTNAME))).toBe("1");
                expect(blockFactory.entityArray[1].getRefValue(sandra.get(BlockchainBlock_1.BlockchainBlock.INDEX_SHORTNAME))).toBe("3");
            });
            test('Reference Values ', () => {
                expect(blockFactory.entityArray[0].getRefValue(sandra.get("ethereum-" + BlockchainBlock_1.BlockchainBlock.BLOCK_TIMESTAMP))).toBe("22");
                expect(blockFactory.entityArray[0].getRefValue(sandra.get("binance-" + BlockchainBlock_1.BlockchainBlock.BLOCK_TIMESTAMP))).toBe("21");
                expect(blockFactory.entityArray[1].getRefValue(sandra.get("ethereum-" + BlockchainBlock_1.BlockchainBlock.BLOCK_TIMESTAMP))).toBe("32");
                expect(blockFactory.entityArray[1].getRefValue(sandra.get("binance-" + BlockchainBlock_1.BlockchainBlock.BLOCK_TIMESTAMP))).toBe("31");
            });
        });
    }
    static async testBlockGossips() {
        let sandra = new SandraManager_1.SandraManager();
        let blockFactory = new BlockchainBlockFactory_1.BlockchainBlockFactory(sandra);
        let block1 = blockFactory.getOrCreate(1);
        let block2 = blockFactory.getOrCreate(1);
        let block3 = blockFactory.getOrCreate(3);
        block1.addOrUpdateTimestamp("11", "ethereum");
        block1.addOrUpdateTimestamp("12", "ethereum");
        block1.addOrUpdateTimestamp("11", "binance");
        block2.addOrUpdateTimestamp("21", "ethereum");
        block2.addOrUpdateTimestamp("22", "ethereum");
        block2.addOrUpdateTimestamp("21", "binance");
        block3.addOrUpdateTimestamp("31", "ethereum");
        block3.addOrUpdateTimestamp("32", "ethereum");
        block3.addOrUpdateTimestamp("31", "binance");
        let canon = await CanonManager_1.CanonManager.getInstance().getCSCanonizeManager();
        let res = canon.gossip(blockFactory);
        console.log(res);
        describe("Block Gossip Test", () => {
            test('Factory Entity ', async () => {
                // Gossip
                console.log(blockFactory.updateOnExistingRef);
                let res = await CanonManager_1.CanonManager.getInstance().getCSCanonizeManager()
                    .gossip(blockFactory);
                console.log(res);
            });
        });
    }
}
exports.Block = Block;
//# sourceMappingURL=Block.js.map