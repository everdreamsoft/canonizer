import {CompatibleBlockchains, CSCanonizeManager} from "../src/canonizer/CSCanonizeManager";
import {RmrkAssetCollection} from "../src/canonizer/Interfaces/Rmrk/RmrkAssetCollection";
import {RmrkCanonizerWrapper} from "../src/canonizer/Interfaces/Rmrk/RmrkCanonizer";

// Gossip
let jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnYiOiJnb3NzaXAiLCJmbHVzaCI6dHJ1ZSwiZXhwIjoxMDQ0NDE5MjUyMDQwMDAwfQ.i3MRmP56AEvIvWGdnj1TKuLZNaqLYaqzXaWijtT-Cc8';

let canonizeManager = new CSCanonizeManager({connector:{gossipUrl:'http://arkam.everdreamsoft.com/alex/gossip',jwt:jwt}});

let kusamaChain = canonizeManager.getOrInitBlockchain(CompatibleBlockchains.kusama);

let rmrkManager = new RmrkCanonizerWrapper(canonizeManager);





let collection = rmrkManager.createRmrkCollection({
    id: 'myCollection',
    imageUrl: 'https://picsum.photos/400',
    name: 'my veryfirst collection',
    description: 'dolor'
},10,10000);

canonizeManager.gossipCollection().then(r=>{console.log(r)});




