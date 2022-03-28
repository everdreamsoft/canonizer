"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contracts = void 0;
const CanonManager_1 = require("./CanonManager");
const CSCanonizeManager_1 = require("../src/canonizer/CSCanonizeManager");
const ERC1155ContractStandard_1 = require("../src/canonizer/Contracts/ERC1155ContractStandard");
const ERC721ContractStandard_1 = require("../src/canonizer/Contracts/ERC721ContractStandard");
class Contracts {
    constructor() {
    }
    static async test() {
        await Contracts.testEthereum("erc721");
    }
    static async testEthereum(standard) {
        const canonizeManager = CanonManager_1.CanonManager.getInstance().getCSCanonizeManager();
        const blockchainObj = canonizeManager
            .getOrInitBlockchain(CSCanonizeManager_1.CompatibleBlockchains.ethereum);
        const collectionObj = canonizeManager.createCollection({
            id: 'test',
            name: 'test',
            description: 'tests',
            imageUrl: '',
        }, canonizeManager.getLocalSolver());
        const contractObj = blockchainObj.contractFactory.getOrCreate('0X231232132132132321312');
        contractObj.setBlockchain(blockchainObj.getName());
        let contractStandard;
        if (standard.toLowerCase() === 'erc1155')
            contractStandard = new ERC1155ContractStandard_1.ERC1155ContractStandard(canonizeManager);
        else
            contractStandard = new ERC721ContractStandard_1.ERC721ContractStandard(canonizeManager);
        contractObj.setStandard(contractStandard);
        contractObj.bindToCollection(collectionObj);
        const res = await canonizeManager.gossipBlockchainContract(blockchainObj);
    }
    static async testBinance(standard) {
        const canonizeManager = CanonManager_1.CanonManager.getInstance().getCSCanonizeManager();
        const blockchainObj = canonizeManager
            .getOrInitBlockchain(CSCanonizeManager_1.CompatibleBlockchains.binance);
        const collectionObj = canonizeManager.createCollection({
            id: 'test',
            name: 'test',
            description: 'tests',
            imageUrl: '',
        }, canonizeManager.getLocalSolver());
        const contractObj = blockchainObj.contractFactory.getOrCreate('0X231232132132132321312');
        contractObj.setBlockchain(blockchainObj.getName());
        let contractStandard;
        if (standard.toLowerCase() === 'erc1155')
            contractStandard = new ERC1155ContractStandard_1.ERC1155ContractStandard(canonizeManager);
        else
            contractStandard = new ERC721ContractStandard_1.ERC721ContractStandard(canonizeManager);
        contractObj.setStandard(contractStandard);
        contractObj.bindToCollection(collectionObj);
        const res = await canonizeManager.gossipBlockchainContract(blockchainObj);
    }
}
exports.Contracts = Contracts;
//# sourceMappingURL=Contracts.js.map