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
exports.JetskiAddressEntityFactory = void 0;
var EntityFactory_js_1 = require("../../../EntityFactory.js");
var JetskiProcessEntity_1 = require("./JetskiProcessEntity");
var JetskiAddressEntity_1 = require("./JetskiAddressEntity");
var JetskiAddressEntityFactory = /** @class */ (function (_super) {
    __extends(JetskiAddressEntityFactory, _super);
    function JetskiAddressEntityFactory(sandra) {
        var _this = _super.call(this, JetskiAddressEntityFactory.is_a, JetskiAddressEntityFactory.contained_in_file, sandra) || this;
        _this.updateOnExistingRef = sandra.get(JetskiAddressEntityFactory.HASH);
        return _this;
    }
    JetskiAddressEntityFactory.prototype.getOrCreateJetskiAddress = function (jetskiAddressData, sandra) {
        var jetskiAddressObj = this.getEntitiesWithRefValue(JetskiAddressEntityFactory.HASH, jetskiAddressData.hash);
        if (!(jetskiAddressObj instanceof JetskiProcessEntity_1.JetskiProcessEntity))
            jetskiAddressObj = new JetskiAddressEntity_1.JetskiAddressEntity(this, sandra, jetskiAddressData);
        return jetskiAddressObj;
    };
    JetskiAddressEntityFactory.is_a = 'jetskiAddress';
    JetskiAddressEntityFactory.contained_in_file = 'jetskiAddressFile';
    JetskiAddressEntityFactory.HASH = 'hash';
    JetskiAddressEntityFactory.STATUS = 'status';
    JetskiAddressEntityFactory.LAST_BLOCK_SAVED = 'lastBlockSaved';
    JetskiAddressEntityFactory.LAST_BLOCK_PROCESSED = 'lastBlockProcessed';
    JetskiAddressEntityFactory.LAST_UPDATE_TIME = 'lastUpdateTime';
    JetskiAddressEntityFactory.START_BLOCK = 'startBlock';
    JetskiAddressEntityFactory.END_BLOCK = 'endBlock';
    JetskiAddressEntityFactory.STANDARD = 'standard';
    JetskiAddressEntityFactory.BLOCK_RANGE = 'blockRange';
    JetskiAddressEntityFactory.JOINED_COLLECTION = 'joinedCollection';
    return JetskiAddressEntityFactory;
}(EntityFactory_js_1.EntityFactory));
exports.JetskiAddressEntityFactory = JetskiAddressEntityFactory;
