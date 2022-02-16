import {EntityFactory} from "../../../EntityFactory.js";
import {SandraManager} from "../../../SandraManager.js";
import {JetskiProcessEntity, JetskiProcessInterface} from "./JetskiProcessEntity";


export class JetskiProcessEntityFactory extends EntityFactory {

    static readonly is_a = 'jetskiProcess';
    static readonly contained_in_file = 'jetskiProcessFile';

    static readonly ID = 'ID';
    static readonly PROCESS_ID = 'processID';
    static readonly PROCESS_TITLE = 'processTitle';
    static readonly PROCESS_DESCRIPTION = 'processDescription';
    static readonly JETSKI_NAME = 'jetskiName';
    static readonly JETSKI_PATH = 'jetskiPath';

    static readonly LAST_START_TIME = 'lastStartTime';
    static readonly LAST_STOP_TIME = 'lastStopTime';

    // Joined Entities
    static readonly JOINED_ADDRESS = 'joinedAddress';

    // Brother Entities
    static readonly ON_BLOCKCHAIN = 'onBlockchain';
    static readonly HAS_STATUS = 'hasStatus';

    public constructor(sandra: SandraManager) {
        super(JetskiProcessEntityFactory.is_a, JetskiProcessEntityFactory.contained_in_file, sandra);
        this.updateOnExistingRef = sandra.get(JetskiProcessEntityFactory.ID);
    }

    public getOrCreateJetskiProcess(jetskiProcessData: JetskiProcessInterface, sandra: SandraManager): JetskiProcessEntity {

        let jetskiProcessObj = this.getEntitiesWithRefValue(JetskiProcessEntityFactory.ID, jetskiProcessData.id)

        if (!(jetskiProcessObj instanceof JetskiProcessEntity)) jetskiProcessObj = new JetskiProcessEntity(this, sandra, jetskiProcessData)

        return jetskiProcessObj;

    }


}
