"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceEntity = void 0;
const BalanceFactory_1 = require("./BalanceFactory");
const Entity_1 = require("../Entity");
const Reference_1 = require("../Reference");
class BalanceEntity extends Entity_1.Entity {
    constructor(balanceFactory, balanceData) {
        super(balanceFactory, [new Reference_1.Reference(balanceFactory.sandraManager.get(BalanceFactory_1.BalanceFactory.BALANCE_ITEM_LONG_ID), BalanceEntity.getBalanceUniqueLongId(balanceData.contract, balanceData.address, balanceFactory.sandraManager))]);
        this.addReference(new Reference_1.Reference(balanceFactory.sandraManager.get(BalanceFactory_1.BalanceFactory.BALANCE_ITEM_ID), BalanceEntity.getBalanceId(balanceData.contract)));
        this.addReference(new Reference_1.Reference(balanceFactory.sandraManager.get(BalanceFactory_1.BalanceFactory.QUANTITY), balanceData.quantity));
        if (balanceData.specifierArray && balanceData.specifierArray.size > 0)
            balanceData.specifierArray.forEach((value, key) => {
                this.addReference(new Reference_1.Reference(balanceFactory.sandraManager.get(key.shortname), value));
            });
        this.joinEntity(BalanceFactory_1.BalanceFactory.ON_CONTRACT, balanceData.contract, this.factory.sandraManager);
        this.joinEntity(BalanceFactory_1.BalanceFactory.LINKED_ADDRESS, balanceData.address, this.factory.sandraManager);
    }
    static getBalanceUniqueLongId(contract, address, sandra) {
        let standardArray = contract.getStandard();
        let ret = contract.getRefValue("id") + "-" + address.getRefValue(sandra.get("address")) + "-" + standardArray[0].getDisplayStructure();
        if (standardArray && standardArray.length > 0)
            return contract.getRefValue("id") + "-" + address.getRefValue(sandra.get("address")) + "-" + standardArray[0].getDisplayStructure();
        return contract.getRefValue("id") + "-" + address.getRefValue(sandra.get("address")) + "-" + "NULL";
    }
    static getBalanceId(contract) {
        let standardArray = contract.getStandard();
        if (standardArray && standardArray.length > 0)
            return contract.getRefValue("id") + "-" + standardArray[0].getDisplayStructure();
        return contract.getRefValue("id") + "-" + "NULL";
    }
    bindContract(contract) {
        this.joinEntity(BalanceFactory_1.BalanceFactory.ON_CONTRACT, contract, this.factory.sandraManager);
    }
    bindAddress(address) {
        this.joinEntity(BalanceFactory_1.BalanceFactory.LINKED_ADDRESS, address, this.factory.sandraManager);
    }
}
exports.BalanceEntity = BalanceEntity;
//# sourceMappingURL=BalanceEntity.js.map