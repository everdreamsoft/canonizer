import {EntityFactory} from "../EntityFactory.js";
import {SandraManager} from "../SandraManager.js";
import {Asset, AssetInterface} from "./Asset";
import {Reference} from "../Reference";
import {Entity} from "../Entity";


export class AssetFactory extends EntityFactory {

    public is_a: string = 'blockchainizableAsset';
    public contained_in_file: string = 'blockchainizableAssets';

    public static ID = 'assetId';
    public static imageUrl = 'imgUrl';
    public static metaDataUrl = 'metaDataUrl';
    public static tokenJoinVerb = 'bindToContract';
    public static collectionJoinVerb = 'bindToCollection';
    public static description = 'description';
    public static ASSET_NAME = 'name';
    public static ASSET_EMOTE = 'emote_'; // add unicode of emote

    public constructor(sandra: SandraManager) {
        super('blockchainAsset', 'blockchainAssetFile', sandra);
        this.updateOnExistingRef = sandra.get(AssetFactory.ID);
    }

    public getReferences(asset: AssetInterface) {
        let refArray: Reference[] = [];
        refArray.push(new Reference(this.sandraManager.get(AssetFactory.ID), asset.assetId))
        asset.metadataUrl ? refArray.push(new Reference(this.sandraManager.get(AssetFactory.metaDataUrl), asset.metadataUrl)) : null;
        asset.imageUrl ? refArray.push(new Reference(this.sandraManager.get(AssetFactory.imageUrl), asset.imageUrl)) : null;
        asset.description ? refArray.push(new Reference(this.sandraManager.get(AssetFactory.description), asset.description)) : null;
        asset.name ? refArray.push(new Reference(this.sandraManager.get(AssetFactory.name), asset.name)) : null;
        return refArray;
    }

    override getOrCreateEntity(references: AssetInterface): Asset {

        let asset: Asset = super.getOrCreateEntity(references) as Asset;

        if (!asset)
            return new Asset(this, references, this.sandraManager);
        else {
            return asset;
        }
    }

    public replaceOrAddReference(asset: Entity, data: AssetInterface) {
        if (data.metadataUrl) asset.createOrUpdateRef(AssetFactory.metaDataUrl, data.metadataUrl);
        if (data.imageUrl) asset.createOrUpdateRef(AssetFactory.imageUrl, data.imageUrl);
        if (data.description) asset.createOrUpdateRef(AssetFactory.description, data.description);
        if (data.name) asset.createOrUpdateRef(AssetFactory.name, data.name);
    }

}
