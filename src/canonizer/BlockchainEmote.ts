import {Entity} from "../Entity";
import {BlockchainEmoteFactory} from "./BlockchainEmoteFactory";
import {SandraManager} from "../SandraManager";
import {Reference} from "../Reference";
import {Blockchain} from "./Blockchain";
import {BlockchainContract} from "./BlockchainContract";
import {BlockchainAddress} from "./BlockchainAddress";
import {BlockchainBlock} from "./BlockchainBlock";
import {ContractStandard} from "./ContractStandard";

export class BlockchainEmote extends Entity {

    public eventType = "emoteEvent";

    constructor(
        factory: BlockchainEmoteFactory,
        sandra: SandraManager,
        blockchain: Blockchain,
        source: string | BlockchainAddress,
        txId: string,
        blockId: number,
        timestamp: string,
        emote: string,
        token: ContractStandard,
        contract: BlockchainContract
    ) {

        //TODO - Entity existing reference changes not implemented here.
        // This will show error if used. Reference for updateExisting concept should be
        // added in super constructor call, As it uses class object to create id concept
        // it can not be moved before super const call.
        super(factory, []);


        if (typeof source == "string") {
            source = blockchain.addressFactory.getOrCreate(source);
        }

        // Create emoteId for updateOnExistingRef
        const contractId = contract.getRefValue(sandra.get("id"));
        const sn = token.getDisplayStructure();
        const emoteId = source.getAddress() + "_" + emote + "_" + contractId + "-" + sn;

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
        this.setTriplet(BlockchainEmoteFactory.BLOCKCHAIN_EVENT_TYPE_VERB, this.eventType, sandra);

        // Add emote data
        this.joinEntity(BlockchainEmoteFactory.EMOTE_SOURCE_ADDRESS, source, sandra);
        this.joinEntity(BlockchainEmoteFactory.TARGET_CONTRACT, contract, sandra);
        this.joinEntity(BlockchainEmoteFactory.TARGET_TOKEN, token, sandra, BlockchainEmote.getRefArray(token));

    }


    private static getRefArray(token: ContractStandard | null): Array<Reference> | [] {
        let refArray: Reference[] = [];

        if (token) {
            //we need to get the tokenpath data and add it as reference on the event
            let specifierMap = token.getSpecifierArray()

            for (let specifier of specifierMap) {
                // console.log(specifier[0]);
                refArray.push(new Reference(specifier[0], specifier[1]));
            }

        }

        return refArray;
    }

}
