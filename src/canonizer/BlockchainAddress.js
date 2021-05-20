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
import { BlockchainAddressFactory } from "./BlockchainAddressFactory.js";
import { Reference } from "../Reference.js";
var BlockchainAddress = /** @class */ (function (_super) {
    __extends(BlockchainAddress, _super);
    function BlockchainAddress(factory, address, sandraManager) {
        var _this = this;
        if (factory == null)
            factory = new BlockchainAddressFactory(sandraManager);
        _this = _super.call(this, factory) || this;
        _this.addReference(new Reference(sandraManager.get('address'), address));
        _this.setTriplet(BlockchainAddressFactory.ON_BLOCKCHAIN, factory.onBlockchain, sandraManager);
        return _this;
    }
    BlockchainAddress.prototype.getAddress = function () {
        return this.getRefValue('address') ? this.getRefValue('address') : '';
    };
    return BlockchainAddress;
}(Entity));
export { BlockchainAddress };
//# sourceMappingURL=BlockchainAddress.js.map