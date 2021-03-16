"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_js_1 = require("../Entity.js");
const Reference_js_1 = require("../Reference.js");
class AssetCollection extends Entity_js_1.Entity {
    constructor(factory, collectionInterface, sandra) {
        super(factory);
        //canonical vocabulary
        this.COLLECTION_ID = 'collectionId';
        this.NAME = 'name';
        this.MAIN_IMAGE = 'imageUrl';
        this.MAIN_NAME = 'name';
        this.DESCRIPTION = 'description';
        this.addReference(new Reference_js_1.Reference(sandra.get(this.COLLECTION_ID), collectionInterface.id));
        collectionInterface.name ? this.addReference(new Reference_js_1.Reference(sandra.get(this.NAME), collectionInterface.name)) : null;
        collectionInterface.imageUrl ? this.addReference(new Reference_js_1.Reference(sandra.get(this.MAIN_IMAGE), collectionInterface.imageUrl)) : null;
        collectionInterface.description ? this.addReference(new Reference_js_1.Reference(sandra.get(this.DESCRIPTION), collectionInterface.description)) : null;
    }
    getImageUrl() {
        return this.getRefValue(this.MAIN_IMAGE) ? this.getRefValue(this.MAIN_IMAGE) : '';
    }
    getName() {
        return this.getRefValue(this.NAME) ? this.getRefValue(this.NAME) : '';
    }
    getDescription() {
        return this.getRefValue(this.DESCRIPTION) ? this.getRefValue(this.DESCRIPTION) : '';
    }
    getId() {
        return this.getRefValue(this.COLLECTION_ID) ? this.getRefValue(this.COLLECTION_ID) : '';
    }
}
exports.AssetCollection = AssetCollection;
//# sourceMappingURL=AssetCollection.js.map