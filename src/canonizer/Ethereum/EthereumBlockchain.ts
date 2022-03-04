import {Blockchain} from "../Blockchain.js";
import {SandraManager} from "../../SandraManager.js";
import {EntityFactory} from "../../EntityFactory";
import {BlockchainBlock} from "../BlockchainBlock";


export class EthereumBlockchain extends Blockchain {

    public  name: string = 'ethereum';

    public constructor(sandra: SandraManager) {

        super(sandra);
        this.addressFactory.is_a = 'ethAddress';
        this.addressFactory.contained_in_file = 'ethAddressFile';
        this.addressFactory.onBlockchain = this.name;

        this.contractFactory.is_a = 'ethContract';
        this.contractFactory.contained_in_file = 'ethContractFile';

        this.blockFactory = new EntityFactory(this.getName() + "Block", "blockchainBlocFile", sandra, sandra.get(BlockchainBlock.INDEX_SHORTNAME));

    }


}
