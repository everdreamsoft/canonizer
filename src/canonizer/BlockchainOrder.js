"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainOrder = void 0;
const Entity_js_1 = require("../Entity.js");
const Reference_js_1 = require("../Reference.js");
const Blockchain_js_1 = require("./Blockchain.js");
const BlockchainBlock_js_1 = require("./BlockchainBlock.js");
const BlockchainEvent_js_1 = require("./BlockchainEvent.js");
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
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainOrder.EVENT_BLOCK_TIME), timestamp));
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainOrder.BUY_TOTAL), buyTotal));
        this.joinEntity(BlockchainOrder.EVENT_SOURCE_ADDRESS, source, sandra);
        let blockchainBlock = new BlockchainBlock_js_1.BlockchainBlock(blockchain.blockFactory, blockId, timestamp, sandra);
        this.joinEntity(BlockchainOrder.EVENT_BLOCK, blockchainBlock, sandra);
        this.setTriplet(BlockchainOrder.ON_BLOCKCHAIN, blockchain.name, sandra);
        this.setTriplet(BlockchainEvent_js_1.BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB, this.eventType, sandra);
        if (buyDestination != "") {
            if (typeof buyDestination == "string") {
                buyDestination = blockchain.addressFactory.getOrCreate(buyDestination);
            }
            this.joinEntity(BlockchainOrder.BUY_DESTINATION, buyDestination, sandra);
        }
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainOrder.BUY_AMOUNT), buyAmount));
        if (tokenBuy)
            this.joinEntity(BlockchainOrder.TOKEN_BUY, tokenBuy, sandra, BlockchainOrder.getRefArray(tokenBuy));
        this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainOrder.SELL_PRICE), sellPrice));
        if (tokenSell)
            this.joinEntity(BlockchainOrder.TOKEN_SELL, tokenSell, sandra, BlockchainOrder.getRefArray(tokenSell));
        this.joinEntity(BlockchainOrder.ORDER_BUY_CONTRACT, buyContract, sandra);
        this.joinEntity(BlockchainOrder.ORDER_SELL_CONTRACT, sellContract, sandra);
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
BlockchainOrder.EVENT_SOURCE_ADDRESS = 'source';
BlockchainOrder.EVENT_BLOCK_TIME = 'timestamp';
BlockchainOrder.ON_BLOCKCHAIN = 'onBlockchain';
BlockchainOrder.EVENT_BLOCK = 'onBlock';
BlockchainOrder.BUY_AMOUNT = "buyAmount";
BlockchainOrder.SELL_PRICE = "sellPrice";
BlockchainOrder.BUY_TOTAL = "buyTotal";
BlockchainOrder.ORDER_BUY_CONTRACT = "buyContract";
BlockchainOrder.ORDER_SELL_CONTRACT = "sellContract";
BlockchainOrder.BUY_DESTINATION = "buyDestination";
BlockchainOrder.TOKEN_BUY = "tokenBuy";
BlockchainOrder.TOKEN_SELL = "tokenSell";
//# sourceMappingURL=BlockchainOrder.js.map