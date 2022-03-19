import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainBlock} from "./BlockchainBlock";

export class BlockchainBlockFactory extends EntityFactory {

    public constructor(chain: string, sandra: SandraManager) {
        super(chain + "Bloc", 'blockchainBlocFile', sandra, sandra.get(BlockchainBlock.INDEX_SHORTNAME));
    }

    public getOrCreate(blockId: number, timestamp:string): BlockchainBlock {

        if (this.entityByRevValMap.has(this.sandraManager.get(BlockchainBlock.INDEX_SHORTNAME))) {
            let addressRefMap = this.entityByRevValMap.get(this.sandraManager.get(BlockchainBlock.INDEX_SHORTNAME));

            // @ts-ignore
            if (addressRefMap.has(address)) {
                //address exists in factory
                // @ts-ignore
                return addressRefMap.get(address)[0];
            }

        }

        return new BlockchainBlock(this,blockId, timestamp, this.sandraManager )

    }

}
