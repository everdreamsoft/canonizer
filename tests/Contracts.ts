import {SandraManager} from "../src/SandraManager";
import {CanonManager} from "./CanonManager";
import {CompatibleBlockchains} from "../src/canonizer/CSCanonizeManager";
import {ERC1155ContractStandard} from "../src/canonizer/Contracts/ERC1155ContractStandard";
import {ERC721ContractStandard} from "../src/canonizer/Contracts/ERC721ContractStandard";

export class Contracts {

    constructor() {
    }

    public static async test() {

        await Contracts.testBinance("erc721");
    }

    private static async testEthereum(standard: string) {

        const canonizeManager = CanonManager.getInstance().getCSCanonizeManager();

        const blockchainObj = canonizeManager
            .getOrInitBlockchain(CompatibleBlockchains.ethereum);

        const collectionObj = canonizeManager.createCollection({
            id: 'test',
            name: 'test',
            description: 'tests',
            imageUrl: '',
        }, canonizeManager.getLocalSolver());
        const contractObj = blockchainObj.contractFactory.getOrCreate('0X231232132132132321312');

        contractObj.setBlockchain(blockchainObj.getName());
        let contractStandard;

        if (standard.toLowerCase() === 'erc1155') contractStandard = new ERC1155ContractStandard(canonizeManager);
        else contractStandard = new ERC721ContractStandard(canonizeManager);

        contractObj.setStandard(contractStandard);
        contractObj.bindToCollection(collectionObj);

        const res = await canonizeManager.gossipBlockchainContract(blockchainObj);


    }

    private static async testBinance(standard: string) {

        const canonizeManager = CanonManager.getInstance().getCSCanonizeManager();

        const blockchainObj = canonizeManager
            .getOrInitBlockchain(CompatibleBlockchains.binance);

        const collectionObj = canonizeManager.createCollection({
            id: 'test',
            name: 'test',
            description: 'tests',
            imageUrl: '',
        }, canonizeManager.getLocalSolver());
        const contractObj = blockchainObj.contractFactory.getOrCreate('0X231232132132132321312');

        contractObj.setBlockchain(blockchainObj.getName());
        let contractStandard;

        if (standard.toLowerCase() === 'erc1155') contractStandard = new ERC1155ContractStandard(canonizeManager);
        else contractStandard = new ERC721ContractStandard(canonizeManager);

        contractObj.setStandard(contractStandard);
        contractObj.bindToCollection(collectionObj);

        const res = await canonizeManager.gossipBlockchainContract(blockchainObj);


    }

}
