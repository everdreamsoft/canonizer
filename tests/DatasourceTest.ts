import {KusamaBlockchain} from "../src/canonizer/Substrate/Kusama/KusamaBlockchain.js";
import {CSCanonizeManager} from "../src/canonizer/CSCanonizeManager.js";

const canonizeManager = new CSCanonizeManager({
    connector: {
        gossipUrl: 'http://arkam.everdreamsoft.com/alex/gossip',
        jwt: ""
    }
});

const sandra = canonizeManager.getSandra();
const chain = new KusamaBlockchain(sandra);

const kusamaAddress = chain.addressFactory.getOrCreate('myGreatAddress');

