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
exports.BlockchainContract = void 0;
var Entity_js_1 = require("../Entity.js");
var Reference_js_1 = require("../Reference.js");
var BlockchainContractFactory_js_1 = require("./BlockchainContractFactory.js");
var BlockchainContract = /** @class */ (function (_super) {
    __extends(BlockchainContract, _super);
    function BlockchainContract(factory, id, sandraManager, standard) {
        if (standard === void 0) { standard = null; }
        var _this = this;
        if (factory == null)
            factory = new BlockchainContractFactory_js_1.BlockchainContractFactory(sandraManager);
        _this = _super.call(this, factory, [new Reference_js_1.Reference(sandraManager.get('id'), id)]) || this;
        //if the contract has a standard we bind it
        if (standard) {
            _this.joinEntity('contractStandard', standard, sandraManager);
        }
        return _this;
    }
    BlockchainContract.prototype.bindToCollection = function (collection) {
        this.joinEntity(BlockchainContractFactory_js_1.BlockchainContractFactory.JOIN_COLLECTION, collection, this.factory.sandraManager);
        return this;
    };
    BlockchainContract.prototype.setStandard = function (standard) {
        this.joinEntity(BlockchainContractFactory_js_1.BlockchainContractFactory.CONTRACT_STANDARD, standard, this.factory.sandraManager);
        return this;
    };
    BlockchainContract.prototype.setBlockchain = function (name) {
        this.setTriplet(BlockchainContractFactory_js_1.BlockchainContractFactory.ON_BLOCKCHAIN_VERB, name, this.factory.sandraManager);
        return this;
    };
    BlockchainContract.prototype.getStandard = function () {
        return this.getJoinedEntitiesOnVerb(BlockchainContractFactory_js_1.BlockchainContractFactory.CONTRACT_STANDARD);
    };
    return BlockchainContract;
}(Entity_js_1.Entity));
exports.BlockchainContract = BlockchainContract;
