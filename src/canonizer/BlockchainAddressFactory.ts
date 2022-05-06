import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainAddress} from "./BlockchainAddress.js";

export class BlockchainAddressFactory extends EntityFactory {

    public is_a: string = 'blockchainAddress';
    public contained_in_file: string = 'blockchainAddressFile';
    public onBlockchain: string = 'genericBlockchain';

    private sandra: SandraManager;

    static ON_BLOCKCHAIN = 'onBlockchain'
    static ID = "address";

    public constructor(sandra: SandraManager) {
        super('blockchainAddress', 'blockchainAddressFile', sandra, sandra.get(BlockchainAddressFactory.ID));
        this.sandra = sandra;
    }

    public getOrCreate(address: string): BlockchainAddress {
        const addresses: BlockchainAddress[] = this.getEntitiesWithRefValue(this.sandraManager.get(BlockchainAddressFactory.ID), address);
        return addresses && addresses?.length > 0 ? addresses[0] : new BlockchainAddress(this, address, this.sandraManager) as BlockchainAddress;
    }

}
