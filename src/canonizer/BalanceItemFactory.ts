import {Entity} from "../Entity.js";
import {EntityFactory} from "../EntityFactory";
import {SandraManager} from "../SandraManager";

export class BalanceItemFactory extends EntityFactory{

    public  static LAST_BLOCK_UPDATE = 'lastBlockUpdate';
    public  static BALANCE_ITEM_ID = 'id';


    public constructor(sandra:SandraManager) {
        super('balanceItem','balanceFile',sandra);
    }



}
