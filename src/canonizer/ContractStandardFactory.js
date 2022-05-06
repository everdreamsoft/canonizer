"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractStandardFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
class ContractStandardFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super('blockchainContract', 'blockchainStandardFile', sandra, sandra.get(ContractStandardFactory.CLASS_NAME));
        this.is_a = 'blockchainStandard';
        this.contained_in_file = 'blockchainStandardFile';
    }
}
exports.ContractStandardFactory = ContractStandardFactory;
ContractStandardFactory.CLASS_NAME = "class_name";
//# sourceMappingURL=ContractStandardFactory.js.map