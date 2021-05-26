import {EntityFactory} from "../EntityFactory";
import {SandraManager} from "../SandraManager";


export class BlockchainEmoteFactory extends EntityFactory
{

    public is_a: string = 'tokenEmote';
    public contained_in_file = 'tokenEmoteFile';

    public static EMOTE_ID = "emoteId";
    public static EMOTE_SOURCE_ADDRESS = 'source';
    public static EVENT_BLOCK_TIME = 'timestamp';
    public static ON_BLOCKCHAIN = 'onBlockchain';
    public static EMOTE_BLOCK = 'onBlock';
    public static EMOTE_UNICODE = 'emote';
    public static TARGET_CONTRACT = "targetContract";
    public static TARGET_TOKEN = "targetToken";
    public static BLOCKCHAIN_EVENT_TYPE_VERB = "blockchainEventType"

    public constructor(sandra: SandraManager) {
        super('emoteEvent', 'emoteEventFile', sandra);

        this.updateOnExistingRef = sandra.get(BlockchainEmoteFactory.EMOTE_ID);
    }

}