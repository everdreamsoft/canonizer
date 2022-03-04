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
exports.AssetCollection = void 0;
var Entity_js_1 = require("../Entity.js");
var AssetCollectionFactory_js_1 = require("./AssetCollectionFactory.js");
var Reference_1 = require("../Reference");
var AssetCollection = /** @class */ (function (_super) {
    __extends(AssetCollection, _super);
    function AssetCollection(factory, collectionInterface, sandra) {
        var _this = _super.call(this, factory, [new Reference_1.Reference(sandra.get(AssetCollectionFactory_js_1.AssetCollectionFactory.COLLECTION_ID), collectionInterface.id)]) || this;
        collectionInterface.name ? _this.addReference(new Reference_1.Reference(sandra.get(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_NAME), collectionInterface.name)) : null;
        collectionInterface.imageUrl ? _this.addReference(new Reference_1.Reference(sandra.get(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_IMAGE), collectionInterface.imageUrl)) : null;
        collectionInterface.description ? _this.addReference(new Reference_1.Reference(sandra.get(AssetCollectionFactory_js_1.AssetCollectionFactory.DESCRIPTION), collectionInterface.description)) : null;
        return _this;
    }
    AssetCollection.prototype.getImageUrl = function () {
        return this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_IMAGE) ? this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_IMAGE) : '';
    };
    AssetCollection.prototype.getName = function () {
        return this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_NAME) ? this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_NAME) : '';
    };
    AssetCollection.prototype.getDescription = function () {
        return this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.DESCRIPTION) ? this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.DESCRIPTION) : '';
    };
    AssetCollection.prototype.getId = function () {
        return this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.COLLECTION_ID) ? this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.COLLECTION_ID) : '';
    };
    AssetCollection.prototype.setOwner = function (owner) {
        this.joinEntity(AssetCollectionFactory_js_1.AssetCollectionFactory.COLLECTION_OWNER, owner, this.factory.sandraManager);
    };
    return AssetCollection;
}(Entity_js_1.Entity));
exports.AssetCollection = AssetCollection;
