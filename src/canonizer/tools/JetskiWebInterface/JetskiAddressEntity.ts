import {Entity} from "../../../Entity.js";
import {SandraManager} from "../../../SandraManager";
import {Reference} from "../../../Reference";
import {JetskiAddressEntityFactory} from "./JetskiAddressEntityFactory";
import {JetskiProcessEntityFactory} from "./JetskiProcessEntityFactory";
import {AssetCollection} from "../../AssetCollection";

export interface JetskiAddressInterface {
    hash: string,
    status: string,
    lastBlockSaved: string,
    lastBlockProcessed: string,
    lastUpdateTime: string,
}

export class JetskiAddressEntity extends Entity {

    sandra:SandraManager;

    public constructor(factory: JetskiAddressEntityFactory, sandra: SandraManager, jetskiAddressData: JetskiAddressInterface) {
        super(factory);
        this.sandra = sandra;
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.HASH), jetskiAddressData.hash));
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.STATUS), jetskiAddressData.status));
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.LAST_BLOCK_PROCESSED), jetskiAddressData.lastBlockProcessed));
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.LAST_BLOCK_SAVED), jetskiAddressData.lastBlockSaved));
        this.addReference(new Reference(sandra.get(JetskiAddressEntityFactory.LAST_UPDATE_TIME), jetskiAddressData.lastUpdateTime));
    }

    public bindJetskiCollection(collection: AssetCollection) {
        this.joinEntity(JetskiAddressEntityFactory.JOINED_COLLECTION, collection, this.sandra)
    }

}
