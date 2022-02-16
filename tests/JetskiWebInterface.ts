import {CompatibleBlockchains, CSCanonizeManager} from "../src/canonizer/CSCanonizeManager.js";
import {JetskiApp} from "../src/canonizer/tools/JetskiWebInterface/JetskiApp";

const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnYiOiJic2MiLCJmbHVzaCI6dHJ1ZSwiZXhwIjoxMDYwODE2MjQyMDk2MDAwfQ.X0MLqtaUtCrgfN_sWO0IhybOtftWE4Lltex2Hh0k0u4';
const gossipUrl = "http://localhost:8000/alex/gossip";

const canonizeManager = new CSCanonizeManager({connector: {gossipUrl: gossipUrl, jwt: jwt}});
const sandra = canonizeManager.getSandra();

let binance = canonizeManager.getOrInitBlockchain(CompatibleBlockchains.binance);
let ethereum = canonizeManager.getOrInitBlockchain(CompatibleBlockchains.ethereum);


let res = bootstrap();

async function bootstrap() {
    //await flushDatagraph();
    await addJetskiProcess();
}


async function addJetskiProcess() {

    let jetski = new JetskiApp(canonizeManager, "EVM Jetski");
    let jetskiProcessFactory = jetski.getProcessFactory();

    let blockchain = canonizeManager.getOrInitBlockchain(CompatibleBlockchains.binance);

    const collectionObj = canonizeManager.createCollection({
        id: "chainbabe",
        name: "chainbabe",
        description: "chainbabe desc",
        imageUrl: "",
    }, canonizeManager.getLocalSolver());

    let jetskiProcess = jetskiProcessFactory.getOrCreateJetskiProcess({
        processID: "9999",
        lastStartTime: "12/12/2022 10:00",
        processTitle: "jetski_bsc"
    }, sandra);

    jetskiProcess.setBlockchain(blockchain);
    jetskiProcess.setStatus("running");

    let jetAddress = jetskiProcess.getAddressFactory().getOrCreateJetskiAddress({
        lastBlockProcessed: "123433432",
        status: "active",
        lastUpdateTime: "10/12/2022",
        lastBlockSaved: "33333",
        hash: "0xD4793c2A8991F9A8D2F4714E113194C2DdEbFA51"
    }, sandra);

    jetAddress.bindJetskiCollection(collectionObj);

    let jetAddress1 = jetskiProcess.getAddressFactory().getOrCreateJetskiAddress({
        lastBlockProcessed: "3124243",
        status: "inactive",
        lastUpdateTime: "10/12/2022",
        lastBlockSaved: "33333",
        hash: "0xD4793c2A8991F9A8D2F4714E113194C2DdEbFAe1"
    }, sandra);


    jetskiProcess.bindJetskiAddress(jetAddress)
    jetskiProcess.bindJetskiAddress(jetAddress1)

    let res = await canonizeManager.gossipJetskiProcess(jetskiProcess);

    console.log(res);

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
