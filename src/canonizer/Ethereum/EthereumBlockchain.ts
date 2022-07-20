import {Blockchain} from "../Blockchain.js";
import {SandraManager} from "../../SandraManager.js";


export class EthereumBlockchain extends Blockchain {

    public constructor(sandra: SandraManager) {

        super(sandra, 'ethereum');
        this.addressFactory.is_a = 'ethAddress';
        this.addressFactory.contained_in_file = 'blockchainAddressFile';
        this.addressFactory.onBlockchain = this.name;

        this.contractFactory.is_a = 'ethContract';
        this.contractFactory.contained_in_file = 'blockchainContractFile';

    }


}
