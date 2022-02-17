"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiAddressEntity = void 0;
const Entity_js_1 = require("../../../Entity.js");
const Reference_1 = require("../../../Reference");
const JetskiAddressEntityFactory_1 = require("./JetskiAddressEntityFactory");
class JetskiAddressEntity extends Entity_js_1.Entity {
    constructor(factory, sandra, jetskiAddressData) {
        super(factory);
        this.sandra = sandra;
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.HASH), jetskiAddressData.hash));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.STATUS), jetskiAddressData.status));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.LAST_BLOCK_PROCESSED), jetskiAddressData.lastBlockProcessed));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.LAST_BLOCK_SAVED), jetskiAddressData.lastBlockSaved));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.LAST_UPDATE_TIME), jetskiAddressData.lastUpdateTime));
    }
    bindJetskiCollection(collection) {
        this.joinEntity(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.JOINED_COLLECTION, collection, this.sandra);
    }
}
exports.JetskiAddressEntity = JetskiAddressEntity;
//# sourceMappingURL=JetskiAddressEntity.js.map