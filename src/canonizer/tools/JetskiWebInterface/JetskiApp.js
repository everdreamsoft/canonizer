"use strict";
exports.__esModule = true;
exports.JetskiApp = void 0;
var JetskiProcessEntityFactory_1 = require("./JetskiProcessEntityFactory");
var JetskiApp = /** @class */ (function () {
    function JetskiApp(manager) {
        this.manager = manager;
        this.jetskiProcessFactory = new JetskiProcessEntityFactory_1.JetskiProcessEntityFactory(manager.getSandra());
    }
    JetskiApp.prototype.getProcessFactory = function () {
        return this.jetskiProcessFactory;
    };
    return JetskiApp;
}());
exports.JetskiApp = JetskiApp;
