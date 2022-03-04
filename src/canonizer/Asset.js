"use strict";
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
exports.__esModule = true;
exports.Asset = void 0;
var Entity_js_1 = require("../Entity.js");
var AssetFactory_js_1 = require("./AssetFactory.js");
var Reference_js_1 = require("../Reference.js");
var Asset = /** @class */ (function (_super) {
    __extends(Asset, _super);
    function Asset(factory, assetInterface, sandra) {
        var _this = _super.call(this, factory, [new Reference_js_1.Reference(sandra.get(AssetFactory_js_1.AssetFactory.ID), assetInterface.assetId)]) || this;
        _this.sandra = sandra;
        assetInterface.imageUrl ? _this.addReference(new Reference_js_1.Reference(sandra.get(AssetFactory_js_1.AssetFactory.imageUrl), assetInterface.imageUrl)) : null;
        assetInterface.metadataUrl ? _this.addReference(new Reference_js_1.Reference(sandra.get(AssetFactory_js_1.AssetFactory.metaDataUrl), assetInterface.metadataUrl)) : null;
        assetInterface.description ? _this.addReference(new Reference_js_1.Reference(sandra.get(AssetFactory_js_1.AssetFactory.description), assetInterface.description)) : null;
        assetInterface.name ? _this.addReference(new Reference_js_1.Reference(sandra.get(AssetFactory_js_1.AssetFactory.ASSET_NAME), assetInterface.name)) : null;
        assetInterface.emote ? _this.addReference(new Reference_js_1.Reference(sandra.get(AssetFactory_js_1.AssetFactory.ASSET_EMOTE + assetInterface.emote), assetInterface.emote)) : null;
        return _this;
    }
    Asset.prototype.bindContract = function (contract) {
        this.joinEntity(AssetFactory_js_1.AssetFactory.tokenJoinVerb, contract, this.sandra, [new Reference_js_1.Reference(this.sandra.get('sn'), 'canonizer')]);
    };
    Asset.prototype.getJoinedContracts = function () {
        // @ts-ignore
        return this.getJoinedEntitiesOnVerb(AssetFactory_js_1.AssetFactory.tokenJoinVerb);
    };
    Asset.prototype.getJoinedCollections = function () {
        // @ts-ignore
        return this.getJoinedEntitiesOnVerb(AssetFactory_js_1.AssetFactory.collectionJoinVerb);
    };
    Asset.prototype.bindCollection = function (assetCollection) {
        this.joinEntity(AssetFactory_js_1.AssetFactory.collectionJoinVerb, assetCollection, this.sandra);
    };
    Asset.prototype.getImageUrl = function () {
        return this.getRefValue(AssetFactory_js_1.AssetFactory.imageUrl);
    };
    Asset.prototype.setImageUrl = function (imgUrl) {
        this.createOrUpdateRef(AssetFactory_js_1.AssetFactory.imageUrl, imgUrl);
    };
    Asset.prototype.getId = function () {
        return this.getRefValue(AssetFactory_js_1.AssetFactory.ID);
    };
    Asset.prototype.getDescription = function () {
        return this.getRefValue(AssetFactory_js_1.AssetFactory.description);
    };
    Asset.prototype.setDescription = function (description) {
        return this.getRefValue(AssetFactory_js_1.AssetFactory.description);
    };
    Asset.prototype.getEmote = function (emote) {
        return this.getRefValue(AssetFactory_js_1.AssetFactory.ASSET_EMOTE + emote);
    };
    Asset.prototype.setEmote = function (emote) {
        this.createOrUpdateRef(AssetFactory_js_1.AssetFactory.ASSET_EMOTE + emote, emote);
    };
    return Asset;
}(Entity_js_1.Entity));
exports.Asset = Asset;
