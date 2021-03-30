import {CSCanonizeManager} from "../../CSCanonizeManager.js";
import {JetskiEntityFactory} from "./JetskiEntityFactory.js";
import {BlockchainBlock} from "../../BlockchainBlock.js";
import {Blockchain} from "../../Blockchain.js";
import {Gossiper} from "../../../Gossiper.js";

export class CanonizerJetski {

    private manager:CSCanonizeManager ;
    private jetskiFactory:JetskiEntityFactory ;
    private instanceCode:string ;


    public constructor(manager:CSCanonizeManager) {

        this.manager = manager ;
        this.jetskiFactory = new JetskiEntityFactory(manager.getSandra());

        this.instanceCode = 'myCode';




    }

    public notifyRun(block:BlockchainBlock,blockchain:Blockchain){

        let latestJetski = this.jetskiFactory.getOrCreateJetskiInstance(JetskiEntityFactory.LATEST_JETSKI+blockchain.getName());
        let currentJetski = this.jetskiFactory.getOrCreateJetskiInstance(this.instanceCode);

    }

    private buildInstanceCode():string{

        return (Date.now() / 1000).toString() ;

    }

    public async gossipJetskiStatus(){

        let gossiper = new Gossiper(this.jetskiFactory);
        return   gossiper.gossipToUrl(this.manager.getApiConnector())

    }


}

