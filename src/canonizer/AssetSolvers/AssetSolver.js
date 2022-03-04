"use strict";
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
exports.__esModule = true;
exports.AssetSolver = void 0;
var Entity_js_1 = require("../../Entity.js");
var Reference_js_1 = require("../../Reference.js");
var AssetSolverFactory_js_1 = require("./AssetSolverFactory.js");
var AssetSolver = /** @class */ (function (_super) {
    __extends(AssetSolver, _super);
    function AssetSolver(canonizeManager, solverId, csCannonClass) {
        var _this = this;
        var factory = canonizeManager.getAssetSolverFactory();
        _this = _super.call(this, factory, [new Reference_js_1.Reference(factory.sandraManager.get(factory.id), solverId)]) || this;
        _this.addReference(new Reference_js_1.Reference(factory.sandraManager.get(AssetSolverFactory_js_1.AssetSolverFactory.CS_CANNON_CLASS_NAME), csCannonClass));
        return _this;
    }
    return AssetSolver;
}(Entity_js_1.Entity));
exports.AssetSolver = AssetSolver;
