import {CSCanonizeManager} from "../../CSCanonizeManager";
import {AssetCollectionInterface} from "../../AssetCollection";
import {AssetSolver} from "../../AssetSolvers/AssetSolver";
import {AssetSolverFactory} from "../../AssetSolvers/AssetSolverFactory";
import {RmrkAssetCollection} from "./RmrkAssetCollection";

export class RmrkCanonizerWrapper {

    private readonly canonizeManager: CSCanonizeManager;

    public constructor(canonizeManager: CSCanonizeManager) {
        this.canonizeManager = canonizeManager;
    }

    public createRmrkCollection(collectionInterface: AssetCollectionInterface, maxSupply: number, creationBlock: number, solver?: AssetSolver) {
        let assetSolver = solver ? solver : this.canonizeManager.getLocalSolver();
        let collection = RmrkAssetCollection.createRmrkCollection(this.canonizeManager, collectionInterface, maxSupply, creationBlock)
        collection.joinEntity(AssetSolverFactory.COLLECTION_JOIN_VERB, assetSolver, this.canonizeManager.getSandra());
        return collection;
    }

}
