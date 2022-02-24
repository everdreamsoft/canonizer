"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiAddressEntityFactory = void 0;
const EntityFactory_js_1 = require("../../../EntityFactory.js");
const JetskiProcessEntity_1 = require("./JetskiProcessEntity");
const JetskiAddressEntity_1 = require("./JetskiAddressEntity");
class JetskiAddressEntityFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super(JetskiAddressEntityFactory.is_a, JetskiAddressEntityFactory.contained_in_file, sandra);
        this.updateOnExistingRef = sandra.get(JetskiAddressEntityFactory.HASH);
    }
    getOrCreateJetskiAddress(jetskiAddressData, sandra) {
        let jetskiAddressObj = this.getEntitiesWithRefValue(JetskiAddressEntityFactory.HASH, jetskiAddressData.hash);
        if (!(jetskiAddressObj instanceof JetskiProcessEntity_1.JetskiProcessEntity))
            jetskiAddressObj = new JetskiAddressEntity_1.JetskiAddressEntity(this, sandra, jetskiAddressData);
        return jetskiAddressObj;
    }
}
exports.JetskiAddressEntityFactory = JetskiAddressEntityFactory;
JetskiAddressEntityFactory.is_a = 'jetskiAddress';
JetskiAddressEntityFactory.contained_in_file = 'jetskiAddressFile';
JetskiAddressEntityFactory.HASH = 'hash';
JetskiAddressEntityFactory.STATUS = 'status';
JetskiAddressEntityFactory.LAST_BLOCK_SAVED = 'lastBlockSaved';
JetskiAddressEntityFactory.LAST_BLOCK_PROCESSED = 'lastBlockProcessed';
JetskiAddressEntityFactory.LAST_UPDATE_TIME = 'lastUpdateTime';
JetskiAddressEntityFactory.START_BLOCK = 'startBlock';
JetskiAddressEntityFactory.END_BLOCK = 'endBlock';
JetskiAddressEntityFactory.STANDARD = 'standard';
JetskiAddressEntityFactory.BLOCK_RANGE = 'blockRange';
JetskiAddressEntityFactory.JOINED_COLLECTION = 'joinedCollection';
//# sourceMappingURL=JetskiAddressEntityFactory.js.map