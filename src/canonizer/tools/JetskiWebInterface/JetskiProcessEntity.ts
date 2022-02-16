import {Entity} from "../../../Entity.js";
import {SandraManager} from "../../../SandraManager";
import {Reference} from "../../../Reference";
import {JetskiProcessEntityFactory} from "./JetskiProcessEntityFactory";
import {JetskiAddressEntity} from "./JetskiAddressEntity";
import {JetskiAddressEntityFactory} from "./JetskiAddressEntityFactory";
import {Blockchain} from "../../Blockchain";

export interface JetskiProcessInterface {
    id:string,
    processID: string,
    processTitle: string,
    processDescription: string,
    jetskiName: string,
    lastStartTime: string,
    lastStopTime: string,
    jetskiPath:string
}

export class JetskiProcessEntity extends Entity {

    readonly sandra: SandraManager;
    readonly jetskiAddressFactory: JetskiAddressEntityFactory;

    public constructor(factory: JetskiProcessEntityFactory, sandra: SandraManager, jetskiProcessData: JetskiProcessInterface) {
        super(factory);
        this.sandra = sandra;
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.ID), jetskiProcessData.id));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.PROCESS_ID), jetskiProcessData.processID));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.PROCESS_TITLE), jetskiProcessData.processTitle));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.LAST_START_TIME), jetskiProcessData.lastStartTime));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.PROCESS_DESCRIPTION), jetskiProcessData.processDescription));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.JETSKI_NAME), jetskiProcessData.jetskiName));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.LAST_STOP_TIME), jetskiProcessData.lastStopTime));
        this.addReference(new Reference(sandra.get(JetskiProcessEntityFactory.JETSKI_PATH), jetskiProcessData.jetskiPath));

        this.jetskiAddressFactory = new JetskiAddressEntityFactory(sandra);
    }

    public getAddressFactory() {
        return this.jetskiAddressFactory;
    }

    public bindJetskiAddress(addressEntity: JetskiAddressEntity) {
        this.joinEntity(JetskiProcessEntityFactory.JOINED_ADDRESS, addressEntity, this.sandra)
    }

    public setBlockchain(blockchain: Blockchain) {
        this.setTriplet(JetskiProcessEntityFactory.ON_BLOCKCHAIN, blockchain.name, this.sandra);
    }

    public setStatus(status: string) {
        this.setTriplet(JetskiProcessEntityFactory.HAS_STATUS, status, this.sandra);
    }


}
