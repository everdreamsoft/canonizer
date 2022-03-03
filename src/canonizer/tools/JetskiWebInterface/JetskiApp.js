"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiApp = void 0;
const JetskiProcessEntityFactory_1 = require("./JetskiProcessEntityFactory");
class JetskiApp {
    constructor(manager) {
        this.manager = manager;
        this.jetskiProcessFactory = new JetskiProcessEntityFactory_1.JetskiProcessEntityFactory(manager.getSandra());
    }
    getProcessFactory() {
        return this.jetskiProcessFactory;
    }
}
exports.JetskiApp = JetskiApp;
//# sourceMappingURL=JetskiApp.js.map