import {Entity} from "../Entity.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainEventFactory} from "./BlockchainEventFactory.js";
import {BlockchainAddress} from "./BlockchainAddress.js";
import {BlockchainContract} from "./BlockchainContract.js";
import {Reference} from "../Reference.js";
import {Blockchain} from "./Blockchain.js";
import {BlockchainBlock} from "./BlockchainBlock.js";
import {ContractStandard} from "./ContractStandard.js";
import {BlockchainEvent} from "./BlockchainEvent.js";
import {BlockchainOrderFactory} from "./BlockchainOrderFactory";

export class BlockchainOrder extends Entity {

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


    public eventType:string = 'order';





    public constructor(factory:BlockchainOrderFactory,

                       source:BlockchainAddress|string,
                       buyContract:BlockchainContract|string,
                       sellContract:BlockchainContract|string,
                       buyAmount:string,
                       sellPrice:string,
                       buyTotal:string,
                       txid:string,
                       timestamp:string,
                       blockchain:Blockchain,
                       blockId:number,
                       tokenBuy:ContractStandard | null,
                       tokenSell:ContractStandard | null,
                       sandra:SandraManager,
                       buyDestination: BlockchainAddress|string = ""
    ) {

        super(factory);

        this.addReference(new Reference(sandra.get(Blockchain.TXID_CONCEPT_NAME),txid));


        if ( typeof source == "string"){
            source = blockchain.addressFactory.getOrCreate(source)
        }

        if ( typeof buyContract == "string"){
            buyContract = blockchain.contractFactory.getOrCreate(buyContract)
        }

        if ( typeof sellContract == "string"){
            sellContract = blockchain.contractFactory.getOrCreate(sellContract)
        }

        this.addReference(  new Reference(sandra.get(BlockchainOrder.EVENT_BLOCK_TIME),timestamp));
        this.addReference(  new Reference(sandra.get(BlockchainOrder.BUY_TOTAL), buyTotal));

        this.joinEntity(BlockchainOrder.EVENT_SOURCE_ADDRESS, source, sandra);

        let blockchainBlock = new BlockchainBlock(blockchain.blockFactory,blockId,timestamp,sandra);
        this.joinEntity(BlockchainOrder.EVENT_BLOCK,blockchainBlock,sandra);

        this.setTriplet(BlockchainOrder.ON_BLOCKCHAIN,blockchain.name,sandra);
        this.setTriplet(BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB,this.eventType,sandra);

        if(buyDestination != ""){
            if(typeof buyDestination == "string"){
                buyDestination = blockchain.addressFactory.getOrCreate(buyDestination);
            }
            this.joinEntity(BlockchainOrder.BUY_DESTINATION, buyDestination, sandra);
        }

        this.addReference(new Reference(sandra.get(BlockchainOrder.BUY_AMOUNT), buyAmount));
        if(tokenBuy) this.joinEntity(BlockchainOrder.TOKEN_BUY, tokenBuy, sandra, BlockchainOrder.getRefArray(tokenBuy));

        this.addReference(new Reference(sandra.get(BlockchainOrder.SELL_PRICE), sellPrice));
        if(tokenSell) this.joinEntity(BlockchainOrder.TOKEN_SELL, tokenSell, sandra, BlockchainOrder.getRefArray(tokenSell));

        this.joinEntity(BlockchainOrder.ORDER_BUY_CONTRACT,buyContract,sandra);
        this.joinEntity(BlockchainOrder.ORDER_SELL_CONTRACT,sellContract,sandra);

    }


    private static getRefArray(token: ContractStandard|null): Array<Reference>|[]
    {
        let refArray:Reference[] = [];

        if (token){
            //we need to get the tokenpath data and add it as reference on the event
            let specifierMap = token.getSpecifierArray()

            for (let specifier of specifierMap) {
                // console.log(specifier[0]);
                refArray.push(new Reference(specifier[0],specifier[1]));
            }

        }

        return refArray;
    }



}

