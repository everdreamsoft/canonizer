import {EntityFactory} from "../../../EntityFactory.js";
import {SandraManager} from "../../../SandraManager.js";
import {JetskiEntity} from "./JetskiEntity.js";
import {BlockchainBlock} from "../../BlockchainBlock";


export class JetskiEntityFactory extends EntityFactory {

    static LATEST_JETSKI = 'latest_' //append blockchain name
    static JETSKI_INSTANCE = 'instanceName';
    static LATEST_BLOCK = 'latestBlock';
    static INSTANCE_CODE = "instanceCode";

    public constructor(sandra:SandraManager) {
        super('jetskiRun','jetskiRunFile',sandra);
        this.updateOnExistingRef = sandra.get(JetskiEntityFactory.JETSKI_INSTANCE);
    }

    public getOrCreateJetskiInstance(name:string, block: BlockchainBlock, instance: string, sandra: SandraManager):JetskiEntity{

       let jetski = this.getEntitiesWithRefValue(JetskiEntityFactory.JETSKI_INSTANCE,JetskiEntityFactory.LATEST_JETSKI+name)
        if (!(jetski instanceof JetskiEntity)) jetski = new JetskiEntity(this,sandra, name)

        if(jetski){
            jetski.createOrUpdateRef(JetskiEntityFactory.LATEST_BLOCK, block.getBlockId());
            jetski.createOrUpdateRef(JetskiEntityFactory.INSTANCE_CODE, instance);
        }

        return jetski;
    }






}
