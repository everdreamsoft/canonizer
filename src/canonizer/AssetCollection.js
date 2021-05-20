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
import { AssetCollectionFactory } from "./AssetCollectionFactory.js";
import { Reference } from "../Reference.js";
var AssetCollection = /** @class */ (function (_super) {
    __extends(AssetCollection, _super);
    function AssetCollection(factory, collectionInterface, sandra) {
        var _this = _super.call(this, factory) || this;
        //canonical vocabulary
        _this.COLLECTION_ID = 'collectionId';
        _this.NAME = 'name';
        _this.MAIN_IMAGE = 'imageUrl';
        _this.MAIN_NAME = 'name';
        _this.DESCRIPTION = 'description';
        _this.addReference(new Reference(sandra.get(_this.COLLECTION_ID), collectionInterface.id));
        collectionInterface.name ? _this.addReference(new Reference(sandra.get(_this.NAME), collectionInterface.name)) : null;
        collectionInterface.imageUrl ? _this.addReference(new Reference(sandra.get(_this.MAIN_IMAGE), collectionInterface.imageUrl)) : null;
        collectionInterface.description ? _this.addReference(new Reference(sandra.get(_this.DESCRIPTION), collectionInterface.description)) : null;
        return _this;
    }
    AssetCollection.prototype.getImageUrl = function () {
        return this.getRefValue(this.MAIN_IMAGE) ? this.getRefValue(this.MAIN_IMAGE) : '';
    };
    AssetCollection.prototype.getName = function () {
        return this.getRefValue(this.NAME) ? this.getRefValue(this.NAME) : '';
    };
    AssetCollection.prototype.getDescription = function () {
        return this.getRefValue(this.DESCRIPTION) ? this.getRefValue(this.DESCRIPTION) : '';
    };
    AssetCollection.prototype.getId = function () {
        return this.getRefValue(this.COLLECTION_ID) ? this.getRefValue(this.COLLECTION_ID) : '';
    };
    AssetCollection.prototype.setOwner = function (owner) {
        this.joinEntity(AssetCollectionFactory.COLLECTION_OWNER, owner, this.factory.sandraManager);
    };
    return AssetCollection;
}(Entity));
export { AssetCollection };
//# sourceMappingURL=AssetCollection.js.map