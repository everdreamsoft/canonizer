"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetFactory = void 0;
const EntityFactory_js_1 = require("../EntityFactory.js");
const Asset_1 = require("./Asset");
const Reference_1 = require("../Reference");
class AssetFactory extends EntityFactory_js_1.EntityFactory {
    constructor(sandra) {
        super('blockchainAsset', 'blockchainAssetFile', sandra);
        this.is_a = 'blockchainizableAsset';
        this.contained_in_file = 'blockchainizableAssets';
        this.updateOnExistingRef = sandra.get(AssetFactory.ID);
    }
    getReferences(asset) {
        let refArray = [];
        refArray.push(new Reference_1.Reference(this.sandraManager.get(AssetFactory.ID), asset.assetId));
        asset.metadataUrl ? refArray.push(new Reference_1.Reference(this.sandraManager.get(AssetFactory.metaDataUrl), asset.metadataUrl)) : null;
        asset.imageUrl ? refArray.push(new Reference_1.Reference(this.sandraManager.get(AssetFactory.imageUrl), asset.imageUrl)) : null;
        asset.description ? refArray.push(new Reference_1.Reference(this.sandraManager.get(AssetFactory.description), asset.description)) : null;
        asset.name ? refArray.push(new Reference_1.Reference(this.sandraManager.get(AssetFactory.name), asset.name)) : null;
        return refArray;
    }
    getOrCreateEntity(references) {
        let asset = super.getOrCreateEntity(references);
        if (!asset)
            return new Asset_1.Asset(this, references, this.sandraManager);
        else {
            return asset;
        }
    }
    replaceOrAddReference(asset, data) {
        if (data.metadataUrl)
            asset.createOrUpdateRef(AssetFactory.metaDataUrl, data.metadataUrl);
        if (data.imageUrl)
            asset.createOrUpdateRef(AssetFactory.imageUrl, data.imageUrl);
        if (data.description)
            asset.createOrUpdateRef(AssetFactory.description, data.description);
        if (data.name)
            asset.createOrUpdateRef(AssetFactory.name, data.name);
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