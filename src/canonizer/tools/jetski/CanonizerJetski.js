"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JetskiEntityFactory_js_1 = require("./JetskiEntityFactory.js");
const Gossiper_1 = require("../../../Gossiper");
class CanonizerJetski {
    constructor(manager, instance) {
        this.manager = manager;
        this.jetskiFactory = new JetskiEntityFactory_js_1.JetskiEntityFactory(manager.getSandra());
        this.instanceCode = instance;
    }
    getJetskifacory() {
        return this.jetskiFactory;
    }
    async gossipLatestBlock(apiConnector) {
        let gossiper = new Gossiper_1.Gossiper(this.jetskiFactory);
        return gossiper.gossipToUrl(this.manager.getApiConnector(apiConnector));
    }
    notifyRun(block, blockchain) {
        let latestJetski = this.jetskiFactory.getOrCreateJetskiInstance(JetskiEntityFactory_js_1.JetskiEntityFactory.LATEST_JETSKI + blockchain.getName(), block, this.instanceCode);
        let currentJetski = this.jetskiFactory.getOrCreateJetskiInstance(JetskiEntityFactory_js_1.JetskiEntityFactory.LATEST_JETSKI + blockchain.getName(), block, this.instanceCode);
    }
    static buildInstanceCode() {
        return (Date.now() / 1000).toString();
    }
    clearInstance() {
        this.instanceCode = "no_instance";
    }
}
exports.CanonizerJetski = CanonizerJetski;
//# sourceMappingURL=CanonizerJetski.js.map