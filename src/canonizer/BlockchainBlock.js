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
exports.BlockchainBlock = void 0;
var Entity_js_1 = require("../Entity.js");
var Reference_js_1 = require("../Reference.js");
var BlockchainBlock = /** @class */ (function (_super) {
    __extends(BlockchainBlock, _super);
    function BlockchainBlock(factory, blockId, blockTimestamp, sandraManager) {
        return _super.call(this, factory, [
            new Reference_js_1.Reference(sandraManager.get(BlockchainBlock.INDEX_SHORTNAME), blockId.toString()),
            new Reference_js_1.Reference(sandraManager.get(BlockchainBlock.BLOCK_TIMESTAMP), blockTimestamp)
        ]) || this;
    }
    BlockchainBlock.prototype.getBlockId = function () {
        return this.getRefValue(BlockchainBlock.INDEX_SHORTNAME);
    };
    BlockchainBlock.INDEX_SHORTNAME = 'blockIndex';
    BlockchainBlock.BLOCK_TIMESTAMP = 'timestamp';
    return BlockchainBlock;
}(Entity_js_1.Entity));
exports.BlockchainBlock = BlockchainBlock;
