"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainTokenFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
class BlockchainTokenFactory extends EntityFactory_js_1.EntityFactory {
    constructor(canonizeManager) {
        super('tokenPath', 'tokenPathFile', canonizeManager.getSandra(), canonizeManager.getSandra().get(BlockchainTokenFactory.ID));
        this.is_a = 'tokenPath';
        this.contained_in_file = 'tokenPathFile';
    }
}
exports.BlockchainTokenFactory = BlockchainTokenFactory;
BlockchainTokenFactory.ID = 'code';
//# sourceMappingURL=BlockchainTokenFactory.js.map