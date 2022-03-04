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
exports.JetskiProcessEntity = void 0;
var Entity_js_1 = require("../../../Entity.js");
var Reference_1 = require("../../../Reference");
var JetskiProcessEntityFactory_1 = require("./JetskiProcessEntityFactory");
var JetskiProcessEntity = /** @class */ (function (_super) {
    __extends(JetskiProcessEntity, _super);
    function JetskiProcessEntity(factory, sandra, jetskiProcessData) {
        var _this = _super.call(this, factory, [new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.ID), jetskiProcessData.id)]) || this;
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.PROCESS_ID), jetskiProcessData.processID));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.PROCESS_TITLE), jetskiProcessData.processTitle));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.LAST_START_TIME), jetskiProcessData.lastStartTime));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.PROCESS_DESCRIPTION), jetskiProcessData.processDescription));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.JETSKI_NAME), jetskiProcessData.jetskiName));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.LAST_STOP_TIME), jetskiProcessData.lastStopTime));
        _this.addReference(new Reference_1.Reference(sandra.get(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.JETSKI_PATH), jetskiProcessData.jetskiPath));
        return _this;
        //this.jetskiAddressFactory = new JetskiAddressEntityFactory(sandra);
    }
    JetskiProcessEntity.prototype.getAddressFactory = function () {
        return this.jetskiAddressFactory;
    };
    JetskiProcessEntity.prototype.bindJetskiAddress = function (addressEntity) {
        this.joinEntity(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.JOINED_ADDRESS, addressEntity, this.factory.sandraManager);
    };
    JetskiProcessEntity.prototype.setBlockchain = function (blockchain) {
        this.setTriplet(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.ON_BLOCKCHAIN, blockchain.name, this.factory.sandraManager);
    };
    JetskiProcessEntity.prototype.setStatus = function (status) {
        this.setTriplet(JetskiProcessEntityFactory_1.JetskiProcessEntityFactory.HAS_STATUS, status, this.factory.sandraManager);
    };
    return JetskiProcessEntity;
}(Entity_js_1.Entity));
exports.JetskiProcessEntity = JetskiProcessEntity;
