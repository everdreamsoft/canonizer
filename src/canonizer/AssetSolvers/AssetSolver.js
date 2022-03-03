"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetSolver = void 0;
const Entity_js_1 = require("../../Entity.js");
const Reference_js_1 = require("../../Reference.js");
const AssetSolverFactory_js_1 = require("./AssetSolverFactory.js");
class AssetSolver extends Entity_js_1.Entity {
    constructor(canonizeManager, solverId, csCannonClass) {
        let factory = canonizeManager.getAssetSolverFactory();
        super(factory, [new Reference_js_1.Reference(factory.sandraManager.get(factory.id), solverId)]);
        this.addReference(new Reference_js_1.Reference(factory.sandraManager.get(AssetSolverFactory_js_1.AssetSolverFactory.CS_CANNON_CLASS_NAME), csCannonClass));
    }
}
exports.AssetSolver = AssetSolver;
//# sourceMappingURL=AssetSolver.js.map