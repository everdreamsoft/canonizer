"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
class AssetFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super('blockchainAsset', 'blockchainAssetFile', sandra, sandra.get(AssetFactory.ID));
        this.is_a = 'blockchainizableAsset';
        this.contained_in_file = 'blockchainizableAssets';
    }
}
exports.AssetFactory = AssetFactory;
AssetFactory.ID = 'assetId';
AssetFactory.imageUrl = 'imgUrl';
AssetFactory.metaDataUrl = 'metaDataUrl';
AssetFactory.tokenJoinVerb = 'bindToContract';
AssetFactory.collectionJoinVerb = 'bindToCollection';
AssetFactory.description = 'description';
AssetFactory.ASSET_NAME = 'name';
AssetFactory.ASSET_EMOTE = 'emote_'; // add unicode of emote
//# sourceMappingURL=AssetFactory.js.map