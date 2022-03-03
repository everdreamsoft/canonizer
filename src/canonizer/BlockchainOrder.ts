import {Entity} from "../Entity.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainAddress} from "./BlockchainAddress.js";
import {BlockchainContract} from "./BlockchainContract.js";
import {Reference} from "../Reference.js";
import {Blockchain} from "./Blockchain.js";
import {BlockchainBlock} from "./BlockchainBlock.js";
import {ContractStandard} from "./ContractStandard.js";
import {BlockchainEvent} from "./BlockchainEvent.js";
import {BlockchainOrderFactory} from "./BlockchainOrderFactory";

export class BlockchainOrder extends Entity {


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

        super(factory,[new Reference(sandra.get(Blockchain.TXID_CONCEPT_NAME),txid)]);

        if ( typeof source == "string"){
            source = blockchain.addressFactory.getOrCreate(source)
        }

        if ( typeof buyContract == "string"){
            buyContract = blockchain.contractFactory.getOrCreate(buyContract)
        }

        if ( typeof sellContract == "string"){
            sellContract = blockchain.contractFactory.getOrCreate(sellContract)
        }

        this.addReference(  new Reference(sandra.get(BlockchainOrderFactory.EVENT_BLOCK_TIME),timestamp));
        this.addReference(  new Reference(sandra.get(BlockchainOrderFactory.BUY_TOTAL), buyTotal));

        this.joinEntity(BlockchainOrderFactory.EVENT_SOURCE_ADDRESS, source, sandra);

        let blockchainBlock = new BlockchainBlock(blockchain.blockFactory,blockId,timestamp,sandra);
        this.joinEntity(BlockchainOrderFactory.EVENT_BLOCK,blockchainBlock,sandra);

        this.setTriplet(BlockchainOrderFactory.ON_BLOCKCHAIN,blockchain.name,sandra);
        this.setTriplet(BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB,this.eventType,sandra);

        if(buyDestination != ""){
            if(typeof buyDestination == "string"){
                buyDestination = blockchain.addressFactory.getOrCreate(buyDestination);
            }
            this.joinEntity(BlockchainOrderFactory.BUY_DESTINATION, buyDestination, sandra);
        }

        this.addReference(new Reference(sandra.get(BlockchainOrderFactory.BUY_AMOUNT), buyAmount));
        if(tokenBuy) this.joinEntity(BlockchainOrderFactory.TOKEN_BUY, tokenBuy, sandra, BlockchainOrder.getRefArray(tokenBuy));

        this.addReference(new Reference(sandra.get(BlockchainOrderFactory.SELL_PRICE), sellPrice));
        if(tokenSell) this.joinEntity(BlockchainOrderFactory.TOKEN_SELL, tokenSell, sandra, BlockchainOrder.getRefArray(tokenSell));

        this.joinEntity(BlockchainOrderFactory.ORDER_BUY_CONTRACT,buyContract,sandra);
        this.joinEntity(BlockchainOrderFactory.ORDER_SELL_CONTRACT,sellContract,sandra);

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

