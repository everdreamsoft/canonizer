import {CSCanonizeManager} from "../../CSCanonizeManager.js";
import {JetskiEntityFactory} from "./JetskiEntityFactory.js";
import {BlockchainBlock} from "../../BlockchainBlock.js";
import {Blockchain} from "../../Blockchain.js";
import {ApiConnector, Gossiper} from "../../../Gossiper";

export class CanonizerJetski {

    private manager:CSCanonizeManager ;
    private jetskiFactory:JetskiEntityFactory ;
    private instanceCode:string ;


    public constructor(manager:CSCanonizeManager, instance:string) {

        this.manager = manager ;
        this.jetskiFactory = new JetskiEntityFactory(manager.getSandra());
        this.instanceCode = instance;

    }

    public getJetskifacory()
    {
        return this.jetskiFactory;
    }


    public async gossipLatestBlock(apiConnector?:ApiConnector)
    {
        let gossiper = new Gossiper(this.jetskiFactory);
        return gossiper.gossipToUrl(this.manager.getApiConnector(apiConnector));
    }

    public notifyRun(block:BlockchainBlock,blockchain:Blockchain){

        let latestJetski = this.jetskiFactory.getOrCreateJetskiInstance(JetskiEntityFactory.LATEST_JETSKI+blockchain.getName(), block, this.instanceCode);
        let currentJetski = this.jetskiFactory.getOrCreateJetskiInstance(JetskiEntityFactory.LATEST_JETSKI+blockchain.getName(), block, this.instanceCode);

    }

    private static buildInstanceCode():string{

        return (Date.now() / 1000).toString() ;

    }


    public clearInstance()
    {
        this.instanceCode = "no_instance";
    }



}

