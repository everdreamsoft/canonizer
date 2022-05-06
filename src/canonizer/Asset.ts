import {Entity} from "../Entity.js";
import {AssetFactory} from "./AssetFactory.js";
import {SandraManager} from "../SandraManager.js";
import {BlockchainContract} from "./BlockchainContract.js";
import {Reference} from "../Reference.js";
import {AssetCollection} from "./AssetCollection.js";

export interface AssetInterface {
    assetId: string,
    metadataUrl?: string,
    imageUrl?: string,
    description?: string,
    name?: string,
    emote?: string,
}

export class Asset extends Entity {

    public constructor(factory: AssetFactory, assetInterface: AssetInterface, sandra: SandraManager) {

        super(factory, [new Reference(sandra.get(AssetFactory.ID), assetInterface.assetId)]);

        assetInterface.imageUrl ? this.addReference(new Reference(sandra.get(AssetFactory.imageUrl), assetInterface.imageUrl)) : null;
        assetInterface.metadataUrl ? this.addReference(new Reference(sandra.get(AssetFactory.metaDataUrl), assetInterface.metadataUrl)) : null;
        assetInterface.description ? this.addReference(new Reference(sandra.get(AssetFactory.description), assetInterface.description)) : null;
        assetInterface.name ? this.addReference(new Reference(sandra.get(AssetFactory.ASSET_NAME), assetInterface.name)) : null;
        assetInterface.emote ? this.addReference(new Reference(sandra.get(AssetFactory.ASSET_EMOTE + assetInterface.emote), assetInterface.emote)) : null;

    }

    public bindContract(contract: BlockchainContract) {
        this.joinEntity(AssetFactory.tokenJoinVerb, contract, this.factory.sandraManager, [new Reference(this.factory.sandraManager.get('sn'), 'canonizer')]);
    }

    public getJoinedContracts(): BlockchainContract[] {
        return this.getJoinedEntitiesOnVerb(AssetFactory.tokenJoinVerb) as BlockchainContract[];
    }

    public getJoinedCollections(): AssetCollection[] {
        return this.getJoinedEntitiesOnVerb(AssetFactory.collectionJoinVerb) as AssetCollection[]
    }

    public bindCollection(assetCollection: AssetCollection) {
        this.joinEntity(AssetFactory.collectionJoinVerb, assetCollection, this.factory.sandraManager);
    }

    public getImageUrl() {
        return this.getRefValue(AssetFactory.imageUrl);
    }

    public setImageUrl(imgUrl: string) {
        this.createOrUpdateRef(AssetFactory.imageUrl, imgUrl);
    }

    public getId() {
        return this.getRefValue(AssetFactory.ID);
    }

    public getDescription() {
        return this.getRefValue(AssetFactory.description);
    }

    public setDescription(description: string) {
        return this.getRefValue(AssetFactory.description);
    }

    public getEmote(emote: string) {
        return this.getRefValue(AssetFactory.ASSET_EMOTE + emote);
    }

    public setEmote(emote: string) {
        this.createOrUpdateRef(AssetFactory.ASSET_EMOTE + emote, emote);
    }

}
