import {Entity} from "../../../Entity.js";
import {SandraManager} from "../../../SandraManager";
import {Reference} from "../../../Reference";
import {JetskiAddressEntityFactory} from "./JetskiAddressEntityFactory";
import {AssetCollection} from "../../AssetCollection";

export interface JetskiAddressInterface {
    hash: string,
    status: string,
    lastBlockSaved: string,
    lastBlockProcessed: string,
    lastUpdateTime: string,
    startBlock: string,
    endBlock: string,
    standard: string,
    blockRange: string
}

export class JetskiAddressEntity extends Entity {


    public constructor(factory: JetskiAddressEntityFactory, sandra: SandraManager, jetskiAddressData: JetskiAddressInterface) {

        super(factory, [new Reference(sandra.get(JetskiAddressEntityFactory.HASH), jetskiAddressData.hash)]);

        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.STATUS), jetskiAddressData.status));
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.LAST_BLOCK_PROCESSED), jetskiAddressData.lastBlockProcessed));
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.LAST_BLOCK_SAVED), jetskiAddressData.lastBlockSaved));
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.LAST_UPDATE_TIME), jetskiAddressData.lastUpdateTime));

        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.START_BLOCK), jetskiAddressData.startBlock));
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.END_BLOCK), jetskiAddressData.endBlock));
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.STANDARD), jetskiAddressData.standard));
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.BLOCK_RANGE), jetskiAddressData.blockRange));

    }

    public bindJetskiCollection(collection: AssetCollection) {
        this.joinEntity(JetskiAddressEntityFactory.JOINED_COLLECTION, collection, this.factory.sandraManager)
    }

}
