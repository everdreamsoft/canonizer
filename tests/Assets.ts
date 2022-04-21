import {SandraManager} from "../src/SandraManager";
import {AssetFactory} from "../src/canonizer/AssetFactory";
import {Asset} from "../src/canonizer/Asset";
import {CanonManager} from "./CanonManager";
import Api from "./API";

export class Assets {

    constructor() {
    }

    public static async test() {
        await Assets.testAsset();
    }

    private static async testAsset() {

        let sandra = new SandraManager();
        let assetFactory = new AssetFactory(sandra);

        new Asset(assetFactory, {
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
                let res = await CanonManager.getInstance().getCSCanonizeManager()
                    .gossip(assetFactory);

                // Read
                let assetInDB = await Api.getAssetsWithoutMeta();

                console.log(assetInDB);

            }, 100000);

        });

    }

}
