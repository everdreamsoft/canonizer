import {EntityFactory} from "../EntityFactory";
import {SandraManager} from "../SandraManager";


export class BlockchainEmoteFactory extends EntityFactory
{

    public is_a: string = 'tokenEmote';
    public contained_in_file = 'tokenEmoteFile';
    public static EMOTE_ID = "emoteId";
    public static EVENT_TYPE = 'emote';
    public static EMOTE_SOURCE_ADDRESS = "source";
    public static EMOTE_UNICODE = "emote";
    public static ON_TOKEN = "onToken";
    public static CREATION_DATE = "createOn";

    public constructor(sandra: SandraManager) {
        super('emote', 'emoteFile', sandra);

        this.updateOnExistingRef = sandra.get(BlockchainEmoteFactory.EMOTE_ID);
    }

}