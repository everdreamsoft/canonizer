import {Entity} from "../../../Entity.js";
import {AssetFactory} from "../../AssetFactory.js";
import {SandraManager} from "../../../SandraManager.js";
import {AssetInterface} from "../../Asset.js";
import {JetskiEntityFactory} from "./JetskiEntityFactory.js";
import {BlockchainBlock} from "../../BlockchainBlock.js";

export class JetskiEntity extends Entity {


    public constructor(factory: JetskiEntityFactory, name:string) {
        super(factory);
        this.createOrUpdateRef(JetskiEntityFactory.JETSKI_INSTANCE,name);

    }

    public setLatestBlock(block:BlockchainBlock){

        this.createOrUpdateRef(JetskiEntityFactory.LATEST_BLOCK,block.getBlockId())

    }

}