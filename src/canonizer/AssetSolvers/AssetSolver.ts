import {Entity} from "../../Entity.js";
import {Reference} from "../../Reference.js";
import {CSCanonizeManager} from "../CSCanonizeManager.js";
import {AssetSolverFactory} from "./AssetSolverFactory.js";

export class AssetSolver extends Entity {


    public constructor(canonizeManager: CSCanonizeManager, solverId: string, csCannonClass: string) {
        let factory = canonizeManager.getAssetSolverFactory();

        super(factory, [new Reference(factory.sandraManager.get(factory.id), solverId)]);

        this.addReference(new Reference(factory.sandraManager.get(AssetSolverFactory.CS_CANNON_CLASS_NAME), csCannonClass));

    }


}
