"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CSCanonizeManager_js_1 = require("../src/canonizer/CSCanonizeManager.js");
const Gossiper_js_1 = require("../src/Gossiper.js");
//const canonizeManager = new CSCanonizeManager({connector:{gossipUrl:'http://arkam.everdreamsoft.com/alex/gossip',jwt:jwt}});
//const sandra = canonizeManager.getSandra();
//const chain = new KusamaBlockchain(sandra);
//const kusamaAddress = chain.addressFactory.getOrCreate('myGreatAddress');
const canonizeManager = new CSCanonizeManager_js_1.CSCanonizeManager({ connector: { gossipUrl: 'localhost:8000/alex/gossip', jwt: 'aaa' } });
const gossiper = new Gossiper_js_1.Gossiper(canonizeManager.getAssetCollectionFactory());
canonizeManager.getAssetCollectionFactory().listenFromRemote({ gossipUrl: 'http://localhost:8000/alex/gossip', jwt: 'aaa' }).then(r => { console.log("hey how"); });
console.log("hello");
//# sourceMappingURL=DatasourceTest.js.map