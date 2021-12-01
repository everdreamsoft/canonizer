import {Blockchain} from "../Blockchain.js";
import {SandraManager} from "../../SandraManager.js";
import {EntityFactory} from "../../EntityFactory.js";
import {BlockchainBlock} from "../BlockchainBlock.js";

export class BinanceBlockchain extends Blockchain
{
    
    public  name: string = 'binance';

    public constructor(sandra: SandraManager) {

      super(sandra);

      this.addressFactory.is_a = 'bscAddress';
      this.addressFactory.contained_in_file = 'blockchainAddressFile';
      this.addressFactory.onBlockchain = this.name ;

      this.contractFactory.is_a = 'bscContract';
      this.contractFactory.contained_in_file = 'blockchainContractFile';

      this.blockFactory = new EntityFactory(this.getName()+"Block","blockchainBlocFile",sandra,sandra.get(BlockchainBlock.INDEX_SHORTNAME));

    }
    
}