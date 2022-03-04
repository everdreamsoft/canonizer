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
exports.BlockchainToken = void 0;
var Entity_js_1 = require("../Entity.js");
var BlockchainTokenFactory_js_1 = require("./BlockchainTokenFactory.js");
var Reference_js_1 = require("../Reference.js");
var BlockchainContractFactory_js_1 = require("./BlockchainContractFactory.js");
var BlockchainToken = /** @class */ (function (_super) {
    __extends(BlockchainToken, _super);
    function BlockchainToken(canonizeManager, code) {
        return _super.call(this, canonizeManager.getTokenFactory(), [new Reference_js_1.Reference(canonizeManager.getSandra().get(BlockchainTokenFactory_js_1.BlockchainTokenFactory.ID), code)]) || this;
    }
    BlockchainToken.prototype.bindToAssetWithContract = function (contract, asset) {
        var sandra = contract.factory.sandraManager;
        this.factory.joinFactory(contract.factory, 'self');
        this.joinEntity(contract.subjectConcept.shortname, asset, this.factory.sandraManager);
        //we need to specify for that contract that asset are bound not only on the contract but with explicit tokenpath
        contract.addReference(new Reference_js_1.Reference(sandra.get(BlockchainContractFactory_js_1.BlockchainContractFactory.EXPLICIT_TOKEN_LISTING_SHORTNAME), '1'));
        //this.setTriplet(contract.subjectConcept.shortname, tokenPath, this.sandra);
    };
    return BlockchainToken;
}(Entity_js_1.Entity));
exports.BlockchainToken = BlockchainToken;
