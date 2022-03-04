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
exports.JetskiProcessEntityFactory = void 0;
var EntityFactory_js_1 = require("../../../EntityFactory.js");
var JetskiProcessEntity_1 = require("./JetskiProcessEntity");
var JetskiProcessEntityFactory = /** @class */ (function (_super) {
    __extends(JetskiProcessEntityFactory, _super);
    function JetskiProcessEntityFactory(sandra) {
        var _this = _super.call(this, JetskiProcessEntityFactory.is_a, JetskiProcessEntityFactory.contained_in_file, sandra, sandra.get(JetskiProcessEntityFactory.ID)) || this;
        _this.updateOnExistingRef = sandra.get(JetskiProcessEntityFactory.ID);
        return _this;
    }
    JetskiProcessEntityFactory.prototype.getOrCreateJetskiProcess = function (jetskiProcessData, sandra) {
        var jetskiProcessObj = this.getEntitiesWithRefValue(JetskiProcessEntityFactory.ID, jetskiProcessData.id);
        if (!(jetskiProcessObj instanceof JetskiProcessEntity_1.JetskiProcessEntity))
            jetskiProcessObj = new JetskiProcessEntity_1.JetskiProcessEntity(this, sandra, jetskiProcessData);
        return jetskiProcessObj;
    };
    JetskiProcessEntityFactory.prototype.getJetskiProcess = function (id, sandra) {
        return this.getEntitiesWithRefValue(JetskiProcessEntityFactory.ID, id);
    };
    JetskiProcessEntityFactory.is_a = 'jetskiProcess';
    JetskiProcessEntityFactory.contained_in_file = 'jetskiProcessFile';
    JetskiProcessEntityFactory.ID = 'ID';
    JetskiProcessEntityFactory.PROCESS_ID = 'processID';
    JetskiProcessEntityFactory.PROCESS_TITLE = 'processTitle';
    JetskiProcessEntityFactory.PROCESS_DESCRIPTION = 'processDescription';
    JetskiProcessEntityFactory.JETSKI_NAME = 'jetskiName';
    JetskiProcessEntityFactory.JETSKI_PATH = 'jetskiPath';
    JetskiProcessEntityFactory.LAST_START_TIME = 'lastStartTime';
    JetskiProcessEntityFactory.LAST_STOP_TIME = 'lastStopTime';
    // Joined Entities
    JetskiProcessEntityFactory.JOINED_ADDRESS = 'joinedAddress';
    // Brother Entities
    JetskiProcessEntityFactory.ON_BLOCKCHAIN = 'onBlockchain';
    JetskiProcessEntityFactory.HAS_STATUS = 'hasStatus';
    return JetskiProcessEntityFactory;
}(EntityFactory_js_1.EntityFactory));
exports.JetskiProcessEntityFactory = JetskiProcessEntityFactory;
