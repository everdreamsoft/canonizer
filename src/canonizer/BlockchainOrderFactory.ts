import {EntityFactory} from "../EntityFactory";
import {Blockchain} from "./Blockchain";
import {SandraManager} from "../SandraManager";

export class BlockchainOrderFactory extends EntityFactory
{

    public constructor(blockchain: Blockchain, sandra: SandraManager) {
        super('BlockchainOrder', 'blockchainOrderFile', sandra);

        this.updateOnExistingRef = sandra.get(Blockchain.TXID_CONCEPT_NAME);
    }

}