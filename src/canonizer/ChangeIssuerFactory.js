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
exports.ChangeIssuerFactory = void 0;
var Blockchain_1 = require("./Blockchain");
var EntityFactory_1 = require("../EntityFactory");
var ChangeIssuerFactory = /** @class */ (function (_super) {
    __extends(ChangeIssuerFactory, _super);
    function ChangeIssuerFactory(sandra) {
        var _this = _super.call(this, 'changeIssuer', 'changeIssuerFile', sandra) || this;
        _this.is_a = "changeIssuer";
        _this.contained_in_file = "changeIssuerFile";
        _this.updateOnExistingRef = sandra.get(Blockchain_1.Blockchain.TXID_CONCEPT_NAME);
        return _this;
    }
    ChangeIssuerFactory.EVENT_SOURCE_ADDRESS = 'source';
    ChangeIssuerFactory.EVENT_BLOCK_TIME = 'timestamp';
    ChangeIssuerFactory.ON_BLOCKCHAIN = 'onBlockchain';
    ChangeIssuerFactory.EVENT_BLOCK = 'onBlock';
    ChangeIssuerFactory.NEW_ISSUER = 'newIssuer';
    ChangeIssuerFactory.COLLECTION_ID = 'collectionId';
    return ChangeIssuerFactory;
}(EntityFactory_1.EntityFactory));
exports.ChangeIssuerFactory = ChangeIssuerFactory;
