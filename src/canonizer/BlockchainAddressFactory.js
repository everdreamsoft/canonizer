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
import { EntityFactory } from "../EntityFactory.js";
import { BlockchainAddress } from "./BlockchainAddress.js";
var BlockchainAddressFactory = /** @class */ (function (_super) {
    __extends(BlockchainAddressFactory, _super);
    function BlockchainAddressFactory(sandra) {
        var _this = _super.call(this, 'blockchainAddress', 'blockchainAddressFile', sandra) || this;
        _this.is_a = 'blockchainAddress';
        _this.contained_in_file = 'blockchainAddressFile';
        _this.onBlockchain = 'genericBlockchain';
        _this.sandra = sandra;
        _this.updateOnExistingRef = sandra.get('address');
        return _this;
    }
    BlockchainAddressFactory.prototype.getOrCreate = function (address) {
        if (this.entityByRevValMap.has(this.sandra.get('address'))) {
            var addressRefMap = this.entityByRevValMap.get(this.sandra.get('address'));
            // @ts-ignore
            if (addressRefMap.has(address)) {
                //address exists in factory
                // @ts-ignore
                return addressRefMap.get(address)[0];
            }
        }
        return new BlockchainAddress(this, address, this.sandra);
    };
    BlockchainAddressFactory.ON_BLOCKCHAIN = 'onBlockchain';
    return BlockchainAddressFactory;
}(EntityFactory));
export { BlockchainAddressFactory };
//# sourceMappingURL=BlockchainAddressFactory.js.map