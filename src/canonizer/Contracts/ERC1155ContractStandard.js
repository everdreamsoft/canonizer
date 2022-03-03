"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC1155ContractStandard = void 0;
const Reference_js_1 = require("../../Reference.js");
const ContractStandard_js_1 = require("../ContractStandard.js");
class ERC1155ContractStandard extends ContractStandard_js_1.ContractStandard {
    constructor(canonizeManager, tokenId) {
        let factory = canonizeManager.getContractStandardFactory();
        super(factory, [new Reference_js_1.Reference(canonizeManager.getSandra().get("class_name"), "CsCannon\\Blockchains\\Contracts\\ERC1155")]);
        this.name = "ERC1155";
        this.sandra = canonizeManager.getSandra();
        if (tokenId) {
            this.setTokenId(tokenId);
        }
    }
    getDisplayStructure() {
        return "tokenId-" + this.getTokenId();
    }
    setTokenId(value) {
        this.setSpecifierValue(this.sandra.get("tokenId"), value);
    }
    getTokenId() {
        if (!this.getSpecifierArray().get(this.sandra.get("tokenId")))
            throw new Error("tokenId not specified");
        return this.getSpecifierArray().get(this.sandra.get("tokenId"));
    }
}
exports.ERC1155ContractStandard = ERC1155ContractStandard;
//# sourceMappingURL=ERC1155ContractStandard.js.map