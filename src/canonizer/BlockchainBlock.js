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
import { Entity } from "../Entity.js";
import { Reference } from "../Reference.js";
var BlockchainBlock = /** @class */ (function (_super) {
    __extends(BlockchainBlock, _super);
    function BlockchainBlock(factory, blockId, blockTimestamp, sandraManager) {
        var _this = _super.call(this, factory) || this;
        _this.addReference(new Reference(sandraManager.get(BlockchainBlock.INDEX_SHORTNAME), blockId.toString()));
        _this.addReference(new Reference(sandraManager.get(BlockchainBlock.BLOCK_TIMESTAMP), blockTimestamp));
        return _this;
    }
    BlockchainBlock.prototype.getBlockId = function () {
        return this.getRefValue(BlockchainBlock.INDEX_SHORTNAME);
    };
    BlockchainBlock.INDEX_SHORTNAME = 'blockIndex';
    BlockchainBlock.BLOCK_TIMESTAMP = 'timestamp';
    return BlockchainBlock;
}(Entity));
export { BlockchainBlock };
//# sourceMappingURL=BlockchainBlock.js.map