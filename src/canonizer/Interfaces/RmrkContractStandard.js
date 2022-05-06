"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmrkContractStandard = void 0;
const Reference_js_1 = require("../../Reference.js");
const ContractStandard_js_1 = require("../ContractStandard.js");
const ContractStandardFactory_1 = require("../ContractStandardFactory");
class RmrkContractStandard extends ContractStandard_js_1.ContractStandard {
    constructor(canonizeManager, tokenSn) {
        let factory = canonizeManager.getContractStandardFactory();
        super(factory, [new Reference_js_1.Reference(canonizeManager.getSandra().get(ContractStandardFactory_1.ContractStandardFactory.CLASS_NAME), "CsCannon\\\Blockchains\\\Interfaces\\\RmrkContractStandard")]);
        this.name = 'RmrkStandard';
        this.sandra = canonizeManager.getSandra();
        if (tokenSn) {
            this.setSn(tokenSn);
        }
    }
    getDisplayStructure() {
        return "sn-" + this.getSn();
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