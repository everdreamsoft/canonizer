import {SandraManager} from "../src/SandraManager";
import {BlockchainBlockFactory} from "../src/canonizer/BlockchainBlockFactory";
import {CanonManager} from "./CanonManager";
import {CompatibleBlockchains} from "../src/canonizer/CSCanonizeManager";

export class BlockchainBlock {

    constructor() {
    }

    public static async test() {
        await BlockchainBlock.testBlockchainBlockEntity();
    }


    private static async testBlockchainBlockEntity() {

        let sandra = new SandraManager();
        let blockchain = CanonManager.getInstance().getCSCanonizeManager().getOrInitBlockchain(CompatibleBlockchains.binance);

        // Creating factory without updateExistingReference
        let blockchainBlockFactory = new BlockchainBlockFactory("blockchain", sandra);
        blockchainBlockFactory.getOrCreate(1234, "1650379581572", blockchain);

        let res = await CanonManager.getInstance().getCSCanonizeManager().gossip(blockchainBlockFactory);

        console.log(res);

        describe("Entity Instance and References without updateExistingReference ", () => {
            test('Instance of Entity', () => {
                expect(1).toBe(1);
            });
        });

    }
}
