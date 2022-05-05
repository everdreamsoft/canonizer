import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainBlock} from "./BlockchainBlock";

export class BlockchainBlockFactory extends EntityFactory {

    public constructor(sandra: SandraManager) {
        super("blockchainBloc", 'blockchainBlocFile', sandra, sandra.get(BlockchainBlock.INDEX_SHORTNAME));
    }

    public getOrCreate(blockId: number): BlockchainBlock {

        if (this.entityByRevValMap.has(this.sandraManager.get(BlockchainBlock.INDEX_SHORTNAME))) {
            let addressRefMap = this.entityByRevValMap.get(this.sandraManager.get(BlockchainBlock.INDEX_SHORTNAME));
            // @ts-ignore
            if (addressRefMap.has(blockId.toString())) {
                // @ts-ignore
                return addressRefMap.get(blockId.toString())[0];
            }
        }

        return new BlockchainBlock(this, blockId, this.sandraManager)
    }

}
