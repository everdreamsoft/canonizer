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
import { Blockchain } from "../../Blockchain.js";
import { EntityFactory } from "../../../EntityFactory.js";
import { BlockchainBlock } from "../../BlockchainBlock.js";
var KusamaBlockchain = /** @class */ (function (_super) {
    __extends(KusamaBlockchain, _super);
    function KusamaBlockchain(sandra) {
        var _this = _super.call(this, sandra, 'kusama') || this;
        _this.name = 'kusama';
        _this.name = 'kusama';
        _this.addressFactory.is_a = 'kusamaAddress';
        _this.addressFactory.contained_in_file = 'blockchainAddressFile';
        _this.addressFactory.onBlockchain = _this.name;
        _this.contractFactory.is_a = 'rmrkContract';
        _this.contractFactory.contained_in_file = 'blockchainContractFile';
        _this.blockFactory = new EntityFactory(_this.getName() + "Block", "blockchainBlocFile", sandra, sandra.get(BlockchainBlock.INDEX_SHORTNAME));
        return _this;
    }
    return KusamaBlockchain;
}(Blockchain));
export { KusamaBlockchain };
//# sourceMappingURL=KusamaBlockchain.js.map