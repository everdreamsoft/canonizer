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
exports.JetskiAddressEntity = void 0;
var Entity_js_1 = require("../../../Entity.js");
var Reference_1 = require("../../../Reference");
var JetskiAddressEntityFactory_1 = require("./JetskiAddressEntityFactory");
var JetskiAddressEntity = /** @class */ (function (_super) {
    __extends(JetskiAddressEntity, _super);
    function JetskiAddressEntity(factory, sandra, jetskiAddressData) {
        var _this = _super.call(this, factory, [new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.HASH), jetskiAddressData.hash)]) || this;
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.STATUS), jetskiAddressData.status));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.LAST_BLOCK_PROCESSED), jetskiAddressData.lastBlockProcessed));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.LAST_BLOCK_SAVED), jetskiAddressData.lastBlockSaved));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.LAST_UPDATE_TIME), jetskiAddressData.lastUpdateTime));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.START_BLOCK), jetskiAddressData.startBlock));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.END_BLOCK), jetskiAddressData.endBlock));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.STANDARD), jetskiAddressData.standard));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.BLOCK_RANGE), jetskiAddressData.blockRange));
        return _this;
    }
    JetskiAddressEntity.prototype.bindJetskiCollection = function (collection) {
        this.joinEntity(JetskiAddressEntityFactory_1.JetskiAddressEntityFactory.JOINED_COLLECTION, collection, this.factory.sandraManager);
    };
    return JetskiAddressEntity;
}(Entity_js_1.Entity));
exports.JetskiAddressEntity = JetskiAddressEntity;
