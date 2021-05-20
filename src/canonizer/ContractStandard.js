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
import { BlockchainToken } from "./BlockchainToken.js";
var ContractStandard = /** @class */ (function (_super) {
    __extends(ContractStandard, _super);
    function ContractStandard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.specifierArray = new Map();
        _this.name = 'genericStandard';
        return _this;
    }
    ContractStandard.prototype.setSpecifierValue = function (concept, value) {
        this.specifierArray.set(concept, value);
    };
    ContractStandard.prototype.getSpecifierArray = function () {
        return this.specifierArray;
    };
    ContractStandard.prototype.generateTokenPathEntity = function (canonizeManager) {
        return new BlockchainToken(canonizeManager, this.getDisplayStructure());
    };
    ContractStandard.prototype.getName = function () {
        return this.name;
    };
    return ContractStandard;
}(Entity));
export { ContractStandard };
//# sourceMappingURL=ContractStandard.js.map