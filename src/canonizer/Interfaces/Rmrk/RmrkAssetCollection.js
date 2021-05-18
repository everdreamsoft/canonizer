"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AssetCollection_1 = require("../../AssetCollection");
const Reference_1 = require("../../../Reference");
class RmrkAssetCollection extends AssetCollection_1.AssetCollection {
    constructor(factory, collectionInterface, sandra, maxSupply, creationBlock) {
        super(factory, collectionInterface, sandra);
        this.MAX_SUPPLY = 'maxSupply';
        this.CREATION_BLOCK = 'creationBlock';
        this.addReference(new Reference_1.Reference(sandra.get(this.MAX_SUPPLY), maxSupply.toString()));
        this.addReference(new Reference_1.Reference(sandra.get(this.CREATION_BLOCK), creationBlock.toString()));
    }
    static createRmrkCollection(canonizeManager, collectionInterface, maxSupply, creationBlock) {
        return new RmrkAssetCollection(canonizeManager.getAssetCollectionFactory(), collectionInterface, canonizeManager.getSandra(), maxSupply, creationBlock);
    }
}
exports.RmrkAssetCollection = RmrkAssetCollection;
//# sourceMappingURL=RmrkAssetCollection.js.map