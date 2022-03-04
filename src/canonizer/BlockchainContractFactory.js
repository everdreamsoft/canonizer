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
exports.BlockchainContractFactory = void 0;
var EntityFactory_js_1 = require("../EntityFactory.js");
var BlockchainContract_js_1 = require("./BlockchainContract.js");
var BlockchainContractFactory = /** @class */ (function (_super) {
    __extends(BlockchainContractFactory, _super);
    //public blockchain?:Blockchain;
    function BlockchainContractFactory(sandra) {
        var _this = _super.call(this, 'blockchainContract', 'blockchainContractFile', sandra) || this;
        _this.contained_in_file = 'blockchainContractFile';
        _this.sandra = sandra;
        _this.updateOnExistingRef = sandra.get('id');
        return _this;
    }
    BlockchainContractFactory.prototype.getOrCreate = function (id) {
        if (this.entityByRevValMap.has(this.sandra.get('id'))) {
            var addressRefMap = this.entityByRevValMap.get(this.sandra.get('id'));
            if (addressRefMap && addressRefMap.has(id)) {
                //address exists in factory
                // @ts-ignore
                return addressRefMap.get(id);
            }
        }
        return new BlockchainContract_js_1.BlockchainContract(this, id, this.sandra);
    };
    BlockchainContractFactory.JOIN_COLLECTION = 'inCollection';
    BlockchainContractFactory.EXPLICIT_TOKEN_LISTING_SHORTNAME = 'explicitListing';
    BlockchainContractFactory.CONTRACT_STANDARD = 'contractStandard';
    BlockchainContractFactory.ON_BLOCKCHAIN_VERB = 'onBlockchain';
    return BlockchainContractFactory;
}(EntityFactory_js_1.EntityFactory));
exports.BlockchainContractFactory = BlockchainContractFactory;
