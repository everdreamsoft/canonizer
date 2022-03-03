import {Entity} from "../../../Entity.js";
import {JetskiEntityFactory} from "./JetskiEntityFactory.js";
import {BlockchainBlock} from "../../BlockchainBlock.js";
import {SandraManager} from "../../../SandraManager";
import {Reference} from "../../../Reference";

export class JetskiEntity extends Entity {

    public constructor(factory: JetskiEntityFactory, sandra: SandraManager, name: string) {
        super(factory, [new Reference(sandra.get(JetskiEntityFactory.JETSKI_INSTANCE), JetskiEntityFactory.LATEST_JETSKI + name)]);
    }

    public setLatestBlock(block: BlockchainBlock) {
        this.createOrUpdateRef(JetskiEntityFactory.LATEST_BLOCK, block.getBlockId())
    }


}
