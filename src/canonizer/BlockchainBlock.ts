import {Entity} from "../Entity.js";
import {SandraManager} from "../SandraManager.js";
import {Reference} from "../Reference.js";
import {EntityFactory} from "../EntityFactory";

export class BlockchainBlock extends Entity {

    public static INDEX_SHORTNAME = 'blockIndex';
    public static BLOCK_TIMESTAMP = 'timestamp';

    public constructor(factory: EntityFactory, blockId: number, sandraManager: SandraManager) {
        super(factory, [
            new Reference(sandraManager.get(BlockchainBlock.INDEX_SHORTNAME), blockId.toString()),
        ]);
    }

    public getBlockId(): string {
        return this.getRefValue(BlockchainBlock.INDEX_SHORTNAME);
    }

    public addOrUpdateTimestamp(timestamp: string, chain: string): BlockchainBlock {
        this.createOrUpdateRef((this.getTimestampPrefix(chain) + BlockchainBlock.BLOCK_TIMESTAMP), timestamp);
        return this;
    }

    public getTimestampPrefix(chain: string): string {
        return !chain || (chain && chain.length == 0) ? "" : chain + "-"
    }

}
