import {MainChainToken} from "../MainChainToken";
import {SandraManager} from "../../SandraManager";
import {BlockchainContractFactory} from "../BlockchainContractFactory";


export class KusamaCryptoContract extends MainChainToken
{

    public constructor(factory: BlockchainContractFactory, sandra: SandraManager) {
        super(factory, "KSM", sandra, null);
    }

}