"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiProcessEntityFactory = void 0;
const EntityFactory_js_1 = require("../../../EntityFactory.js");
const JetskiProcessEntity_1 = require("./JetskiProcessEntity");
class JetskiProcessEntityFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super(JetskiProcessEntityFactory.is_a, JetskiProcessEntityFactory.contained_in_file, sandra);
        this.updateOnExistingRef = sandra.get(JetskiProcessEntityFactory.ID);
    }
    getOrCreateJetskiProcess(jetskiProcessData, sandra) {
        let jetskiProcessObj = this.getEntitiesWithRefValue(JetskiProcessEntityFactory.ID, jetskiProcessData.id);
        if (!(jetskiProcessObj instanceof JetskiProcessEntity_1.JetskiProcessEntity))
            jetskiProcessObj = new JetskiProcessEntity_1.JetskiProcessEntity(this, sandra, jetskiProcessData);
        return jetskiProcessObj;
    }
    getJetskiProcess(id, sandra) {
        return this.getEntitiesWithRefValue(JetskiProcessEntityFactory.ID, id);
    }
}
exports.JetskiProcessEntityFactory = JetskiProcessEntityFactory;
JetskiProcessEntityFactory.is_a = 'jetskiProcess';
JetskiProcessEntityFactory.contained_in_file = 'jetskiProcessFile';
JetskiProcessEntityFactory.ID = 'ID';
JetskiProcessEntityFactory.PROCESS_ID = 'processID';
JetskiProcessEntityFactory.PROCESS_TITLE = 'processTitle';
JetskiProcessEntityFactory.PROCESS_DESCRIPTION = 'processDescription';
JetskiProcessEntityFactory.JETSKI_NAME = 'jetskiName';
JetskiProcessEntityFactory.JETSKI_PATH = 'jetskiPath';
JetskiProcessEntityFactory.LAST_START_TIME = 'lastStartTime';
JetskiProcessEntityFactory.LAST_STOP_TIME = 'lastStopTime';
// Joined Entities
JetskiProcessEntityFactory.JOINED_ADDRESS = 'joinedAddress';
// Brother Entities
JetskiProcessEntityFactory.ON_BLOCKCHAIN = 'onBlockchain';
JetskiProcessEntityFactory.HAS_STATUS = 'hasStatus';
//# sourceMappingURL=JetskiProcessEntityFactory.js.map