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
import { Reference } from "../../Reference.js";
import { ContractStandard } from "../ContractStandard.js";
var RmrkContractStandard = /** @class */ (function (_super) {
    __extends(RmrkContractStandard, _super);
    function RmrkContractStandard(canonizeManager, tokenSn) {
        var _this = this;
        var factory = canonizeManager.getContractStandardFactory();
        _this = _super.call(this, factory) || this;
        _this.name = 'RmrkStandard';
        _this.sandra = canonizeManager.getSandra();
        //we need to bind the the standard to the canonizer class
        _this.addReference(new Reference(canonizeManager.getSandra().get('class_name'), "CsCannon\\\Blockchains\\\Interfaces\\\RmrkContractStandard"));
        if (tokenSn) {
            _this.setSn(tokenSn);
        }
        return _this;
    }
    RmrkContractStandard.prototype.getDisplayStructure = function () {
        return "sn-" + this.getSn();
    };
    RmrkContractStandard.prototype.setSn = function (value) {
        this.setSpecifierValue(this.sandra.get('sn'), value);
    };
    RmrkContractStandard.prototype.getSn = function () {
        if (!this.getSpecifierArray().get(this.sandra.get('sn')))
            throw new Error("Sn not specified for rmrk token");
        return this.getSpecifierArray().get(this.sandra.get('sn'));
    };
    return RmrkContractStandard;
}(ContractStandard));
export { RmrkContractStandard };
//# sourceMappingURL=RmrkContractStandard.js.map