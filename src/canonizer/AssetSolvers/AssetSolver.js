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
import { Entity } from "../../Entity.js";
import { AssetSolverFactory } from "./AssetSolverFactory.js";
var AssetSolver = /** @class */ (function (_super) {
    __extends(AssetSolver, _super);
    function AssetSolver(canonizeManager, solverId, csCannonClass) {
        var _this = this;
        var factory = canonizeManager.getAssetSolverFactory();
        _this = _super.call(this, canonizeManager.getAssetSolverFactory()) || this;
        _this.createOrUpdateRef(factory.id, solverId);
        _this.createOrUpdateRef(AssetSolverFactory.CS_CANNON_CLASS_NAME, csCannonClass);
        return _this;
    }
    return AssetSolver;
}(Entity));
export { AssetSolver };
//# sourceMappingURL=AssetSolver.js.map