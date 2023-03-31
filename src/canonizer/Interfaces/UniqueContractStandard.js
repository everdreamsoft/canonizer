"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueContractStandard = void 0;
const Reference_js_1 = require("../../Reference.js");
const ContractStandard_js_1 = require("../ContractStandard.js");
class UniqueContractStandard extends ContractStandard_js_1.ContractStandard {
    getDisplayStructure() {
        return "tokenId-" + this.getTokenId();
    }
    constructor(canonizeManager, tokenTokenId) {
        let factory = canonizeManager.getContractStandardFactory();
        super(factory, [new Reference_js_1.Reference(canonizeManager.getSandra().get('class_name'), "CsCannon\\\Blockchains\\\Substrate\\\Unique\\\UniqueContractStandard")]);
        this.sandra = canonizeManager.getSandra();
        if (tokenTokenId) {
            this.setTokenId(tokenTokenId);
        }
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