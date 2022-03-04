"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BlockchainEvent = void 0;
var Entity_js_1 = require("../Entity.js");
var Reference_js_1 = require("../Reference.js");
var Blockchain_js_1 = require("./Blockchain.js");
var BlockchainBlock_js_1 = require("./BlockchainBlock.js");
var BlockchainEvent = /** @class */ (function (_super) {
    __extends(BlockchainEvent, _super);
    function BlockchainEvent(factory, source, destination, contract, txid, timestamp, quantity, blockchain, blockId, token, sandra) {
        var _this = _super.call(this, factory, [new Reference_js_1.Reference(sandra.get(Blockchain_js_1.Blockchain.TXID_CONCEPT_NAME), txid)]) || this;
        _this.eventType = 'transfer';
        if (typeof source == "string") {
            source = blockchain.addressFactory.getOrCreate(source);
        }
        if (typeof destination == "string") {
            destination = blockchain.addressFactory.getOrCreate(destination);
        }
        if (typeof contract == "string") {
            contract = blockchain.contractFactory.getOrCreate(contract);
        }
        _this.setTriplet(BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB, _this.eventType, sandra);
        _this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainEvent.EVENT_BLOCK_TIME), timestamp));
        _this.addReference(new Reference_js_1.Reference(sandra.get(BlockchainEvent.QUANTITY), quantity));
        _this.joinEntity(BlockchainEvent.EVENT_SOURCE_ADDRESS, source, sandra);
        _this.joinEntity(BlockchainEvent.EVENT_DESTINATION_VERB, destination, sandra);
        //create the block
        var blockchainBlock = new BlockchainBlock_js_1.BlockchainBlock(blockchain.blockFactory, blockId, timestamp, sandra);
        _this.joinEntity(BlockchainEvent.EVENT_BLOCK, blockchainBlock, sandra);
        _this.setTriplet(BlockchainEvent.ON_BLOCKCHAIN, blockchain.name, sandra);
        var refArray = [];
        if (token) {
            //we need to get the tokenpath data and add it as reference on the event
            var specifierMap = token.getSpecifierArray();
            for (var _i = 0, specifierMap_1 = specifierMap; _i < specifierMap_1.length; _i++) {
                var specifier = specifierMap_1[_i];
                refArray.push(new Reference_js_1.Reference(specifier[0], specifier[1]));
            }
        }
        _this.joinEntity(BlockchainEvent.EVENT_SOURCE_CONTRACT, contract, sandra, refArray);
        return _this;
    }
    BlockchainEvent.EVENT_SOURCE_ADDRESS = 'source';
    BlockchainEvent.EVENT_DESTINATION_VERB = 'hasSingleDestination';
    BlockchainEvent.EVENT_SOURCE_CONTRACT = 'blockchainContract';
    BlockchainEvent.EVENT_BLOCK_TIME = 'timestamp';
    BlockchainEvent.QUANTITY = 'quantity';
    BlockchainEvent.ON_BLOCKCHAIN = 'onBlockchain';
    BlockchainEvent.EVENT_BLOCK = 'onBlock';
    BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB = "blockchainEventType";
    return BlockchainEvent;
}(Entity_js_1.Entity));
exports.BlockchainEvent = BlockchainEvent;
