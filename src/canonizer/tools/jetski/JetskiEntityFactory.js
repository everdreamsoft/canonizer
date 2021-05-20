"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiEntityFactory = void 0;
const EntityFactory_js_1 = require("../../../EntityFactory.js");
const JetskiEntity_js_1 = require("./JetskiEntity.js");
class JetskiEntityFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super('jetskiRun', 'jetskiRunFile', sandra);
    }
    getOrCreateJetskiInstance(name, block, instance) {
        let jetski = this.getEntitiesWithRefValue(JetskiEntityFactory.JETSKI_INSTANCE, JetskiEntityFactory.LATEST_JETSKI + name);
        if (!(jetski instanceof JetskiEntity_js_1.JetskiEntity))
            jetski = new JetskiEntity_js_1.JetskiEntity(this, name);
        if (jetski) {
            jetski.createOrUpdateRef(JetskiEntityFactory.LATEST_BLOCK, block.getBlockId());
            jetski.createOrUpdateRef(JetskiEntityFactory.INSTANCE_CODE, instance);
        }
        return jetski;
    }
}
exports.JetskiEntityFactory = JetskiEntityFactory;
JetskiEntityFactory.LATEST_JETSKI = 'latest_'; //append blockchain name
JetskiEntityFactory.JETSKI_INSTANCE = 'instanceName';
JetskiEntityFactory.LATEST_BLOCK = 'latestBlock';
JetskiEntityFactory.INSTANCE_CODE = "instanceCode";
//# sourceMappingURL=JetskiEntityFactory.js.map