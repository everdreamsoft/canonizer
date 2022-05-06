import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainBlock} from "./BlockchainBlock";

export class BlockchainBlockFactory extends EntityFactory {

    public constructor(sandra: SandraManager) {
        super("blockchainBloc", 'blockchainBlocFile', sandra, sandra.get(BlockchainBlock.INDEX_SHORTNAME));
    }

    public getOrCreate(blockId: number): BlockchainBlock {
        const blocks: BlockchainBlock[] = this.getEntitiesWithRefValue(this.sandraManager.get(BlockchainBlock.INDEX_SHORTNAME), blockId.toString());
        return blocks && blocks?.length > 0 ? blocks[0] : new BlockchainBlock(this, blockId, this.sandraManager);
    }

}
