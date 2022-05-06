import {Entity} from "../Entity.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainAddressFactory} from "./BlockchainAddressFactory.js";
import {Reference} from "../Reference.js";

export class BlockchainAddress extends Entity {

    public constructor(factory: BlockchainAddressFactory | null, address: string, sandraManager: SandraManager) {
        if (factory == null) factory = new BlockchainAddressFactory(sandraManager);
        super(factory, [new Reference(sandraManager.get(BlockchainAddressFactory.ID), address)]);
        this.setTriplet(BlockchainAddressFactory.ON_BLOCKCHAIN, factory.onBlockchain, sandraManager);
    }

    public getAddress(): string {
        return this.getRefValue(BlockchainAddressFactory.ID) ? this.getRefValue(BlockchainAddressFactory.ID) : '';
    }

}
