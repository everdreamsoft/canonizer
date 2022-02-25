import {SandraManager} from "../SandraManager.js";
import {EntityFactory} from "../EntityFactory.js";

export class BalanceFactory extends EntityFactory {

    static readonly is_a = 'balanceItem';
    static readonly contained_in_file = 'balanceFile';

    //Reference
    public static BALANCE_ITEM_ID = 'id';
    public static QUANTITY = 'quantity';

    // Joined Entities
    public static LINKED_ADDRESS = 'belongsToAddress';
    public static ON_CONTRACT = 'onContract';

    public static LAST_BLOCK_UPDATE = 'lastBlockUpdate';

    public constructor(sandra: SandraManager) {
        super(BalanceFactory.is_a, BalanceFactory.contained_in_file, sandra);
        this.updateOnExistingRef = sandra.get(BalanceFactory.BALANCE_ITEM_ID);
    }
    
}
