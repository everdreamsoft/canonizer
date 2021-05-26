import {Entity} from "../Entity";
import {BlockchainEmoteFactory} from "./BlockchainEmoteFactory";
import {SandraManager} from "../SandraManager";
import {BlockchainAddressFactory} from "./BlockchainAddressFactory";
import {Reference} from "../Reference";
import {BlockchainEvent} from "./BlockchainEvent";
import {Blockchain} from "./Blockchain";

export interface EmoteInterface{

    sender: string,
    unicode: string,
    contract: string,
    sb: string,
    timestamp: string,

}

export class BlockchainEmote extends Entity
{

    private sandra: SandraManager;

    constructor(factory: BlockchainEmoteFactory, sandra: SandraManager, emoteInterface: EmoteInterface, blockchain: Blockchain) {
        super(factory);

        this.sandra = sandra;

        this.addReference(new Reference(sandra.get(BlockchainEmoteFactory.EMOTE_ID), emoteInterface.sender+"_"+emoteInterface.unicode));

        const blockchainAddress = new BlockchainAddressFactory(sandra);
        const sender = blockchainAddress.getOrCreate(emoteInterface.sender);

        this.setTriplet(BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB, BlockchainEmoteFactory.EVENT_TYPE, sandra);

        this.joinEntity(BlockchainEmoteFactory.EMOTE_SOURCE_ADDRESS, sender, sandra);

        // get blockchain token with ID ?
        const token = blockchain.contractFactory.getOrCreate(emoteInterface.contract);
        // const token = blockchain.contractFactory.getOrCreate(emoteInterface.token);
        // this.joinEntity(BlockchainEmoteFactory.ON_TOKEN, token, sandra);
        this.setTriplet(BlockchainEmoteFactory.ON_TOKEN, emoteInterface.token, sandra);

        this.setTriplet(BlockchainEmoteFactory.EMOTE_UNICODE, emoteInterface.unicode, sandra);

        this.addReference(new Reference(sandra.get(BlockchainEmoteFactory.CREATION_DATE), emoteInterface.timestamp));

    }

}