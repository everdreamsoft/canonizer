import {CanonManager} from "./CanonManager";
import {BlockchainEventFactory} from "../src/canonizer/BlockchainEventFactory";
import {Entity} from "../src/Entity";
import {Reference} from "../src/Reference";
import {BlockchainEvent} from "../src/canonizer/BlockchainEvent";
import {Blockchain} from "../src/canonizer/Blockchain";
import {ERC721ContractStandard} from "../src/canonizer/Contracts/ERC721ContractStandard";
import {CompatibleBlockchains} from "../src/canonizer/CSCanonizeManager";
import {BalanceFactory} from "../src/canonizer/BalanceFactory";
import {BalanceEntity} from "../src/canonizer/BalanceEntity";
interface IBalance {
    address: string,
    token: string,
    balance: string
}

interface IEvent {
    address: string,
    standard: string,
    blockNumber: number,
    transactionHash: string,
    transactionIndex: string,
    blockHash: string,
    logIndex: number,
    removed: boolean,
    id: string,
    event: string,
    signature: string,
    returnValues:any,
    transfers: any,	// Values varies depending upon the event fired.
    parsed: boolean,
    timestamp: number,
    balances:IBalance[]
}
interface ITransfers {
    from: string,           // Source address
    to: string,             // Destination address
    ids: string[],          // Token ids
    values: string[],       // Number or value of tokens transferred for each token
    tokenUris: string[]     // Token Uri of each token in ids array
    balanceOfFrom:string[], // Balance of "from" address for each token in ids array
    balanceOfTo:string[]    // Balance of "to" address for each token in ids array
}

export class Event {

    constructor() {
    }

    public static async test() {
        await Event.testEventUpdate();
    }

    private static async updateCollectionUniqueKey() {

    }

    private static async updateAssets()
    {



    }

    private static async addEvents(events:any) {

        let contractAddress = "";
        let canonizeManager = CanonManager.getInstance().getCSCanonizeManager();

        let contractStandard = new ERC721ContractStandard(canonizeManager);
        let blockchain = canonizeManager.getOrInitBlockchain(CompatibleBlockchains.ethereum);
        let contract = blockchain.contractFactory.getOrCreate(contractAddress);

        contract.setStandard(contractStandard);
        contract.setBlockchain(blockchain.getName());

        let addressFactory = blockchain.addressFactory;
        let balanceFactory = new BalanceFactory(canonizeManager.getSandra(), true);

        for (let index = 0; index < events.length; index++) {

            let event: IEvent = events[index];
            let transfers: ITransfers = event.transfers;
            let tokenCount = transfers.ids.length;

            for (let tokenIndex = 0; tokenIndex < tokenCount; tokenIndex++) {

                let tokenId = transfers.ids[tokenIndex];

                // Removed token uri - moved to updateMetaData service
                let tokenUri = transfers.tokenUris[tokenIndex];

                let specifierArray;

                if (!transfers.values[tokenIndex]) {
                    transfers.values[tokenIndex] = "1";
                }

                if (!tokenId) {
                    continue;
                }

                (contractStandard).setTokenId(tokenId);
                specifierArray = (contractStandard as ERC721ContractStandard).getSpecifierArray();

                // Generating token path
                let token = contractStandard.generateTokenPathEntity(canonizeManager);

                new BlockchainEvent(
                    blockchain.eventFactory,
                    transfers.from, // Source Address
                    transfers.to,   // Destination Address
                    contract,
                    event.transactionHash,
                    "1",      // Timestamp - Set to 1 as default, has to be updated later in db with separate logic
                    transfers.values[tokenIndex],
                    blockchain,
                    event.blockNumber,
                    contractStandard,
                    canonizeManager.getSandra(),
                    "pending"
                );

                new BalanceEntity(balanceFactory, {
                    quantity: transfers.balanceOfFrom[tokenIndex],
                    specifierArray: specifierArray,
                    contract: contract,
                    address: addressFactory.getOrCreate(transfers.from)
                });

                new BalanceEntity(balanceFactory, {
                    quantity: transfers.balanceOfTo[tokenIndex],
                    specifierArray: specifierArray,
                    contract: contract,
                    address: addressFactory.getOrCreate(transfers.to)
                });

            }

        }

        let resEvent = await canonizeManager.gossipBlockchainEvents(blockchain);
        let resBal = await canonizeManager.gossipBalance(balanceFactory);


    }

    private static async testEventUpdate() {

        let canonizeManager = CanonManager.getInstance().getCSCanonizeManager();

        let factory = new BlockchainEventFactory(new Blockchain(canonizeManager.getSandra()), canonizeManager.getSandra());
        let entity = new Entity(factory,
            [new Reference(canonizeManager.getSandra().get(Blockchain.TXID_CONCEPT_NAME), "0xdf32963d15d0ca29afd1bc31514932510e9bba7c3cb6840010b4f1a24edae1db")])

        entity.setTriplet(BlockchainEvent.ASSET_STATUS, "completed", canonizeManager.getSandra());

        await canonizeManager.gossip(factory);


    }

    private static getTestEvents()
    {

    }

}
