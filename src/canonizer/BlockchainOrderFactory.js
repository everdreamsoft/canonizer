"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainOrderFactory = void 0;
const EntityFactory_1 = require("../EntityFactory");
const Blockchain_1 = require("./Blockchain");
class BlockchainOrderFactory extends EntityFactory_1.EntityFactory {
    constructor(sandra) {
        super('blockchainOrder', 'blockchainOrderFile', sandra);
        this.updateOnExistingRef = sandra.get(Blockchain_1.Blockchain.TXID_CONCEPT_NAME);
    }
}
exports.BlockchainOrderFactory = BlockchainOrderFactory;
BlockchainOrderFactory.EVENT_SOURCE_ADDRESS = 'source';
BlockchainOrderFactory.EVENT_BLOCK_TIME = 'timestamp';
BlockchainOrderFactory.ON_BLOCKCHAIN = 'onBlockchain';
BlockchainOrderFactory.EVENT_BLOCK = 'onBlock';
BlockchainOrderFactory.BUY_AMOUNT = "buyAmount";
BlockchainOrderFactory.SELL_PRICE = "sellPrice";
BlockchainOrderFactory.BUY_TOTAL = "buyTotal";
BlockchainOrderFactory.ORDER_BUY_CONTRACT = "buyContract";
BlockchainOrderFactory.ORDER_SELL_CONTRACT = "sellContract";
BlockchainOrderFactory.BUY_DESTINATION = "buyDestination";
BlockchainOrderFactory.TOKEN_BUY = "tokenBuy";
BlockchainOrderFactory.TOKEN_SELL = "tokenSell";
//# sourceMappingURL=BlockchainOrderFactory.js.map