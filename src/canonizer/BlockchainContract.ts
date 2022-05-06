import {Entity} from "../Entity.js";
import {SandraManager} from "../SandraManager.js";
import {Reference} from "../Reference.js";
import {BlockchainContractFactory} from "./BlockchainContractFactory.js";
import {ContractStandard} from "./ContractStandard.js";
import {AssetCollection} from "./AssetCollection.js";

export class BlockchainContract extends Entity {

    public constructor(factory: BlockchainContractFactory | null, id: string, sandraManager: SandraManager, standard: ContractStandard | null = null) {
        if (factory == null) factory = new BlockchainContractFactory(sandraManager);
        super(factory, [new Reference(sandraManager.get(BlockchainContractFactory.ID), id)]);
        if (standard) {
            this.joinEntity(BlockchainContractFactory.CONTRACT_STANDARD, standard, sandraManager);
        }
    }

    public bindToCollection(collection: AssetCollection): this {
        this.joinEntity(BlockchainContractFactory.JOIN_COLLECTION, collection, this.factory.sandraManager)
        return this;
    }

    public setStandard(standard: ContractStandard): this {
        this.joinEntity(BlockchainContractFactory.CONTRACT_STANDARD, standard, this.factory.sandraManager)
        return this;
    }

    public setBlockchain(name: string): this {
        this.setTriplet(BlockchainContractFactory.ON_BLOCKCHAIN_VERB, name, this.factory.sandraManager)
        return this;
    }

    public getStandard() {
        return this.getJoinedEntitiesOnVerb(BlockchainContractFactory.CONTRACT_STANDARD);
    }

}
