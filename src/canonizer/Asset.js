var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Entity } from "../Entity.js";
import { AssetFactory } from "./AssetFactory.js";
import { Reference } from "../Reference.js";
var Asset = /** @class */ (function (_super) {
    __extends(Asset, _super);
    function Asset(factory, assetInterface, sandra) {
        var _this = _super.call(this, factory) || this;
        _this.sandra = sandra;
        _this.addReference(new Reference(sandra.get(AssetFactory.ID), assetInterface.assetId));
        assetInterface.imageUrl ? _this.addReference(new Reference(sandra.get(AssetFactory.imageUrl), assetInterface.imageUrl)) : null;
        assetInterface.metadataUrl ? _this.addReference(new Reference(sandra.get(AssetFactory.metaDataUrl), assetInterface.metadataUrl)) : null;
        assetInterface.description ? _this.addReference(new Reference(sandra.get(AssetFactory.description), assetInterface.description)) : null;
        assetInterface.name ? _this.addReference(new Reference(sandra.get(AssetFactory.ASSET_NAME), assetInterface.name)) : null;
        return _this;
    }
    Asset.prototype.bindContract = function (contract) {
        this.joinEntity(AssetFactory.tokenJoinVerb, contract, this.sandra, [new Reference(this.sandra.get('sn'), 'canonizer')]);
    };
    Asset.prototype.getJoinedContracts = function () {
        // @ts-ignore
        return this.getJoinedEntitiesOnVerb(AssetFactory.tokenJoinVerb);
    };
    Asset.prototype.getJoinedCollections = function () {
        // @ts-ignore
        return this.getJoinedEntitiesOnVerb(AssetFactory.collectionJoinVerb);
    };
    Asset.prototype.bindCollection = function (assetCollection) {
        this.joinEntity(AssetFactory.collectionJoinVerb, assetCollection, this.sandra);
    };
    Asset.prototype.getImageUrl = function () {
        return this.getRefValue(AssetFactory.imageUrl);
    };
    Asset.prototype.setImageUrl = function (imgUrl) {
        this.createOrUpdateRef(AssetFactory.imageUrl, imgUrl);
    };
    Asset.prototype.getId = function () {
        return this.getRefValue(AssetFactory.ID);
    };
    Asset.prototype.getDescription = function () {
        return this.getRefValue(AssetFactory.description);
    };
    Asset.prototype.setDescription = function (description) {
        return this.getRefValue(AssetFactory.description);
    };
    Asset.prototype.setMetaDatasUrl = function (metaDatasUrl) {
        // TODO createOrUpdateRef
        // this.metaDatasUrl = metaDatasUrl;
    };
    return Asset;
}(Entity));
export { Asset };
//# sourceMappingURL=Asset.js.map