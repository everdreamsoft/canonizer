import {Entity} from "../Entity";
import {ChangeIssuerFactory} from "./ChangeIssuerFactory";
import {BlockchainAddress} from "./BlockchainAddress";
import {Blockchain} from "./Blockchain";
import {Reference} from "../Reference";
import {SandraManager} from "../SandraManager";
import {BlockchainEvent} from "./BlockchainEvent";
import {BlockchainBlock} from "./BlockchainBlock";


export class ChangeIssuer extends Entity
{

    public eventType: string = "changeIssuer";


    public constructor(
        factory: ChangeIssuerFactory,
        source: BlockchainAddress|string,
        collectionId: string,
        newIssuer: BlockchainAddress|string,
        txId: string,
        timestamp: string,
        blockId: number,
        blockchain: Blockchain,
        sandra: SandraManager
    ) {

        super(factory, [new Reference(sandra.get(Blockchain.TXID_CONCEPT_NAME), txId)]);

        this.addReference(new Reference(sandra.get(ChangeIssuerFactory.COLLECTION_ID), collectionId));

        if(typeof source == "string"){
            source = blockchain.addressFactory.getOrCreate(source);
        }

        if(typeof newIssuer == "string"){
            newIssuer = blockchain.addressFactory.getOrCreate(newIssuer);
        }

        this.addReference(new Reference(sandra.get(ChangeIssuerFactory.EVENT_BLOCK_TIME), timestamp));

        this.setTriplet(ChangeIssuerFactory.ON_BLOCKCHAIN, blockchain.name, sandra);
        this.setTriplet(BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB, this.eventType, sandra);

        const blockchainBlock = new BlockchainBlock(blockchain.blockFactory,blockId,timestamp,sandra);
        this.joinEntity(ChangeIssuerFactory.EVENT_BLOCK, blockchainBlock, sandra);

        this.joinEntity(ChangeIssuerFactory.EVENT_SOURCE_ADDRESS, source, sandra);
        this.joinEntity(ChangeIssuerFactory.NEW_ISSUER, newIssuer, sandra);

    }

}
