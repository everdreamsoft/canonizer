import {EntityFactory} from "../../../EntityFactory.js";
import {SandraManager} from "../../../SandraManager.js";
import {JetskiProcessEntity, JetskiProcessInterface} from "./JetskiProcessEntity";


export class JetskiProcessEntityFactory extends EntityFactory {

    static readonly is_a = 'jwiProcess';
    static readonly contained_in_file = 'jwiProcessFile';

    static readonly ID = 'jwiId';
    static readonly PROCESS_ID = 'processID';
    static readonly PROCESS_TITLE = 'processTitle';
    static readonly PROCESS_DESCRIPTION = 'processDescription';
    static readonly APP_NAME = 'appName';
    static readonly STATUS = 'status';

    static readonly LAST_START_TIME = 'lastStartTime';
    static readonly LAST_STOP_TIME = 'lastStopTime';

    // Joined Entities
    static readonly JOINED_ADDRESS = 'joinedAddress';

    // Brother Entities
    static readonly ON_BLOCKCHAIN = 'onBlockchain';

    // TODO - This is not used for now (brother entity issue)
    static readonly HAS_STATUS = 'hasStatus';

    public constructor(sandra: SandraManager) {
        super(JetskiProcessEntityFactory.is_a, JetskiProcessEntityFactory.contained_in_file, sandra,sandra.get(JetskiProcessEntityFactory.ID));
    }

    public getOrCreateJetskiProcess(jetskiProcessData: JetskiProcessInterface): JetskiProcessEntity {

        let jetskiProcessObj = this.getEntitiesWithRefValue(JetskiProcessEntityFactory.ID, jetskiProcessData.id)

        if (!(jetskiProcessObj instanceof JetskiProcessEntity)) jetskiProcessObj = new JetskiProcessEntity(this, this.sandraManager, jetskiProcessData)

        return jetskiProcessObj;

    }

    public getJetskiProcess(id: string, sandra: SandraManager): JetskiProcessEntity {
        return this.getEntitiesWithRefValue(JetskiProcessEntityFactory.ID, id)
    }

}
