import {EntityFactory} from "../../../EntityFactory.js";
import {SandraManager} from "../../../SandraManager.js";
import {JetskiProcessEntity, JetskiProcessInterface} from "./JetskiProcessEntity";


export class JetskiProcessEntityFactory extends EntityFactory {

    static readonly is_a = 'jetskiProcess';
    static readonly contained_in_file = 'jetskiProcessFile';

    static readonly PROCESS_ID = 'processID';
    static readonly PROCESS_TITLE = 'processTitle';

    static readonly LAST_START_TIME = 'lastStartTime';

    // Joined Entities
    static readonly JOINED_ADDRESS = 'joinedAddress';

    // Brother Entities
    static readonly ON_BLOCKCHAIN = 'onBlockchain';
    static readonly HAS_STATUS = 'hasStatus';

    public constructor(sandra: SandraManager) {
        super(JetskiProcessEntityFactory.is_a, JetskiProcessEntityFactory.contained_in_file, sandra);
        this.updateOnExistingRef = sandra.get(JetskiProcessEntityFactory.PROCESS_ID);
    }

    public getOrCreateJetskiProcess(jetskiProcessData: JetskiProcessInterface, sandra: SandraManager): JetskiProcessEntity {

        let jetskiProcessObj = this.getEntitiesWithRefValue(JetskiProcessEntityFactory.PROCESS_ID, jetskiProcessData.processID)

        if (!(jetskiProcessObj instanceof JetskiProcessEntity)) jetskiProcessObj = new JetskiProcessEntity(this, sandra, jetskiProcessData)

        return jetskiProcessObj;

    }


}
