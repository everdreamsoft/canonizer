"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetCollection = void 0;
const Entity_js_1 = require("../Entity.js");
const AssetCollectionFactory_js_1 = require("./AssetCollectionFactory.js");
const Reference_1 = require("../Reference");
class AssetCollection extends Entity_js_1.Entity {
    constructor(factory, collectionInterface, sandra) {
        super(factory, [new Reference_1.Reference(sandra.get(AssetCollectionFactory_js_1.AssetCollectionFactory.COLLECTION_ID), collectionInterface.id)]);
        collectionInterface.name ? this.addReference(new Reference_1.Reference(sandra.get(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_NAME), collectionInterface.name)) : null;
        collectionInterface.imageUrl ? this.addReference(new Reference_1.Reference(sandra.get(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_IMAGE), collectionInterface.imageUrl)) : null;
        collectionInterface.description ? this.addReference(new Reference_1.Reference(sandra.get(AssetCollectionFactory_js_1.AssetCollectionFactory.DESCRIPTION), collectionInterface.description)) : null;
    }
    getImageUrl() {
        return this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_IMAGE) ? this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_IMAGE) : '';
    }
    getName() {
        return this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_NAME) ? this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.MAIN_NAME) : '';
    }
    getDescription() {
        return this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.DESCRIPTION) ? this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.DESCRIPTION) : '';
    }
    getId() {
        return this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.COLLECTION_ID) ? this.getRefValue(AssetCollectionFactory_js_1.AssetCollectionFactory.COLLECTION_ID) : '';
    }
    setOwner(owner) {
        this.joinEntity(AssetCollectionFactory_js_1.AssetCollectionFactory.COLLECTION_OWNER, owner, this.factory.sandraManager);
    }
}
exports.AssetCollection = AssetCollection;
//# sourceMappingURL=AssetCollection.js.map