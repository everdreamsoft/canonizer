"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiProcessEntityFactory = void 0;
const EntityFactory_js_1 = require("../../../EntityFactory.js");
const JetskiProcessEntity_1 = require("./JetskiProcessEntity");
class JetskiProcessEntityFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super(JetskiProcessEntityFactory.is_a, JetskiProcessEntityFactory.contained_in_file, sandra, sandra.get(JetskiProcessEntityFactory.ID));
    }
    getOrCreateJetskiProcess(jetskiProcessData) {
        let jetskiProcessObj = this.getEntitiesWithRefValue(JetskiProcessEntityFactory.ID, jetskiProcessData.id);
        if (!(jetskiProcessObj instanceof JetskiProcessEntity_1.JetskiProcessEntity))
            jetskiProcessObj = new JetskiProcessEntity_1.JetskiProcessEntity(this, this.sandraManager, jetskiProcessData);
        return jetskiProcessObj;
    }
    getJetskiProcess(id, sandra) {
        return this.getEntitiesWithRefValue(JetskiProcessEntityFactory.ID, id);
    }
}
exports.JetskiProcessEntityFactory = JetskiProcessEntityFactory;
JetskiProcessEntityFactory.is_a = 'jwiProcess';
JetskiProcessEntityFactory.contained_in_file = 'jwiProcessFile';
JetskiProcessEntityFactory.ID = 'jwiId';
JetskiProcessEntityFactory.PROCESS_ID = 'processID';
JetskiProcessEntityFactory.PROCESS_TITLE = 'processTitle';
JetskiProcessEntityFactory.PROCESS_DESCRIPTION = 'processDescription';
JetskiProcessEntityFactory.APP_NAME = 'appName';
JetskiProcessEntityFactory.STATUS = 'status';
JetskiProcessEntityFactory.LAST_START_TIME = 'lastStartTime';
JetskiProcessEntityFactory.LAST_STOP_TIME = 'lastStopTime';
// Joined Entities
JetskiProcessEntityFactory.JOINED_ADDRESS = 'joinedAddress';
// Brother Entities
JetskiProcessEntityFactory.ON_BLOCKCHAIN = 'onBlockchain';
// TODO - This is not used for now (brother entity issue)
JetskiProcessEntityFactory.HAS_STATUS = 'hasStatus';
//# sourceMappingURL=JetskiProcessEntityFactory.js.map