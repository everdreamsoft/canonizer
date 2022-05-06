import {CSCanonizeManager} from "../CSCanonizeManager.js";
import {AssetSolver} from "./AssetSolver.js";

export class LocalSolver extends AssetSolver {

    public constructor(canonizeManager: CSCanonizeManager) {
        let factory = canonizeManager.getAssetSolverFactory();
        super(canonizeManager, 'localSolver', 'CsCannon\\\AssetSolvers\\\LocalSolver');
    }

}
