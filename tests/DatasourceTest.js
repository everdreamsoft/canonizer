"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KusamaBlockchain_js_1 = require("../src/canonizer/Substrate/Kusama/KusamaBlockchain.js");
const CSCanonizeManager_js_1 = require("../src/canonizer/CSCanonizeManager.js");
const canonizeManager = new CSCanonizeManager_js_1.CSCanonizeManager({
    connector: {
        gossipUrl: 'http://arkam.everdreamsoft.com/alex/gossip',
        jwt: ""
    }
});
const sandra = canonizeManager.getSandra();
const chain = new KusamaBlockchain_js_1.KusamaBlockchain(sandra);
const kusamaAddress = chain.addressFactory.getOrCreate('myGreatAddress');
//# sourceMappingURL=DatasourceTest.js.map