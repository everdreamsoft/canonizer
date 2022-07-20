"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const CanonManager_1 = require("./CanonManager");
const BlockchainEventFactory_1 = require("../src/canonizer/BlockchainEventFactory");
const Entity_1 = require("../src/Entity");
const Reference_1 = require("../src/Reference");
const BlockchainEvent_1 = require("../src/canonizer/BlockchainEvent");
const Blockchain_1 = require("../src/canonizer/Blockchain");
const ERC721ContractStandard_1 = require("../src/canonizer/Contracts/ERC721ContractStandard");
const CSCanonizeManager_1 = require("../src/canonizer/CSCanonizeManager");
const BalanceFactory_1 = require("../src/canonizer/BalanceFactory");
const BalanceEntity_1 = require("../src/canonizer/BalanceEntity");
class Event {
    constructor() {
    }
    static async test() {
        await Event.testEventUpdate();
    }
    static async updateCollectionUniqueKey() {
    }
    static async updateAssets() {
    }
    static async addEvents(events) {
        let contractAddress = "";
        let canonizeManager = CanonManager_1.CanonManager.getInstance().getCSCanonizeManager();
        let contractStandard = new ERC721ContractStandard_1.ERC721ContractStandard(canonizeManager);
        let blockchain = canonizeManager.getOrInitBlockchain(CSCanonizeManager_1.CompatibleBlockchains.ethereum);
        let contract = blockchain.contractFactory.getOrCreate(contractAddress);
        contract.setStandard(contractStandard);
        contract.setBlockchain(blockchain.getName());
        let addressFactory = blockchain.addressFactory;
        let balanceFactory = new BalanceFactory_1.BalanceFactory(canonizeManager.getSandra(), true);
        for (let index = 0; index < events.length; index++) {
            let event = events[index];
            let transfers = event.transfers;
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
                specifierArray = contractStandard.getSpecifierArray();
                // Generating token path
                let token = contractStandard.generateTokenPathEntity(canonizeManager);
                new BlockchainEvent_1.BlockchainEvent(blockchain.eventFactory, transfers.from, // Source Address
                transfers.to, // Destination Address
                contract, event.transactionHash, "1", // Timestamp - Set to 1 as default, has to be updated later in db with separate logic
                transfers.values[tokenIndex], blockchain, event.blockNumber, contractStandard, canonizeManager.getSandra(), "pending");
                new BalanceEntity_1.BalanceEntity(balanceFactory, {
                    quantity: transfers.balanceOfFrom[tokenIndex],
                    specifierArray: specifierArray,
                    contract: contract,
                    address: addressFactory.getOrCreate(transfers.from)
                });
                new BalanceEntity_1.BalanceEntity(balanceFactory, {
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
    static async testEventUpdate() {
        let canonizeManager = CanonManager_1.CanonManager.getInstance().getCSCanonizeManager();
        let factory = new BlockchainEventFactory_1.BlockchainEventFactory(new Blockchain_1.Blockchain(canonizeManager.getSandra()), canonizeManager.getSandra());
        let entity = new Entity_1.Entity(factory, [new Reference_1.Reference(canonizeManager.getSandra().get(Blockchain_1.Blockchain.TXID_CONCEPT_NAME), "0xdf32963d15d0ca29afd1bc31514932510e9bba7c3cb6840010b4f1a24edae1db")]);
        entity.setTriplet(BlockchainEvent_1.BlockchainEvent.ASSET_STATUS, "completed", canonizeManager.getSandra());
        await canonizeManager.gossip(factory);
    }
    static getTestEvents() {
    }
}
exports.Event = Event;
//# sourceMappingURL=Event.js.map