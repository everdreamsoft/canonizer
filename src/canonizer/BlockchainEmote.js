"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainEmote = void 0;
const Entity_1 = require("../Entity");
const BlockchainEmoteFactory_1 = require("./BlockchainEmoteFactory");
const Reference_1 = require("../Reference");
const Blockchain_1 = require("./Blockchain");
const BlockchainBlock_1 = require("./BlockchainBlock");
class BlockchainEmote extends Entity_1.Entity {
    constructor(factory, sandra, blockchain, source, txId, blockId, timestamp, emote, token, contract) {
        //TODO - Entity existing reference changes not implemented here.
        // This will show error if used. Reference for updateExisting concept should be
        // added in super constructor call, As it uses class object to create id concept
        // it can not be moved before super const call.
        super(factory, []);
        this.eventType = "emoteEvent";
        if (typeof source == "string") {
            source = blockchain.addressFactory.getOrCreate(source);
        }
        // Create emoteId for updateOnExistingRef
        const contractId = contract.getRefValue(sandra.get("id"));
        const sn = token.getDisplayStructure();
        const emoteId = source.getAddress() + "_" + emote + "_" + contractId + "-" + sn;
        // Add generic on refs data (tx, block etc)
        this.addReference(new Reference_1.Reference(sandra.get(BlockchainEmoteFactory_1.BlockchainEmoteFactory.EMOTE_ID), emoteId));
        this.addReference(new Reference_1.Reference(sandra.get(Blockchain_1.Blockchain.TXID_CONCEPT_NAME), txId));
        this.addReference(new Reference_1.Reference(sandra.get(BlockchainEmoteFactory_1.BlockchainEmoteFactory.EVENT_BLOCK_TIME), timestamp));
        // add emote
        this.addReference(new Reference_1.Reference(sandra.get(BlockchainEmoteFactory_1.BlockchainEmoteFactory.EMOTE_UNICODE), emote));
        const blockchainBlock = new BlockchainBlock_1.BlockchainBlock(blockchain.blockFactory, blockId, timestamp, blockchain, sandra);
        // Add generic data as triplet and entity
        this.joinEntity(BlockchainEmoteFactory_1.BlockchainEmoteFactory.EMOTE_BLOCK, blockchainBlock, sandra);
        this.setTriplet(BlockchainEmoteFactory_1.BlockchainEmoteFactory.ON_BLOCKCHAIN, blockchain.getName(), sandra);
        // Add owner Blockchain "Event" verb ?
        this.setTriplet(BlockchainEmoteFactory_1.BlockchainEmoteFactory.BLOCKCHAIN_EVENT_TYPE_VERB, this.eventType, sandra);
        // Add emote data
        this.joinEntity(BlockchainEmoteFactory_1.BlockchainEmoteFactory.EMOTE_SOURCE_ADDRESS, source, sandra);
        this.joinEntity(BlockchainEmoteFactory_1.BlockchainEmoteFactory.TARGET_CONTRACT, contract, sandra);
        this.joinEntity(BlockchainEmoteFactory_1.BlockchainEmoteFactory.TARGET_TOKEN, token, sandra, BlockchainEmote.getRefArray(token));
    }
    static getRefArray(token) {
        let refArray = [];
        if (token) {
            //we need to get the tokenpath data and add it as reference on the event
            let specifierMap = token.getSpecifierArray();
            for (let specifier of specifierMap) {
                // console.log(specifier[0]);
                refArray.push(new Reference_1.Reference(specifier[0], specifier[1]));
            }
        }
        return refArray;
    }
}
exports.BlockchainEmote = BlockchainEmote;
//# sourceMappingURL=BlockchainEmote.js.map