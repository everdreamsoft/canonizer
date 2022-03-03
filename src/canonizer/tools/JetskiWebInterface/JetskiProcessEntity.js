"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiProcessEntity = void 0;
const Entity_js_1 = require("../../../Entity.js");
const Reference_1 = require("../../../Reference");
const JetskiProcessEntityFactory_1 = require("./JetskiProcessEntityFactory");
class JetskiProcessEntity extends Entity_js_1.Entity {
    constructor(factory, sandra, jetskiProcessData) {
        super(factory, [new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.ID), jetskiProcessData.id)]);
        this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.PROCESS_ID), jetskiProcessData.processID));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.PROCESS_TITLE), jetskiProcessData.processTitle));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.LAST_START_TIME), jetskiProcessData.lastStartTime));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.PROCESS_DESCRIPTION), jetskiProcessData.processDescription));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.JETSKI_NAME), jetskiProcessData.jetskiName));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.LAST_STOP_TIME), jetskiProcessData.lastStopTime));
        this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.JETSKI_PATH), jetskiProcessData.jetskiPath));
        //this.jetskiAddressFactory = new JetskiAddressEntityFactory(sandra);
    }
    getAddressFactory() {
        return this.jetskiAddressFactory;
    }
    bindJetskiAddress(addressEntity) {
        this.joinEntity(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.JOINED_ADDRESS, addressEntity, this.factory.sandraManager);
    }
    setBlockchain(blockchain) {
        this.setTriplet(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.ON_BLOCKCHAIN, blockchain.name, this.factory.sandraManager);
    }
    setStatus(status) {
        this.setTriplet(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.HAS_STATUS, status, this.factory.sandraManager);
    }
}
exports.JetskiProcessEntity = JetskiProcessEntity;
//# sourceMappingURL=JetskiProcessEntity.js.map