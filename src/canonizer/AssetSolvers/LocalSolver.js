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
import { AssetSolver } from "./AssetSolver.js";
var LocalSolver = /** @class */ (function (_super) {
    __extends(LocalSolver, _super);
    function LocalSolver(canonizeManager) {
        var _this = this;
        var factory = canonizeManager.getAssetSolverFactory();
        _this = _super.call(this, canonizeManager, 'localSolver', 'CsCannon\\\AssetSolvers\\\LocalSolver') || this;
        return _this;
    }
    return LocalSolver;
}(AssetSolver));
export { LocalSolver };
//# sourceMappingURL=LocalSolver.js.map