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
exports.BlockchainEmoteFactory = void 0;
var EntityFactory_1 = require("../EntityFactory");
var BlockchainEmoteFactory = /** @class */ (function (_super) {
    __extends(BlockchainEmoteFactory, _super);
    function BlockchainEmoteFactory(sandra) {
        var _this = _super.call(this, 'emoteEvent', 'emoteEventFile', sandra) || this;
        _this.is_a = 'emoteEvent';
        _this.contained_in_file = 'emoteEventFile';
        _this.updateOnExistingRef = sandra.get(BlockchainEmoteFactory.EVENT_BLOCK_TIME);
        return _this;
    }
    BlockchainEmoteFactory.EMOTE_ID = "emoteId";
    BlockchainEmoteFactory.EMOTE_SOURCE_ADDRESS = 'source';
    BlockchainEmoteFactory.EVENT_BLOCK_TIME = 'timestamp';
    BlockchainEmoteFactory.ON_BLOCKCHAIN = 'onBlockchain';
    BlockchainEmoteFactory.EMOTE_BLOCK = 'onBlock';
    BlockchainEmoteFactory.EMOTE_UNICODE = 'emote';
    BlockchainEmoteFactory.TARGET_CONTRACT = "targetContract";
    BlockchainEmoteFactory.TARGET_TOKEN = "targetToken";
    BlockchainEmoteFactory.BLOCKCHAIN_EVENT_TYPE_VERB = "blockchainEventType";
    return BlockchainEmoteFactory;
}(EntityFactory_1.EntityFactory));
exports.BlockchainEmoteFactory = BlockchainEmoteFactory;
