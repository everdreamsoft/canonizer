import {EntityFactory} from "../../../EntityFactory.js";
import {SandraManager} from "../../../SandraManager.js";
import {JetskiProcessEntity} from "./JetskiProcessEntity";
import {JetskiAddressEntity, JetskiAddressInterface} from "./JetskiAddressEntity";

export class JetskiAddressEntityFactory extends EntityFactory {

    static readonly is_a = 'jwiAddress';
    static readonly contained_in_file = 'jwiAddressFile';

    static readonly HASH = 'jwiTxHash';
    static readonly STATUS = 'status';
    static readonly LAST_BLOCK_SAVED = 'lastBlockSaved';
    static readonly LAST_BLOCK_PROCESSED = 'lastBlockProcessed';
    static readonly LAST_UPDATE_TIME = 'lastUpdateTime';
    static readonly START_BLOCK = 'startBlock';
    static readonly END_BLOCK = 'endBlock';
    static readonly STANDARD = 'standard';
    static readonly BLOCK_RANGE = 'blockRange';

    static readonly JOINED_COLLECTION = 'joinedCollection';


    public constructor(sandra: SandraManager) {
        super(JetskiAddressEntityFactory.is_a, JetskiAddressEntityFactory.contained_in_file, sandra, sandra.get(JetskiAddressEntityFactory.HASH));
    }

    public getOrCreateJetskiAddress(jetskiAddressData: JetskiAddressInterface, sandra: SandraManager): JetskiAddressEntity {

        let jetskiAddressObj = this.getEntitiesWithRefValue(JetskiAddressEntityFactory.HASH, jetskiAddressData.hash)

        if (!(jetskiAddressObj instanceof JetskiProcessEntity)) jetskiAddressObj = new JetskiAddressEntity(this, sandra, jetskiAddressData)

        return jetskiAddressObj;

    }


}
