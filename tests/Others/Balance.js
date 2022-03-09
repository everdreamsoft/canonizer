"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CSCanonizeManager_js_1 = require("../../src/canonizer/CSCanonizeManager.js");
const BalanceEntity_1 = require("../../src/canonizer/BalanceEntity");
const BalanceFactory_1 = require("../../src/canonizer/BalanceFactory");
const ERC1155ContractStandard_1 = require("../../src/canonizer/Contracts/ERC1155ContractStandard");
const EntityFactory_1 = require("../../src/EntityFactory");
const TestEntity_1 = require("./TestEntity");
const ERC721ContractStandard_1 = require("../../src/canonizer/Contracts/ERC721ContractStandard");
const BlockchainContractFactory_1 = require("../../src/canonizer/BlockchainContractFactory");
const BlockchainEvent_1 = require("../../src/canonizer/BlockchainEvent");
// const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnYiOiJmb25kdWUiLCJmbHVzaCI6dHJ1ZSwiZXhwIjoxMDYxMTY0NzQ0OTIwMDAwfQ.TX0Xcy7OeHv6oE3iTxKe-TNbMaIefjViCUGvqpFAG3Q';
// const gossipUrl = "http://debug.everdreamsoft.com/fondue/alex/gossip"
const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnYiOiJic2MiLCJmbHVzaCI6dHJ1ZSwiZXhwIjoxMDYwODE2MjQyMDk2MDAwfQ.X0MLqtaUtCrgfN_sWO0IhybOtftWE4Lltex2Hh0k0u4';
const gossipUrl = "http://localhost:8000/alex/gossip";
const canonizeManager = new CSCanonizeManager_js_1.CSCanonizeManager({ connector: { gossipUrl: gossipUrl, jwt: jwt } });
const sandra = canonizeManager.getSandra();
let binance = canonizeManager.getOrInitBlockchain(CSCanonizeManager_js_1.CompatibleBlockchains.binance);
let ethereum = canonizeManager.getOrInitBlockchain(CSCanonizeManager_js_1.CompatibleBlockchains.ethereum);
let res = bootstrap();
async function bootstrap() {
    await flushDatagraph();
    await addBalance();
}
async function addTestEntity() {
    let sandra = canonizeManager.getSandra();
    let is_a = "testEntity";
    let containedIn = "testFile";
    let idConcept = sandra.get("id");
    // Factory rule on first name
    let entityFactory = new EntityFactory_1.EntityFactory(is_a, containedIn, sandra, idConcept);
    let testEntity = new TestEntity_1.TestEntity(entityFactory, { id: "1", data: "DATA1" });
    let testEntity2 = new TestEntity_1.TestEntity(entityFactory, { id: "1", data: "DATA2" });
    console.log(entityFactory.entityArray.length);
}
async function bootstrapEventsBinance() {
    console.log("Creating binance events..");
    let erc721ContractStandard = new ERC721ContractStandard_1.ERC721ContractStandard(canonizeManager);
    let binanceContract = binance.contractFactory.getOrCreate('241B8516516F381A-BINANCE');
    binanceContract.setStandard(erc721ContractStandard);
    binanceContract.joinEntity(BlockchainContractFactory_1.BlockchainContractFactory.CONTRACT_STANDARD, erc721ContractStandard, canonizeManager.getSandra());
    erc721ContractStandard.setTokenId("token11");
    let tokenPath = erc721ContractStandard.generateTokenPathEntity(canonizeManager);
    let collection = canonizeManager.createCollection({
        id: "sdsadas",
        description: "sadasd",
        name: "ChainBabe2",
        imageUrl: "static/media/tookan.5e32429d.png"
    }, canonizeManager.getLocalSolver());
    binanceContract.bindToCollection(collection);
    let asset = canonizeManager.createAsset({
        imageUrl: "https://media.npr.org/assets/img/2021/03/05/nyancat-still-6cda3c8e01b3b5db14f6db31ce262161985fb564-s1200-c85.webp",
        name: "CATZY",
        description: "Test asset ",
        assetId: "CATZY",
        emote: "sadsa",
        metadataUrl: "http://metadata"
    });
    asset.bindCollection(collection);
    asset.bindContract(binanceContract);
    tokenPath.bindToAssetWithContract(binanceContract, asset);
    let event = new BlockchainEvent_1.BlockchainEvent(binance.eventFactory, 'address1', 'addressDest1', binanceContract, 'txId1111', 'time11', "qty1", binance, 123456789, erc721ContractStandard, canonizeManager.getSandra());
    let response1 = await canonizeManager.gossipOrbsBindings();
    console.log(response1);
    let response = await canonizeManager.gossipBlockchainEvents(binance);
    console.log(response);
    return;
}
async function addBalance() {
    try {
        let contractString = '0x728cB1069397Ca3E2c268946eED59200Aa0D494A'.toLowerCase();
        let binanceContract = binance.contractFactory.getOrCreate(contractString);
        let erc1155ContractStandard = new ERC1155ContractStandard_1.ERC1155ContractStandard(canonizeManager);
        erc1155ContractStandard.setTokenId("69");
        binanceContract.setStandard(erc1155ContractStandard);
        binanceContract.setBlockchain(binance.getName());
        erc1155ContractStandard.setTokenId("69");
        let token = erc1155ContractStandard.generateTokenPathEntity(canonizeManager);
        erc1155ContractStandard.setTokenId("69");
        let addressFactory = binance.addressFactory;
        let balanceFact = new BalanceFactory_1.BalanceFactory(sandra);
        let addressString = '0x7127F8d90DFAE48b2209F6C98bF51a96591F23f9'.toLowerCase();
        let address1 = addressFactory.getOrCreate(addressString);
        new BalanceEntity_1.BalanceEntity(balanceFact, {
            quantity: "1",
            specifierArray: erc1155ContractStandard.getSpecifierArray(),
            contract: binanceContract,
            address: address1
        });
        // let address2 = addressFactory.getOrCreate("0x31232312312312312313232");
        // erc721ContractStandard.setTokenId("8888888");
        //  new BalanceEntity(balanceFact, {
        //     quantity: "5",
        //     specifierArray: erc721ContractStandard.getSpecifierArray(),
        //     contract: binanceContract,
        //     address: address2
        // });
        let res = await canonizeManager.gossipBalance(balanceFact);
        console.log(res);
    }
    catch (e) {
        console.log(e);
    }
}
async function flushDatagraph() {
    let flushing = await canonizeManager.flushWithBlockchainSupport([binance]).then(r => {
        console.log("flushed and added blockchain support");
        console.log(JSON.parse(r));
        return r;
    }).catch(err => {
        console.log(err);
    });
}
//# sourceMappingURL=Balance.js.map