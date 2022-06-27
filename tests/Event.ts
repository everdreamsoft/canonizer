import {CanonManager} from "./CanonManager";
import {BlockchainEventFactory} from "../src/canonizer/BlockchainEventFactory";
import {Entity} from "../src/Entity";
import {Reference} from "../src/Reference";
import {BlockchainEvent} from "../src/canonizer/BlockchainEvent";
import {Blockchain} from "../src/canonizer/Blockchain";
import {EntityFactory} from "../src/EntityFactory";

export class Event {

    constructor() {
    }

    public static async test() {
        await Event.testEventUpdate();
    }

    private static async updateCollectionUniqueKey() {

        let entityFact = new EntityFactory("", "inCollection");
    }

    private static async testEventUpdate() {

        let canonizeManager = CanonManager.getInstance().getCSCanonizeManager();

        let factory = new BlockchainEventFactory(new Blockchain(canonizeManager.getSandra()), canonizeManager.getSandra());
        let entity = new Entity(factory,
            [new Reference(canonizeManager.getSandra().get(Blockchain.TXID_CONCEPT_NAME), "0xdf32963d15d0ca29afd1bc31514932510e9bba7c3cb6840010b4f1a24edae1db")])

        entity.setTriplet(BlockchainEvent.ASSET_STATUS, "completed", canonizeManager.getSandra());

        await canonizeManager.gossip(factory);


    }

}
