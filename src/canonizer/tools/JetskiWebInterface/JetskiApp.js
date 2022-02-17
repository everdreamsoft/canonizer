"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JetskiApp = void 0;
const JetskiProcessEntityFactory_1 = require("./JetskiProcessEntityFactory");
class JetskiApp {
    constructor(manager, name) {
        this.name = 'EVM Jetski';
        this.manager = manager;
        this.jetskiProcessFactory = new JetskiProcessEntityFactory_1.JetskiProcessEntityFactory(manager.getSandra());
        this.name = name;
    }
    getProcessFactory() {
        return this.jetskiProcessFactory;
    }
}
exports.JetskiApp = JetskiApp;
//# sourceMappingURL=JetskiApp.js.map