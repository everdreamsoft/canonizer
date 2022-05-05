import {Entity} from "../Entity.js";
import {SandraManager} from "../SandraManager.js";
import {Reference} from "../Reference.js";
import {EntityFactory} from "../EntityFactory";

export class BlockchainBlock extends Entity {

    sandra: SandraManager;
    public static INDEX_SHORTNAME = 'blockIndex';
    public static BLOCK_TIMESTAMP = 'timestamp';

    public constructor(factory: EntityFactory, blockId: number,sandraManager: SandraManager) {
        super(factory, [
            new Reference(sandraManager.get(BlockchainBlock.INDEX_SHORTNAME), blockId.toString()),
        ]);
        this.sandra = sandraManager;
    }

    public getBlockId(): string {
        return this.getRefValue(BlockchainBlock.INDEX_SHORTNAME);
    }

    public addOrUpdateTimestamp(timestamp: string, chain: string) {
        const timestampPrefix = !chain || (chain && chain.length == 0) ? "" : chain + "-";
        this.createOrUpdateRef(this.sandra.get(timestampPrefix + BlockchainBlock.BLOCK_TIMESTAMP), timestamp);
        return this;
    }
}
