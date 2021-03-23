import {EntityFactory} from "../../../EntityFactory.js";
import {SandraManager} from "../../../SandraManager.js";
import {Entity} from "../../../Entity.js";
import {JetskiEntity} from "./JetskiEntity.js";


export class JetskiEntityFactory extends EntityFactory {

    static LATEST_JETSKI = 'latest_' //append blockchain name
    static JETSKI_INSTANCE = 'instanceName'
    static LATEST_BLOCK = 'latestBlock'

    public constructor(sandra:SandraManager) {

        super('jetskiRun','jetskiRunFile',sandra);

    }

    public getOrCreateJetskiInstance(name:string):JetskiEntity{

       let jetski = this.getEntitiesWithRefValue(JetskiEntityFactory.JETSKI_INSTANCE,name)
        if (!jetski) jetski = new JetskiEntity(this,name)

        return jetski ;


    }






}