"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assets = void 0;
const SandraManager_1 = require("../src/SandraManager");
const AssetFactory_1 = require("../src/canonizer/AssetFactory");
const Asset_1 = require("../src/canonizer/Asset");
const CanonManager_1 = require("./CanonManager");
const API_1 = __importDefault(require("./API"));
class Assets {
    constructor() {
    }
    static async test() {
        await Assets.testAsset();
    }
    static async testAsset() {
        let sandra = new SandraManager_1.SandraManager();
        let assetFactory = new AssetFactory_1.AssetFactory(sandra);
        new Asset_1.Asset(assetFactory, {
            assetId: "1",
            description: "test",
            emote: "",
            name: "assetName",
            imageUrl: "imageUrl",
            metadataUrl: "metadata"
        }, sandra);
        describe("Asset Entity Test", () => {
            test('Verify', async () => {
                // Gossip
                let res = await CanonManager_1.CanonManager.getInstance().getCSCanonizeManager()
                    .gossip(assetFactory);
                // Read
                let assetInDB = await API_1.default.getAssetsWithoutMeta();
                console.log(assetInDB);
            }, 100000);
        });
    }
}
exports.Assets = Assets;
//# sourceMappingURL=Assets.js.map