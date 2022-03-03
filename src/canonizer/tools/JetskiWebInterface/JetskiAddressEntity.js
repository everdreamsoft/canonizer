"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiAddressEntity = void 0;
const Entity_js_1 = require("../../../Entity.js");
const Reference_1 = require("../../../Reference");
const JetskiAddressEntityFactory_1 = require("./JetskiAddressEntityFactory");
class JetskiAddressEntity extends Entity_js_1.Entity {
    constructor(factory, sandra, jetskiAddressData) {
        super(factory, [new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.HASH), jetskiAddressData.hash)]);
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.STATUS), jetskiAddressData.status));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.LAST_BLOCK_PROCESSED), jetskiAddressData.lastBlockProcessed));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.LAST_BLOCK_SAVED), jetskiAddressData.lastBlockSaved));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.LAST_UPDATE_TIME), jetskiAddressData.lastUpdateTime));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.START_BLOCK), jetskiAddressData.startBlock));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.END_BLOCK), jetskiAddressData.endBlock));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.STANDARD), jetskiAddressData.standard));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.BLOCK_RANGE), jetskiAddressData.blockRange));
    }
    bindJetskiCollection(collection) {
        this.joinEntity(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.JOINED_COLLECTION, collection, this.factory.sandraManager);
    }
}
exports.JetskiAddressEntity = JetskiAddressEntity;
//# sourceMappingURL=JetskiAddressEntity.js.map