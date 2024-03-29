"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CSCanonizeManager_js_1 = require("../../src/canonizer/CSCanonizeManager.js");
const JetskiAddressEntityFactory_1 = require("../../src/canonizer/tools/JetskiWebInterface/JetskiAddressEntityFactory");
const JetskiProcessEntityFactory_1 = require("../../src/canonizer/tools/JetskiWebInterface/JetskiProcessEntityFactory");
const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnYiOiJic2MiLCJmbHVzaCI6dHJ1ZSwiZXhwIjoxMDYwODE2MjQyMDk2MDAwfQ.X0MLqtaUtCrgfN_sWO0IhybOtftWE4Lltex2Hh0k0u4';
const gossipUrl = "http://localhost:8000/alex/gossip";
const canonizeManager = new CSCanonizeManager_js_1.CSCanonizeManager({ connector: { gossipUrl: gossipUrl, jwt: jwt } });
const sandra = canonizeManager.getSandra();
let binance = canonizeManager.getOrInitBlockchain(CSCanonizeManager_js_1.CompatibleBlockchains.binance);
let ethereum = canonizeManager.getOrInitBlockchain(CSCanonizeManager_js_1.CompatibleBlockchains.ethereum);
let res = bootstrap();
async function bootstrap() {
    // await flushDatagraph();
    await addJetskiProcessFullData();
}
async function updateJetskiProcess() {
    let blockchain = canonizeManager.getOrInitBlockchain(CSCanonizeManager_js_1.CompatibleBlockchains.binance);
    let jetskiProcessFactory = new JetskiProcessEntityFactory_1.JetskiProcessEntityFactory(sandra);
    let jetskiProcess = jetskiProcessFactory.getOrCreateJetskiProcess({
        processID: "",
        lastStartTime: "",
        processTitle: "",
        processDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mauris quis consequat sodales. Donec id mi sit amet mauris sodales mollis ac vel neque. Praesent venenatis consectetur mollis. Aenean sed tincidunt mi. Nullam ut mauris vulputate, suscipit ante a, mattis lectus. Vivamus pretium vulputate lacus, in interdum orci pellentesque vel. Sed condimentum felis id felis tempor, quis gravida dolor aliquam. ",
        appName: "",
        lastStopTime: "",
        id: "001",
        status: 'stopped'
    });
    jetskiProcess.setBlockchain(blockchain);
    jetskiProcess.setStatus("");
    let res = await canonizeManager.gossipJetskiProcess(jetskiProcessFactory);
}
async function addAddContractToProcess() {
    let jetskiAddressFactory = new JetskiAddressEntityFactory_1.JetskiAddressEntityFactory(canonizeManager.getSandra());
}
async function addJetskiProcess() {
    let blockchain = canonizeManager.getOrInitBlockchain(CSCanonizeManager_js_1.CompatibleBlockchains.binance);
    let jetskiProcessFactory = new JetskiProcessEntityFactory_1.JetskiProcessEntityFactory(sandra);
    let jetskiProcess = jetskiProcessFactory.getOrCreateJetskiProcess({
        processID: "",
        lastStartTime: "",
        processTitle: "",
        processDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mauris quis consequat sodales. Donec id mi sit amet mauris sodales mollis ac vel neque. Praesent venenatis consectetur mollis. Aenean sed tincidunt mi. Nullam ut mauris vulputate, suscipit ante a, mattis lectus. Vivamus pretium vulputate lacus, in interdum orci pellentesque vel. Sed condimentum felis id felis tempor, quis gravida dolor aliquam. ",
        appName: "",
        lastStopTime: "",
        id: "1",
        status: 'stopped'
    });
    jetskiProcess.setBlockchain(blockchain);
    jetskiProcess.setStatus("");
    let res = await canonizeManager.gossipJetskiProcess(jetskiProcessFactory);
    console.log(res);
}
async function addJetskiProcessFullData() {
    let jetskiProcessFactory = new JetskiProcessEntityFactory_1.JetskiProcessEntityFactory(sandra);
    let blockchain = canonizeManager.getOrInitBlockchain(CSCanonizeManager_js_1.CompatibleBlockchains.binance);
    // const collectionObj = canonizeManager.createCollection({
    //     id: "chainbabe",
    //     name: "chainbabe",
    //     description: "chainbabe desc",
    //     imageUrl: "",
    // }, canonizeManager.getLocalSolver());
    // const collectionObj1 = canonizeManager.createCollection({
    //     id: "chainbabe1",
    //     name: "chainbabe1",
    //     description: "chainbabe desc1",
    //     imageUrl: "",
    // }, canonizeManager.getLocalSolver());
    let jetskiProcess = jetskiProcessFactory.getOrCreateJetskiProcess({
        processID: "9999",
        lastStartTime: "12/12/2022 10:00",
        processTitle: "jetski_bsc",
        processDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor mauris quis consequat sodales. Donec id mi sit amet mauris sodales mollis ac vel neque. Praesent venenatis consectetur mollis. Aenean sed tincidunt mi. Nullam ut mauris vulputate, suscipit ante a, mattis lectus. Vivamus pretium vulputate lacus, in interdum orci pellentesque vel. Sed condimentum felis id felis tempor, quis gravida dolor aliquam. ",
        appName: "EVMJetski",
        lastStopTime: "16/12/2022 10:00",
        id: canonizeManager.getProcessIdPrefix(CSCanonizeManager_js_1.ProcessName.EVM_JETSKI) + "_" + "binance",
        status: 'stopped'
    });
    jetskiProcess.setBlockchain(blockchain);
    jetskiProcess.setStatus("running");
    // let jetAddress = jetskiProcess.getAddressFactory().getOrCreateJetskiAddress({
    //     lastBlockProcessed: "123433432",
    //     status: "active",
    //     lastUpdateTime: "10/12/2022",
    //     lastBlockSaved: "33333",
    //     hash: "0xD4793c2A8991F9A8D2F4714E113194C2DdEbFA51",
    //     startBlock: "111111234",
    //     blockRange: "2000",
    //     standard: "erc721",
    //     endBlock: ""
    // }, sandra);
    // jetAddress.bindJetskiCollection(collectionObj);
    // jetAddress.bindJetskiCollection(collectionObj1);
    // let jetAddress1 = jetskiProcess.getAddressFactory().getOrCreateJetskiAddress({
    //     lastBlockProcessed: "3124243",
    //     status: "inactive",
    //     lastUpdateTime: "10/12/2022",
    //     lastBlockSaved: "33333",
    //     hash: "0xD4793c2A8991F9A8D2F4714E113194C2DdEbFAe1",
    //     endBlock: "",
    //     blockRange: "",
    //     startBlock: "",
    //     standard: ""
    // }, sandra);
    // jetskiProcess.bindJetskiAddress(jetAddress)
    // jetskiProcess.bindJetskiAddress(jetAddress1)
    let res = await canonizeManager.gossipJetskiProcess(jetskiProcessFactory);
    console.log(res);
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
//# sourceMappingURL=JetskiWebInterface.js.map