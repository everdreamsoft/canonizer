"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainOrder = void 0;
const Entity_js_1 = require("../Entity.js");
const Reference_js_1 = require("../Reference.js");
const Blockchain_js_1 = require("./Blockchain.js");
const BlockchainBlock_js_1 = require("./BlockchainBlock.js");
const BlockchainEvent_js_1 = require("./BlockchainEvent.js");
const BlockchainOrderFactory_1 = require("./BlockchainOrderFactory");
class BlockchainOrder extends Entity_js_1.Entity {
    constructor(factory, source, buyContract, sellContract, buyAmount, sellPrice, buyTotal, txid, timestamp, blockchain, blockId, tokenBuy, tokenSell, sandra, buyDestination = "") {
        super(factory);
        this.eventType = 'order';
        this.addReference(new Reference_js_1.Reference(sandra.get(Blockchain_js_1.Blockchain.TXID_CONCEPT_NAME), txid));
        if (typeof source == "string") {
            source = blockchain.addressFactory.getOrCreate(source);
        }
        if (typeof buyContract == "string") {
            buyContract = blockchain.contractFactory.getOrCreate(buyContract);
        }
        if (typeof sellContract == "string") {
            sellContract = blockchain.contractFactory.getOrCreate(sellContract);
        }
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainOrderFactory_1.BlockchainOrderFactory.EVENT_BLOCK_TIME), timestamp));
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainOrderFactory_1.BlockchainOrderFactory.BUY_TOTAL), buyTotal));
        this.joinEntity(BlockchainOrderFactory_1.BlockchainOrderFactory.EVENT_SOURCE_ADDRESS, source, sandra);
        let blockchainBlock = new BlockchainBlock_js_1.BlockchainBlock(blockchain.blockFactory, blockId, timestamp, sandra);
        this.joinEntity(BlockchainOrderFactory_1.BlockchainOrderFactory.EVENT_BLOCK, blockchainBlock, sandra);
        this.setTriplet(BlockchainOrderFactory_1.BlockchainOrderFactory.ON_BLOCKCHAIN, blockchain.name, sandra);
        this.setTriplet(BlockchainEvent_js_1.BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB, this.eventType, sandra);
        if (buyDestination != "") {
            if (typeof buyDestination == "string") {
                buyDestination = blockchain.addressFactory.getOrCreate(buyDestination);
            }
            this.joinEntity(BlockchainOrderFactory_1.BlockchainOrderFactory.BUY_DESTINATION, buyDestination, sandra);
        }
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainOrderFactory_1.BlockchainOrderFactory.BUY_AMOUNT), buyAmount));
        if (tokenBuy)
            this.joinEntity(BlockchainOrderFactory_1.BlockchainOrderFactory.TOKEN_BUY, tokenBuy, sandra, BlockchainOrder.getRefArray(tokenBuy));
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainOrderFactory_1.BlockchainOrderFactory.SELL_PRICE), sellPrice));
        if (tokenSell)
            this.joinEntity(BlockchainOrderFactory_1.BlockchainOrderFactory.TOKEN_SELL, tokenSell, sandra, BlockchainOrder.getRefArray(tokenSell));
        this.joinEntity(BlockchainOrderFactory_1.BlockchainOrderFactory.ORDER_BUY_CONTRACT, buyContract, sandra);
        this.joinEntity(BlockchainOrderFactory_1.BlockchainOrderFactory.ORDER_SELL_CONTRACT, sellContract, sandra);
    }
    static getRefArray(token) {
        let refArray = [];
        if (token) {
            //we need to get the tokenpath data and add it as reference on the event
            let specifierMap = token.getSpecifierArray();
            for (let specifier of specifierMap) {
                // console.log(specifier[0]);
                refArray.push(new Reference_js_1.Reference(specifier[0], specifier[1]));
            }
        }
        return refArray;
    }
}
exports.BlockchainOrder = BlockchainOrder;
//# sourceMappingURL=BlockchainOrder.js.map