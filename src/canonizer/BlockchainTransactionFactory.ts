import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";
import {Blockchain} from "./Blockchain.js";

export class BlockchainTransactionFactory extends EntityFactory {

    public constructor(sandra: SandraManager) {
        super('blockchainTransaction', 'blockchainTransactionFile', sandra);
        this.updateOnExistingRef = sandra.get(Blockchain.TXID_CONCEPT_NAME);
    }

}