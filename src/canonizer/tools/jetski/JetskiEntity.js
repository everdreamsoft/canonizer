"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiEntity = void 0;
const Entity_js_1 = require("../../../Entity.js");
const JetskiEntityFactory_js_1 = require("./JetskiEntityFactory.js");
const Reference_1 = require("../../../Reference");
class JetskiEntity extends Entity_js_1.Entity {
    constructor(factory, sandra, name) {
        super(factory);
        this.addReference(new Reference_1.Reference(sandra.get(JetskiEntityFactory_js_1.JetskiEntityFactory.JETSKI_INSTANCE), JetskiEntityFactory_js_1.JetskiEntityFactory.LATEST_JETSKI + name));
        // this.createOrUpdateRef(JetskiEntityFactory.JETSKI_INSTANCE,name);
    }
    setLatestBlock(block) {
        this.createOrUpdateRef(JetskiEntityFactory_js_1.JetskiEntityFactory.LATEST_BLOCK, block.getBlockId());
    }
}
exports.JetskiEntity = JetskiEntity;
//# sourceMappingURL=JetskiEntity.js.map