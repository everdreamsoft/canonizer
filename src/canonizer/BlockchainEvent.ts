import {Entity} from "../Entity.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainEventFactory} from "./BlockchainEventFactory.js";
import {BlockchainAddress} from "./BlockchainAddress.js";
import {BlockchainContract} from "./BlockchainContract.js";
import {Reference} from "../Reference.js";
import {Blockchain} from "./Blockchain.js";
import {ContractStandard} from "./ContractStandard.js";

export class BlockchainEvent extends Entity {

    public eventType: string = 'transfer';
    public static EVENT_SOURCE_ADDRESS = 'source';
    public static EVENT_DESTINATION_VERB = 'hasSingleDestination';
    public static EVENT_SOURCE_CONTRACT = 'blockchainContract';
    public static EVENT_BLOCK_TIME = 'timestamp';
    public static QUANTITY = 'quantity';
    public static ASSET_STATUS = 'assetStatus';
    public static ON_BLOCKCHAIN = 'onBlockchain';
    public static EVENT_BLOCK = 'onBlock';
    public static BLOCKCHAIN_EVENT_TYPE_VERB = "blockchainEventType";


    constructor(factory: BlockchainEventFactory,
                source: BlockchainAddress | string,
                destination: BlockchainAddress | string,
                contract: BlockchainContract | string,
                txid: string,
                timestamp: string,
                quantity: string,
                blockchain: Blockchain,
                blockId: number,
                token: ContractStandard | null,
                sandra: SandraManager,
                status:string = "pending" // Added for change - Moving asset creation logic to UpdateMetaData service.
    ) {

        super(factory, [new Reference(sandra.get(Blockchain.TXID_CONCEPT_NAME), txid)]);

        if (typeof source == "string") {
            source = blockchain.addressFactory.getOrCreate(source)
        }
        if (typeof destination == "string") {
            destination = blockchain.addressFactory.getOrCreate(destination)
        }
        if (typeof contract == "string") {
            contract = blockchain.contractFactory.getOrCreate(contract)
        }

        this.setTriplet(BlockchainEvent.BLOCKCHAIN_EVENT_TYPE_VERB, this.eventType, sandra);


        this.addReference(new Reference(sandra.get(BlockchainEvent.EVENT_BLOCK_TIME), timestamp));
        this.addReference(new Reference(sandra.get(BlockchainEvent.QUANTITY), quantity));

        this.joinEntity(BlockchainEvent.EVENT_SOURCE_ADDRESS, source, sandra)
        this.joinEntity(BlockchainEvent.EVENT_DESTINATION_VERB, destination, sandra)

        //get or create the block
        let blockchainBlock = blockchain.blockFactory.getOrCreate(blockId, timestamp, blockchain);
        this.joinEntity(BlockchainEvent.EVENT_BLOCK, blockchainBlock, sandra)

        this.setTriplet(BlockchainEvent.ON_BLOCKCHAIN, blockchain.name, sandra);
        this.setTriplet(BlockchainEvent.ASSET_STATUS, status, sandra, [], true);

        let refArray: Reference[] = [];

        if (token) {
            //we need to get the tokenpath data and add it as reference on the event
            let specifierMap = token.getSpecifierArray()

            for (let specifier of specifierMap) {
                refArray.push(new Reference(specifier[0], specifier[1]));
            }

        }

        this.joinEntity(BlockchainEvent.EVENT_SOURCE_CONTRACT, contract, sandra, refArray)


    }


}

