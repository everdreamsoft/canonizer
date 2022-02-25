import {CompatibleBlockchains, CSCanonizeManager} from "../src/canonizer/CSCanonizeManager.js";
import {BalanceEntity} from "../src/canonizer/BalanceEntity";
import {BalanceFactory} from "../src/canonizer/BalanceFactory";
import {ERC721ContractStandard} from "../src/canonizer/Contracts/ERC721ContractStandard";

const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnYiOiJic2MiLCJmbHVzaCI6dHJ1ZSwiZXhwIjoxMDYwODE2MjQyMDk2MDAwfQ.X0MLqtaUtCrgfN_sWO0IhybOtftWE4Lltex2Hh0k0u4';
const gossipUrl = "http://localhost:8000/alex/gossip";

const canonizeManager = new CSCanonizeManager({connector: {gossipUrl: gossipUrl, jwt: jwt}});
const sandra = canonizeManager.getSandra();

let binance = canonizeManager.getOrInitBlockchain(CompatibleBlockchains.binance);
let ethereum = canonizeManager.getOrInitBlockchain(CompatibleBlockchains.ethereum);


let res = bootstrap();

async function bootstrap() {
    await flushDatagraph();
    await addBalance();
}

async function addBalance() {

    try {

        let binanceContract = binance.contractFactory.getOrCreate('241B8516516F381A-BINANCE');
        let erc721ContractStandard = new ERC721ContractStandard(canonizeManager);
        erc721ContractStandard.setTokenId("123454");
        binanceContract.setStandard(erc721ContractStandard);
        binanceContract.setBlockchain(binance.getName());

        let addressFactory = binance.addressFactory;
        let balanceFact = new BalanceFactory(sandra)

        let address1 = addressFactory.getOrCreate("0xdsfsdfsdfsdfsffdsfds2");

        new BalanceEntity(balanceFact, {
            quantity: "2",
            specifierArray: erc721ContractStandard.getSpecifierArray(),
            contract: binanceContract,
            address: address1
        });

        let address2 = addressFactory.getOrCreate("0x31232312312312312313232");

        erc721ContractStandard.setTokenId("8888888");
         new BalanceEntity(balanceFact, {
            quantity: "5",
            specifierArray: erc721ContractStandard.getSpecifierArray(),
            contract: binanceContract,
            address: address2
        });

        let res = await canonizeManager.gossipBalance(balanceFact);
        console.log(res);

    } catch (e) {
        console.log(e);
    }
}

async function flushDatagraph() {
    let flushing = await canonizeManager.flushWithBlockchainSupport([binance]).then(r => {
        console.log("flushed and added blockchain support");
        console.log(JSON.parse(r));
        return r;
    }).catch(
        err => {
            console.log(err)
        }
    )
}
