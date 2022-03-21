import {Blockchain} from "../Blockchain.js";
import {SandraManager} from "../../SandraManager.js";
import {EntityFactory} from "../../EntityFactory.js";
import {BlockchainBlock} from "../BlockchainBlock.js";


export class KusamaBlockchain extends Blockchain
{

    public constructor(sandra: SandraManager) {

        super(sandra,'kusama');

        this.addressFactory.is_a = 'kusamaAddress';
        this.addressFactory.contained_in_file = 'blockchainAddressFile';
        this.addressFactory.onBlockchain = this.name ;

        this.contractFactory.is_a = 'rmrkContract';
        this.contractFactory.contained_in_file = 'blockchainContractFile';

    }

}
