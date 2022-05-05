"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanonManager = void 0;
const CSCanonizeManager_1 = require("../src/canonizer/CSCanonizeManager");
class CanonManager {
    constructor() {
        this.canonizeManager = new CSCanonizeManager_1.CSCanonizeManager({
            connector: {
                gossipUrl: CanonManager.SETTINGS.local.gossipUrl,
                jwt: CanonManager.SETTINGS.local.jwt,
            },
        });
    }
    static getInstance() {
        if (!CanonManager.instance) {
            CanonManager.instance = new CanonManager();
        }
        return CanonManager.instance;
    }
    getCSCanonizeManager() {
        return this.canonizeManager;
    }
}
exports.CanonManager = CanonManager;
CanonManager.SETTINGS = {
    server: // fondue
    {
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnYiOiJmb25kdWUiLCJmbHVzaCI6dHJ1ZSwiZXhwIjoxMDYxMTY0NzQ0OTIwMDAwfQ.TX0Xcy7OeHv6oE3iTxKe-TNbMaIefjViCUGvqpFAG3Q',
        gossipUrl: "http://debug.everdreamsoft.com/fondue/alex/gossip"
    },
    local: {
        // bsc
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnYiOiJic2MiLCJmbHVzaCI6dHJ1ZSwiZXhwIjoxMDYwODE2MjQyMDk2MDAwfQ.X0MLqtaUtCrgfN_sWO0IhybOtftWE4Lltex2Hh0k0u4',
        gossipUrl: "http://localhost:8000/alex/gossip"
    }
};
//# sourceMappingURL=CanonManager.js.map