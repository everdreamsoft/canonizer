"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const Entity_1 = require("../../src/Entity");
const Reference_1 = require("../../src/Reference");
class TestEntity extends Entity_1.Entity {
    constructor(factory, testDat) {
        super(factory, [new Reference_1.Reference((factory.sandraManager.get("id")), testDat.id)]);
        this.addReference(new Reference_1.Reference((factory.sandraManager.get("data")), testDat.data));
    }
}
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map