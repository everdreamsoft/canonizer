import {SandraManager} from "../src/SandraManager";
import {JetskiProcessEntityFactory} from "../src/canonizer/tools/JetskiWebInterface/JetskiProcessEntityFactory";
import {JetskiProcessEntity} from "../src/canonizer/tools/JetskiWebInterface/JetskiProcessEntity";
import {CanonManager} from "./CanonManager";
import Api from "./API";
import {JetskiAddressEntityFactory} from "../src/canonizer/tools/JetskiWebInterface/JetskiAddressEntityFactory";
import {JetskiAddressEntity} from "../src/canonizer/tools/JetskiWebInterface/JetskiAddressEntity";
import {CompatibleBlockchains} from "../src/canonizer/CSCanonizeManager";

export class JetskiWebInterface {

    constructor() {
    }

    public static async test() {
        await JetskiWebInterface.addContractToProcess();
    }

    private static async testProcessEntity() {

        let sandra = new SandraManager();

        // Creating factory without updateExistingReference
        let processEntityFactory = new JetskiProcessEntityFactory(sandra);

        let processEntity = new JetskiProcessEntity(processEntityFactory, sandra, {
            processID: "9999",
            processTitle: "Process1",
            jetskiPath: "",
            processDescription: "test desc",
            lastStopTime: "12323",
            lastStartTime: "123456",
            jetskiName: "jetski1",
            id: "1"
        });

        let processEntity2 = new JetskiProcessEntity(processEntityFactory, sandra, {
            processID: "2222",
            processTitle: "Process1 Updated",
            jetskiPath: "",
            processDescription: "test desc updated",
            lastStopTime: "2222",
            lastStartTime: "2222",
            jetskiName: "jetski1Updated",
            id: "1"
        });

        let processEntity3 = new JetskiProcessEntity(processEntityFactory, sandra, {
            processID: "3333",
            processTitle: "Process2",
            jetskiPath: "",
            processDescription: "test desc 2",
            lastStopTime: "12323",
            lastStartTime: "123456",
            jetskiName: "jetski1",
            id: "2"
        });

        describe("Jetski Process Entity", () => {

            test('Entity Count  ', () => {
                expect(processEntityFactory.entityArray.length).toBe(2);
            });

            test('Updated Reference Values', () => {
                expect(processEntityFactory.entityArray[0].getRefValue(sandra.get(JetskiProcessEntityFactory.PROCESS_ID))).toBe("2222");
                expect(processEntityFactory.entityArray[1].getRefValue(sandra.get(JetskiProcessEntityFactory.PROCESS_ID))).toBe("3333");
            });

        });

        describe("Jetski Process Gossip and Read ", () => {

            test('Process Data Verify', async () => {

                // Gossip
                let res = await CanonManager.getInstance().getCSCanonizeManager().gossipJetskiProcess(processEntityFactory);

                // Read
                let process1FromDB = await Api.getJWIProcess("1");
                let process2FromDB = await Api.getJWIProcess("1");

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

    private static async addContractToProcess() {

        let sandra = new SandraManager();

        // Creating factory without updateExistingReference
        let processEntityFactory = new JetskiProcessEntityFactory(sandra);
        let jetskiAddressFactory = new JetskiAddressEntityFactory(sandra);
        let blockchain = CanonManager.getInstance().getCSCanonizeManager().getOrInitBlockchain(CompatibleBlockchains.binance);

        let processEntity = new JetskiProcessEntity(processEntityFactory, sandra, {
            processID: "9999",
            processTitle: "Process1",
            jetskiPath: "",
            processDescription: "test desc",
            lastStopTime: "12323",
            lastStartTime: "123456",
            jetskiName: "jetski1",
            id: "2"
        });

        let jetskiAddress1 = new JetskiAddressEntity(jetskiAddressFactory, sandra, {
            hash: "12345",
            standard: "erc721",
            blockRange: '500',
            startBlock: '100',
            endBlock: '100',
            lastUpdateTime: '',
            lastBlockProcessed: '',
            status: 'active',
            lastBlockSaved: '',
        })

        let jetskiAddress2 = new JetskiAddressEntity(jetskiAddressFactory, sandra, {
            hash: "123456",
            standard: "erc721",
            blockRange: '500',
            startBlock: '100',
            endBlock: '100',
            lastUpdateTime: '',
            lastBlockProcessed: '',
            status: 'active',
            lastBlockSaved: '',
        });

        //processEntity.bindJetskiAddress(jetskiAddress1);
       // processEntity.bindJetskiAddress(jetskiAddress2);
        //processEntity.setStatus("ACTIVE");
        //processEntity.setBlockchain(blockchain);

        // Gossip
        let res = await CanonManager.getInstance().getCSCanonizeManager().gossipJetskiProcess(processEntityFactory);
        console.log(res);

        let process1FromDB = await Api.getJWIProcess("1");
        console.log(process1FromDB);

    }

}
