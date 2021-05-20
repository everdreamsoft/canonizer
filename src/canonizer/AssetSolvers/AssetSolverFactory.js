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
import { EntityFactory } from "../../EntityFactory.js";
var AssetSolverFactory = /** @class */ (function (_super) {
    __extends(AssetSolverFactory, _super);
    function AssetSolverFactory(manager) {
        var _this = _super.call(this, 'assetSolver', 'assetSolverFile', manager.getSandra()) || this;
        _this.is_a = 'assetSolver';
        _this.contained_in_file = 'assetSolverFile';
        _this.id = 'identifier';
        _this.updateOnExistingRef = manager.getSandra().get(_this.id);
        var factory = manager.getAssetSolverFactory();
        return _this;
    }
    AssetSolverFactory.CS_CANNON_CLASS_NAME = 'class_name';
    AssetSolverFactory.COLLECTION_JOIN_VERB = 'has';
    return AssetSolverFactory;
}(EntityFactory));
export { AssetSolverFactory };
//# sourceMappingURL=AssetSolverFactory.js.map