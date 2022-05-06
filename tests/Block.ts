import {SandraManager} from "../src/SandraManager";
import {BlockchainBlockFactory} from "../src/canonizer/BlockchainBlockFactory";
import {BlockchainBlock} from "../src/canonizer/BlockchainBlock";
import {CanonManager} from "./CanonManager";
import Api from "./API";

export class Block {

    constructor() {
    }

    public static async test() {
        await Block.testBlockObjects();
        await Block.testBlockGossips();
    }

    private static async testBlockObjects() {

        let sandra = new SandraManager();
        let blockFactory = new BlockchainBlockFactory(sandra);

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
                expect(blockFactory.entityArray[0].getRefValue(sandra.get(BlockchainBlock.INDEX_SHORTNAME))).toBe("1");
                expect(blockFactory.entityArray[1].getRefValue(sandra.get(BlockchainBlock.INDEX_SHORTNAME))).toBe("3");

            });
            test('Reference Values ', () => {
                expect(blockFactory.entityArray[0].getRefValue(sandra.get("ethereum-" + BlockchainBlock.BLOCK_TIMESTAMP))).toBe("22");
                expect(blockFactory.entityArray[0].getRefValue(sandra.get("binance-" + BlockchainBlock.BLOCK_TIMESTAMP))).toBe("21");
                expect(blockFactory.entityArray[1].getRefValue(sandra.get("ethereum-" + BlockchainBlock.BLOCK_TIMESTAMP))).toBe("32");
                expect(blockFactory.entityArray[1].getRefValue(sandra.get("binance-" + BlockchainBlock.BLOCK_TIMESTAMP))).toBe("31");
            });

        });

    }

    private static async testBlockGossips() {

        let sandra = new SandraManager();

        let blockFactory = new BlockchainBlockFactory(sandra);

        let block1 = blockFactory.getOrCreate(1);
        let block2 = blockFactory.getOrCreate(1);
        let block3 = blockFactory.getOrCreate(3);

        block1.addOrUpdateTimestamp("11", "ethereum");
        block1.addOrUpdateTimestamp("12", "ethereum");
        block1.addOrUpdateTimestamp("11", "binance");

        block2.addOrUpdateTimestamp("21", "");

        block2.addOrUpdateTimestamp("21", "ethereum");
        block2.addOrUpdateTimestamp("22", "ethereum");
        block2.addOrUpdateTimestamp("21", "binance");

        block3.addOrUpdateTimestamp("31", "ethereum");
        block3.addOrUpdateTimestamp("32", "ethereum");
        block3.addOrUpdateTimestamp("31", "binance");


        describe("Block Gossip Test", () => {
            test('Factory Entity ', async () => {

                await CanonManager.getInstance().getCSCanonizeManager()
                    .gossip(blockFactory);

                let res = await Api.getBlock("1");
                let block = res.data;

                expect(block["" + BlockchainBlock.BLOCK_TIMESTAMP]).toBe("21");
                expect(block["ethereum-" + BlockchainBlock.BLOCK_TIMESTAMP]).toBe("22");
                expect(block["binance-" + BlockchainBlock.BLOCK_TIMESTAMP]).toBe("21");

            });

        });

    }
}
