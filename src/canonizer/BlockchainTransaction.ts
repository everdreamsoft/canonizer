import {Entity} from "../Entity.js";
import {SandraManager} from "../SandraManager.js";
import {Reference} from "../Reference.js";
import {BlockchainTransactionFactory} from "./BlockchainTransactionFactory";
import {Blockchain} from "./Blockchain";
import {BlockchainBlock} from "./BlockchainBlock";
import {BlockchainEvent} from "./BlockchainEvent";

export class BlockchainTransaction extends Entity {

    public static ON_BLOCKCHAIN = 'onBlockchain';

    // refs
    public static TX_ID = 'txHash';
    public static EVENT_BLOCK_TIME = 'timestamp';

    // joined
    public static EVENT_BLOCK = 'onBlock';
    public static JOINED_EVENT = 'joinedEvent';

    constructor(factory: BlockchainTransactionFactory,
                txId: string,
                timestamp: string,
                blockId: number,
                blockchainEvents: BlockchainEvent[],
                blockchain: Blockchain,
                sandra: SandraManager,
    ) {

        super(factory);

        this.addReference(new Reference(sandra.get(BlockchainTransaction.TX_ID), txId));
        this.addReference(new Reference(sandra.get(BlockchainTransaction.EVENT_BLOCK_TIME), timestamp));

        let blockchainBlock = new BlockchainBlock(blockchain.blockFactory, blockId, timestamp, sandra);
        this.joinEntity(BlockchainTransaction.EVENT_BLOCK, blockchainBlock, sandra)

        blockchainEvents.forEach(event => {
            this.joinEntity(BlockchainTransaction.JOINED_EVENT, event, sandra)
        });

        this.setTriplet(BlockchainTransaction.ON_BLOCKCHAIN, blockchain.name, sandra);

    }


}