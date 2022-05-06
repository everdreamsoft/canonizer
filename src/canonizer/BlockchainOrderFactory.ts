import {EntityFactory} from "../EntityFactory";
import {Blockchain} from "./Blockchain";
import {SandraManager} from "../SandraManager";

export class BlockchainOrderFactory extends EntityFactory {

    public static EVENT_SOURCE_ADDRESS = 'source';
    public static EVENT_BLOCK_TIME = 'timestamp';
    public static ON_BLOCKCHAIN = 'onBlockchain';
    public static EVENT_BLOCK = 'onBlock';

    public static BUY_AMOUNT = "buyAmount";
    public static SELL_PRICE = "sellPrice";
    public static BUY_TOTAL = "buyTotal";
    public static ORDER_BUY_CONTRACT = "buyContract";
    public static ORDER_SELL_CONTRACT = "sellContract";
    public static BUY_DESTINATION = "buyDestination";

    public static TOKEN_BUY = "tokenBuy";
    public static TOKEN_SELL = "tokenSell";

    public constructor(sandra: SandraManager) {
        super('blockchainOrder', 'blockchainOrderFile', sandra, sandra.get(Blockchain.TXID_CONCEPT_NAME));
    }

}
