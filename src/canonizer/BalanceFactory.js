"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
class BalanceFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super('balanceItem', 'balanceFile', sandra);
        this.sandra = sandra;
    }
}
exports.BalanceFactory = BalanceFactory;
//Reference
BalanceFactory.BALANCE_ITEM_ID = 'id';
BalanceFactory.QUANTITY = 'quantity';
// Joined Entities
BalanceFactory.LINKED_ADDRESS = 'belongsToAddress';
BalanceFactory.ON_CONTRACT = 'onContract';
BalanceFactory.LAST_BLOCK_UPDATE = 'lastBlockUpdate';
//# sourceMappingURL=BalanceFactory.js.map