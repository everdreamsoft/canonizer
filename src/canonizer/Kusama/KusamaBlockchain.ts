import {Blockchain} from "../Blockchain.js";
import {SandraManager} from "../../SandraManager.js";
import {EntityFactory} from "../../EntityFactory.js";
import {BlockchainBlock} from "../BlockchainBlock.js";
import {BlockchainBlockFactory} from "../BlockchainBlockFactory";


export class KusamaBlockchain extends Blockchain
{

    public  name: string = 'kusama';


    public constructor(sandra: SandraManager) {

        super(sandra);

        this.addressFactory.is_a = 'kusamaAddress';
        this.addressFactory.contained_in_file = 'blockchainAddressFile';
        this.addressFactory.onBlockchain = this.name ;

        this.contractFactory.is_a = 'rmrkContract';
        this.contractFactory.contained_in_file = 'blockchainContractFile';

        this.blockFactory = new BlockchainBlockFactory(sandra);
        //new EntityFactory(this.getName()+"Block","blockchainBlocFile",sandra,sandra.get(BlockchainBlock.INDEX_SHORTNAME));




    }

}
