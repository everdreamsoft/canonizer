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
import {Concept} from "../Concept";

export class BlockchainOrder extends Entity {

    public static EVENT_SOURCE_ADDRESS = 'source';
    public static EVENT_DESTINATION_VERB = 'hasSingleDestination';
    public static EVENT_SOURCE_CONTRACT = 'blockchainContract';
    public static EVENT_BLOCK_TIME = 'timestamp';
    public static QUANTITY = 'quantity';
    public static ON_BLOCKCHAIN = 'onBlockchain';
    public static EVENT_BLOCK = 'onBlock';

    public static SELL_AMOUNT = "sellAmount";
    public static BUY_PRICE = "buyPrice";
    public static BUY_TOTAL = "buyTotal";
    public static ORDER_BUY_CONTRACT = "buyContract";
    public static ORDER_SELL_CONTRACT = "sellContract";

    public eventType:string = 'order';





    public constructor(factory:BlockchainEventFactory,

                       source:BlockchainAddress|string,
                       buyContract:BlockchainContract|string,
                       sellContract:BlockchainContract|string,
                       sellAmount:string,
                       buyPrice:string,
                       buyTotal:string,
                       txid:string,
                       timestamp:string,
                       blockchain:Blockchain,
                       blockId:number,
                       tokenBuy:ContractStandard | null,
                       tokenSell:ContractStandard | null,
                       sandra:SandraManager,

    ) {

        super(factory);

        this.addReference(  new Reference(sandra.get(Blockchain.TXID_CONCEPT_NAME),txid));


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
        this.addReference(  new Reference(sandra.get(BlockchainOrder.SELL_AMOUNT), sellAmount));
        this.addReference(  new Reference(sandra.get(BlockchainOrder.BUY_PRICE), buyPrice));
        this.addReference(  new Reference(sandra.get(BlockchainOrder.BUY_TOTAL), buyTotal));

        this.joinEntity(BlockchainOrder.EVENT_SOURCE_ADDRESS, source, sandra);

        let blockchainBlock = new BlockchainBlock(blockchain.blockFactory,blockId,timestamp,sandra);
        this.joinEntity(BlockchainOrder.EVENT_BLOCK,blockchainBlock,sandra);

        this.setTriplet(BlockchainOrder.ON_BLOCKCHAIN,blockchain.name,sandra);
        this.setTriplet(BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB,this.eventType,sandra);


        const buyRefArray = this.getRefArray(tokenBuy);
        const sellRefArray = this.getRefArray(tokenSell);

        this.joinEntity(BlockchainOrder.ORDER_BUY_CONTRACT,buyContract,sandra,buyRefArray)
        this.joinEntity(BlockchainOrder.ORDER_SELL_CONTRACT,sellContract,sandra,sellRefArray)

    }


    private getRefArray(token: ContractStandard|null): Array<Reference>|[]
    {
        let refArray:Reference[] = [];

        if (token){
            //we need to get the tokenpath data and add it as reference on the event
            let specifierMap = token.getSpecifierArray()

            for (let specifier of specifierMap) {
                console.log(specifier[0]);
                refArray.push(new Reference(specifier[0],specifier[1]));
            }

        }

        return refArray;
    }




}

