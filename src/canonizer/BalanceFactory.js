"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BalanceFactory = void 0;
var EntityFactory_js_1 = require("../EntityFactory.js");
var BalanceFactory = /** @class */ (function (_super) {
    __extends(BalanceFactory, _super);
    function BalanceFactory(sandra, updateOnExistingRef) {
        return _super.call(this, BalanceFactory.is_a, BalanceFactory.contained_in_file, sandra, updateOnExistingRef ? sandra.get(BalanceFactory.BALANCE_ITEM_ID) : undefined) || this;
        // this.updateOnExistingRef = sandra.get(BalanceFactory.BALANCE_ITEM_ID);
    }
    BalanceFactory.is_a = 'balanceItem';
    BalanceFactory.contained_in_file = 'balanceFile';
    //Reference
    BalanceFactory.BALANCE_ITEM_ID = 'id';
    BalanceFactory.QUANTITY = 'quantity';
    // Joined Entities
    BalanceFactory.LINKED_ADDRESS = 'belongsToAddress';
    BalanceFactory.ON_CONTRACT = 'onContract';
    BalanceFactory.LAST_BLOCK_UPDATE = 'lastBlockUpdate';
    return BalanceFactory;
}(EntityFactory_js_1.EntityFactory));
exports.BalanceFactory = BalanceFactory;
