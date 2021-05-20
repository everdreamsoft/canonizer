"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
class BalanceFactory extends EntityFactory_js_1.EntityFactory {
    //private address:BlockchainAddress ;
    constructor(sandra) {
        super('balanceItem', 'balanceFile', sandra);
        this.sandra = sandra;
    }
    getBalanceForAddress() {
    }
}
exports.BalanceFactory = BalanceFactory;
//# sourceMappingURL=BalanceFactory.js.map