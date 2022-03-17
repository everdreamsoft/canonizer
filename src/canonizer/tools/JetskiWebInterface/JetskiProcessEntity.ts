import {Entity} from "../../../Entity.js";
import {SandraManager} from "../../../SandraManager";
import {Reference} from "../../../Reference";
import {JetskiProcessEntityFactory} from "./JetskiProcessEntityFactory";
import {JetskiAddressEntity} from "./JetskiAddressEntity";
import {Blockchain} from "../../Blockchain";

export interface JetskiProcessInterface {
    id: string,
    processID: string,
    processTitle: string,
    processDescription: string,
    jetskiName: string,
    lastStartTime: string,
    lastStopTime: string,
    jetskiPath: string,
    status:string
}

export class JetskiProcessEntity extends Entity {


    public constructor(factory: JetskiProcessEntityFactory, sandra: SandraManager, jetskiProcessData: JetskiProcessInterface) {
        super(factory, [new Reference(sandra.get(JetskiProcessEntityFactory.ID), jetskiProcessData.id)]);
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.PROCESS_ID), jetskiProcessData.processID));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.PROCESS_TITLE), jetskiProcessData.processTitle));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.LAST_START_TIME), jetskiProcessData.lastStartTime));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.PROCESS_DESCRIPTION), jetskiProcessData.processDescription));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.JETSKI_NAME), jetskiProcessData.jetskiName));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.LAST_STOP_TIME), jetskiProcessData.lastStopTime));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.JETSKI_PATH), jetskiProcessData.jetskiPath));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.STATUS), jetskiProcessData.status));

    }

    public bindJetskiAddress(addressEntity: JetskiAddressEntity) {
        this.joinEntity(JetskiProcessEntityFactory.JOINED_ADDRESS, addressEntity, this.factory.sandraManager)
    }

    public setBlockchain(blockchain: Blockchain) {
        this.setTriplet(JetskiProcessEntityFactory.ON_BLOCKCHAIN, blockchain.name, this.factory.sandraManager);
    }

    public setStatus(status: string) {
        this.setTriplet(JetskiProcessEntityFactory.HAS_STATUS, status, this.factory.sandraManager);
    }


}
