"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueContractStandard = void 0;
const Reference_js_1 = require("../../Reference.js");
const ContractStandard_js_1 = require("../ContractStandard.js");
const ContractStandardFactory_1 = require("../ContractStandardFactory");
class UniqueContractStandard extends ContractStandard_js_1.ContractStandard {
    constructor(canonizeManager, tokenTokenId) {
        let factory = canonizeManager.getContractStandardFactory();
        super(factory, [new Reference_js_1.Reference(canonizeManager.getSandra().get(ContractStandardFactory_1.ContractStandardFactory.CLASS_NAME), "CsCannon\\\Blockchains\\\Substrate\\\Unique\\\UniqueContractStandard")]);
        this.sandra = canonizeManager.getSandra();
        if (tokenTokenId) {
            this.setTokenId(tokenTokenId);
        }
    }
    getDisplayStructure() {
        return "tokenId-" + this.getTokenId();
    }
    setTokenId(value) {
        this.setSpecifierValue(this.sandra.get('tokenId'), value);
    }
    getTokenId() {
        if (!this.getSpecifierArray().get(this.sandra.get('tokenId')))
            throw new Error("tokenId not specified for unique contract");
        return this.getSpecifierArray().get(this.sandra.get('tokenId'));
    }
}
exports.UniqueContractStandard = UniqueContractStandard;
//# sourceMappingURL=UniqueContractStandard.js.map