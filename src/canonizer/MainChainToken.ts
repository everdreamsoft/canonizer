import {BlockchainContract} from "./BlockchainContract";
import {BlockchainContractFactory} from "./BlockchainContractFactory";
import {SandraManager} from "../SandraManager";
import {ContractStandard} from "./ContractStandard";


export class MainChainToken extends BlockchainContract
{

    public constructor(factory: BlockchainContractFactory, id: string, sandra: SandraManager, standard: ContractStandard|null) {
        super(factory, id, sandra, standard);
    }

}