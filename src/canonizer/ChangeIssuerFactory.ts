
import {Blockchain} from "./Blockchain";
import {SandraManager} from "../SandraManager";
import {EntityFactory} from "../EntityFactory";


export class ChangeIssuerFactory extends EntityFactory
{

    public is_a: string = "changeIssuer";
    public contained_in_file: string = "changeIssuerFile";

    public static EVENT_SOURCE_ADDRESS = 'source';
    public static EVENT_BLOCK_TIME = 'timestamp';
    public static ON_BLOCKCHAIN = 'onBlockchain';
    public static EVENT_BLOCK = 'onBlock';

    public static NEW_ISSUER = 'newIssuer';
    public static COLLECTION_ID = 'collectionId';

    public constructor(sandra:SandraManager) {
        super('changeIssuer', 'changeIssuerFile', sandra);
        this.updateOnExistingRef = sandra.get(Blockchain.TXID_CONCEPT_NAME);
    }


}