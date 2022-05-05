import {BlockchainAddressFactory} from "./BlockchainAddressFactory.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainContractFactory} from "./BlockchainContractFactory.js";
import {BlockchainEventFactory} from "./BlockchainEventFactory.js";
import {BlockchainEmoteFactory} from "./BlockchainEmoteFactory";
import {BlockchainOrderFactory} from "./BlockchainOrderFactory";
import {ChangeIssuerFactory} from "./ChangeIssuerFactory";
import {BlockchainBlockFactory} from "./BlockchainBlockFactory";

export class Blockchain {

    public addressFactory: BlockchainAddressFactory
    public name: string = 'genericBlockchain';

    public static TXID_CONCEPT_NAME = 'txHash';
    public contractFactory: BlockchainContractFactory;
    public eventFactory: BlockchainEventFactory;
    public blockFactory: BlockchainBlockFactory;
    public emoteFactory: BlockchainEmoteFactory;
    public orderFactory: BlockchainOrderFactory;
    public changeIssuerFactory: ChangeIssuerFactory;

    public constructor(sandra: SandraManager, name: string = 'genericBlockchain') {

        this.name = name;
        this.addressFactory = new BlockchainAddressFactory(sandra);
        this.contractFactory = new BlockchainContractFactory(sandra);
        this.eventFactory = new BlockchainEventFactory(this, sandra);
        this.blockFactory = new BlockchainBlockFactory(sandra);//new EntityFactory(this.getName()+"Block","blockchainBlocFile",sandra,sandra.get(BlockchainBlock.INDEX_SHORTNAME));
        this.emoteFactory = new BlockchainEmoteFactory(sandra);
        this.orderFactory = new BlockchainOrderFactory(sandra);
        this.changeIssuerFactory = new ChangeIssuerFactory(sandra);
    }

    public getName() {

        return this.name;

    }


}
