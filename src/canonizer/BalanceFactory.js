"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
class BalanceFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super(BalanceFactory.is_a, BalanceFactory.contained_in_file, sandra);
        this.updateOnExistingRef = sandra.get(BalanceFactory.BALANCE_ITEM_ID);
    }
}
exports.BalanceFactory = BalanceFactory;
BalanceFactory.is_a = 'balanceItem';
BalanceFactory.contained_in_file = 'balanceFile';
//Reference
BalanceFactory.BALANCE_ITEM_ID = 'id';
BalanceFactory.QUANTITY = 'quantity';
// Joined Entities
BalanceFactory.LINKED_ADDRESS = 'belongsToAddress';
BalanceFactory.ON_CONTRACT = 'onContract';
BalanceFactory.LAST_BLOCK_UPDATE = 'lastBlockUpdate';
//# sourceMappingURL=BalanceFactory.js.map