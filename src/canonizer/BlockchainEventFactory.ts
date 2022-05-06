import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";
import {Blockchain} from "./Blockchain.js";

export class BlockchainEventFactory extends EntityFactory {

    public constructor(blockchain: Blockchain, sandra: SandraManager) {
        super('blockchainEvent', 'blockchainEventFile', sandra, sandra.get(Blockchain.TXID_CONCEPT_NAME));
    }

}
