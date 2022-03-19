import {Blockchain} from "../Blockchain.js";
import {SandraManager} from "../../SandraManager.js";

export class BinanceBlockchain extends Blockchain {

    public constructor(sandra: SandraManager) {

        super(sandra, "binance");

        this.addressFactory.is_a = 'bscAddress';
        this.addressFactory.contained_in_file = 'blockchainAddressFile';
        this.addressFactory.onBlockchain = this.name;

        this.contractFactory.is_a = 'bscContract';
        this.contractFactory.contained_in_file = 'blockchainContractFile';

    }

}
