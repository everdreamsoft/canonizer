"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiWebInterface = void 0;
const SandraManager_1 = require("../src/SandraManager");
const JetskiProcessEntityFactory_1 = require("../src/canonizer/tools/JetskiWebInterface/JetskiProcessEntityFactory");
const JetskiProcessEntity_1 = require("../src/canonizer/tools/JetskiWebInterface/JetskiProcessEntity");
const CanonManager_1 = require("./CanonManager");
const API_1 = __importDefault(require("./API"));
const JetskiAddressEntityFactory_1 = require("../src/canonizer/tools/JetskiWebInterface/JetskiAddressEntityFactory");
const JetskiAddressEntity_1 = require("../src/canonizer/tools/JetskiWebInterface/JetskiAddressEntity");
const CSCanonizeManager_1 = require("../src/canonizer/CSCanonizeManager");
class JetskiWebInterface {
    constructor() {
    }
    static async test() {
        await JetskiWebInterface.addContractToProcess();
    }
    static async testProcessEntity() {
        let sandra = new SandraManager_1.SandraManager();
        // Creating factory without updateExistingReference
        let processEntityFactory = new JetskiProcessEntityFactory_1.JetskiProcessEntityFactory(sandra);
        let processEntity = new JetskiProcessEntity_1.JetskiProcessEntity(processEntityFactory, sandra, {
            processID: "9999",
            processTitle: "Process1",
            processDescription: "test desc",
            lastStopTime: "12323",
            lastStartTime: "123456",
            appName: "jetski1",
            id: "1",
            status: "running"
        });
        let processEntity2 = new JetskiProcessEntity_1.JetskiProcessEntity(processEntityFactory, sandra, {
            processID: "2222",
            processTitle: "Process1 Updated",
            processDescription: "test desc updated",
            lastStopTime: "2222",
            lastStartTime: "2222",
            appName: "jetski1Updated",
            id: "1",
            status: "running"
        });
        let processEntity3 = new JetskiProcessEntity_1.JetskiProcessEntity(processEntityFactory, sandra, {
            processID: "3333",
            processTitle: "Process2",
            processDescription: "test desc 2",
            lastStopTime: "12323",
            lastStartTime: "123456",
            appName: "jetski1",
            id: "2",
            status: "running"
        });
        describe("Jetski Process Entity", () => {
            test('Entity Count  ', () => {
                expect(processEntityFactory.entityArray.length).toBe(2);
            });
            test('Updated Reference Values', () => {
                expect(processEntityFactory.entityArray[0].getRefValue(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.PROCESS_ID))).toBe("2222");
                expect(processEntityFactory.entityArray[1].getRefValue(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.PROCESS_ID))).toBe("3333");
            });
        });
        describe("Jetski Process Gossip and Read ", () => {
            test('Process Data Verify', async () => {
                // Gossip
                let res = await CanonManager_1.CanonManager.getInstance().getCSCanonizeManager().gossipJetskiProcess(processEntityFactory);
                // Read
                let process1FromDB = await API_1.default.getJWIProcess("1");
                let process2FromDB = await API_1.default.getJWIProcess("1");
                expect(process1FromDB.id).toBe("1");
                expect(process1FromDB.processTitle).toBe("Process1 Updated");
                expect(process1FromDB.jetskiPath).toBe("");
                expect(process1FromDB.processDescription).toBe("test desc updated");
                expect(process1FromDB.lastStopTime).toBe("2222");
                expect(process1FromDB.lastStartTime).toBe("2222");
                expect(process1FromDB.processID).toBe("2222");
            }, 100000);
        });
    }
    static async addContractToProcess() {
        let sandra = new SandraManager_1.SandraManager();
        // Creating factory without updateExistingReference
        let processEntityFactory = new JetskiProcessEntityFactory_1.JetskiProcessEntityFactory(sandra);
        let jetskiAddressFactory = new JetskiAddressEntityFactory_1.JetskiAddressEntityFactory(sandra);
        let blockchain = CanonManager_1.CanonManager.getInstance().getCSCanonizeManager().getOrInitBlockchain(CSCanonizeManager_1.CompatibleBlockchains.binance);
        let processEntity = new JetskiProcessEntity_1.JetskiProcessEntity(processEntityFactory, sandra, {
            processID: "9999",
            processTitle: "",
            processDescription: "EVM Jetski for binance chain",
            lastStopTime: Date.now().toString(),
            lastStartTime: Date.now().toString(),
            appName: "EVMJetski",
            id: "evmjetski_binance",
            status: "running"
        });
        let jetskiAddress1 = new JetskiAddressEntity_1.JetskiAddressEntity(jetskiAddressFactory, sandra, {
            hash: "0x728cb1069397ca3e2c268946eed59200aa0d494a",
            standard: "erc1155",
            blockRange: '5000',
            startBlock: '9943215',
            endBlock: '9993215',
            lastUpdateTime: Date.now().toString(),
            lastBlockProcessed: '9944215',
            status: 'active',
            lastBlockSaved: '9943915',
            metadataType: ""
        });
        let jetskiAddress2 = new JetskiAddressEntity_1.JetskiAddressEntity(jetskiAddressFactory, sandra, {
            hash: "123456",
            standard: "erc721",
            blockRange: '500',
            startBlock: '100',
            endBlock: '100',
            lastUpdateTime: '',
            lastBlockProcessed: '',
            status: 'active',
            lastBlockSaved: '',
            metadataType: ""
        });
        //processEntity.bindJetskiAddress(jetskiAddress1);
        //processEntity.bindJetskiAddress(jetskiAddress2);
        processEntity.setStatus("running1");
        processEntity.setBlockchain(blockchain);
        // Gossip
        let res = await CanonManager_1.CanonManager.getInstance().getCSCanonizeManager().gossipJetskiProcess(processEntityFactory);
        console.log(res);
        let process1FromDB = await API_1.default.getJWIProcess("evmjetski_binance");
        console.log(process1FromDB);
    }
}
exports.JetskiWebInterface = JetskiWebInterface;
//# sourceMappingURL=JetskiWebInterface.js.map