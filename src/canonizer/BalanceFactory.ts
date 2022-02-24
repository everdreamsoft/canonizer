import {SandraManager} from "../SandraManager.js";
import {EntityFactory} from "../EntityFactory.js";
import {BlockchainAddress} from "./BlockchainAddress.js";
import {Blockchain} from "./Blockchain";
import {JetskiProcessEntityFactory} from "./tools/JetskiWebInterface/JetskiProcessEntityFactory";

export class BalanceFactory extends EntityFactory{

    private sandra: SandraManager;

    //Reference
    public  static BALANCE_ITEM_ID = 'id';
    public  static QUANTITY = 'quantity';


    // Joined Entities
    public  static LINKED_ADDRESS = 'belongsToAddress';
    public  static ON_CONTRACT = 'onContract';

    public  static LAST_BLOCK_UPDATE = 'lastBlockUpdate';


    public constructor(sandra:SandraManager) {
        super('balanceItem','balanceFile',sandra);
        this.sandra = sandra ;
    }



}
