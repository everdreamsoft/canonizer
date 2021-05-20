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
import { Blockchain } from "../Blockchain.js";
var SubstrateBlockchain = /** @class */ (function (_super) {
    __extends(SubstrateBlockchain, _super);
    function SubstrateBlockchain(sandra) {
        var _this = _super.call(this, sandra) || this;
        _this.addressFactory.is_a = 'substrateAddress';
        _this.addressFactory.contained_in_file = 'substrateAddressFile';
        return _this;
    }
    SubstrateBlockchain.blockchainName = 'substrate';
    return SubstrateBlockchain;
}(Blockchain));
export { SubstrateBlockchain };
//# sourceMappingURL=SubstrateBlockchain.js.map