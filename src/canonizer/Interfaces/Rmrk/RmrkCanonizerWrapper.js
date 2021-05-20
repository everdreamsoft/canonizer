"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmrkCanonizerWrapper = void 0;
const AssetSolverFactory_1 = require("../../AssetSolvers/AssetSolverFactory");
const RmrkAssetCollection_1 = require("./RmrkAssetCollection");
class RmrkCanonizerWrapper {
    constructor(canonizeManager) {
        this.canonizeManager = canonizeManager;
    }
    createRmrkCollection(collectionInterface, maxSupply, creationBlock, solver) {
        let assetSolver = solver ? solver : this.canonizeManager.getLocalSolver();
        let collection = RmrkAssetCollection_1.RmrkAssetCollection.createRmrkCollection(this.canonizeManager, collectionInterface, maxSupply, creationBlock);
        collection.joinEntity(AssetSolverFactory_1.AssetSolverFactory.COLLECTION_JOIN_VERB, assetSolver, this.canonizeManager.getSandra());
        return collection;
    }
}
exports.RmrkCanonizerWrapper = RmrkCanonizerWrapper;
//# sourceMappingURL=RmrkCanonizerWrapper.js.map