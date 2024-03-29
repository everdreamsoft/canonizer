"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmrkContractStandard = void 0;
const Reference_js_1 = require("../../Reference.js");
const ContractStandard_js_1 = require("../ContractStandard.js");
class RmrkContractStandard extends ContractStandard_js_1.ContractStandard {
    getDisplayStructure() {
        return "sn-" + this.getSn();
    }
    constructor(canonizeManager, tokenSn) {
        let factory = canonizeManager.getContractStandardFactory();
        super(factory, [new Reference_js_1.Reference(canonizeManager.getSandra().get('class_name'), "CsCannon\\\Blockchains\\\Interfaces\\\RmrkContractStandard")]);
        this.name = 'RmrkStandard';
        this.sandra = canonizeManager.getSandra();
        if (tokenSn) {
            this.setSn(tokenSn);
        }
    }
    setSn(value) {
        this.setSpecifierValue(this.sandra.get('sn'), value);
    }
    getSn() {
        if (!this.getSpecifierArray().get(this.sandra.get('sn')))
            throw new Error("Sn not specified for rmrk token");
        return this.getSpecifierArray().get(this.sandra.get('sn'));
    }
}
exports.RmrkContractStandard = RmrkContractStandard;
//# sourceMappingURL=RmrkContractStandard.js.map