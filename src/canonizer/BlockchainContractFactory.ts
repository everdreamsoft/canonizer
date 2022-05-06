import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainContract} from "./BlockchainContract.js";

export class BlockchainContractFactory extends EntityFactory {

    public contained_in_file: string = 'blockchainContractFile';

    public static ID = 'id';
    public static JOIN_COLLECTION = 'inCollection';
    public static EXPLICIT_TOKEN_LISTING_SHORTNAME = 'explicitListing';
    public static CONTRACT_STANDARD = 'contractStandard';
    public  static ON_BLOCKCHAIN_VERB = 'onBlockchain';

    public constructor(sandra: SandraManager) {
        super('blockchainContract', 'blockchainContractFile', sandra, sandra.get(BlockchainContractFactory.ID));
    }

    public getOrCreate(id: string): BlockchainContract {
        const contracts: BlockchainContract[] = this.getEntitiesWithRefValue(this.sandraManager.get(BlockchainContractFactory.ID), id);
        return contracts && contracts?.length > 0 ? contracts[0] : new BlockchainContract(this, id, this.sandraManager);
    }

}
