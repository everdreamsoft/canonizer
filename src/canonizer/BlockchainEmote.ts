import {Entity} from "../Entity";
import {BlockchainEmoteFactory} from "./BlockchainEmoteFactory";
import {SandraManager} from "../SandraManager";
import {Reference} from "../Reference";
import {Blockchain} from "./Blockchain";
import {BlockchainContract} from "./BlockchainContract";
import {BlockchainAddress} from "./BlockchainAddress";
import {BlockchainBlock} from "./BlockchainBlock";
import {BlockchainToken} from "./BlockchainToken";
import {BlockchainTokenFactory} from "./BlockchainTokenFactory";

export class BlockchainEmote extends Entity
{

    public static eventType = "emoteEvent";

    constructor(
        factory: BlockchainEmoteFactory,
        sandra: SandraManager,
        blockchain: Blockchain,
        source: string|BlockchainAddress,
        txId: string,
        blockId: number,
        timestamp: string,
        emote: string,
        token: BlockchainToken,
        contract: BlockchainContract
        ) {
        super(factory);


        if(typeof source == "string"){
            source =  blockchain.addressFactory.getOrCreate(source);
        }

        // Create emoteId for updateOnExistingRef
        const contractId = contract.getRefValue(sandra.get("id"));
        const sn = token.getRefValue(sandra.get(BlockchainTokenFactory.ID));
        const emoteId = source.getAddress() +"_"+ emote +"_"+ contractId +"-"+ sn;

        // Add generic on refs data (tx, block etc)
        this.addReference(new Reference(sandra.get(BlockchainEmoteFactory.EMOTE_ID), emoteId));
        this.addReference(new Reference(sandra.get(Blockchain.TXID_CONCEPT_NAME), txId));
        this.addReference(new Reference(sandra.get(BlockchainEmoteFactory.EVENT_BLOCK_TIME), timestamp));

        // add emote
        this.addReference(new Reference(sandra.get(BlockchainEmoteFactory.EMOTE_UNICODE), emote));

        const blockchainBlock = new BlockchainBlock(blockchain.blockFactory, blockId, timestamp, sandra);

        // Add generic data as triplet and entity
        this.joinEntity(BlockchainEmoteFactory.EMOTE_BLOCK, blockchainBlock, sandra);
        this.setTriplet(BlockchainEmoteFactory.ON_BLOCKCHAIN, blockchain.getName(), sandra);

        // Add owner Blockchain "Event" verb ?
        this.setTriplet(BlockchainEmoteFactory.BLOCKCHAIN_EVENT_TYPE_VERB, BlockchainEmote.eventType, sandra);

        // Add emote data
        this.joinEntity(BlockchainEmoteFactory.EMOTE_SOURCE_ADDRESS, source, sandra);
        this.joinEntity(BlockchainEmoteFactory.TARGET_CONTRACT, contract, sandra);
        this.joinEntity(BlockchainEmoteFactory.TARGET_TOKEN, token, sandra);



    }

}