import {CSCanonizeManager} from "../../CSCanonizeManager.js";
import {JetskiEntityFactory} from "./JetskiEntityFactory.js";
import {BlockchainBlock} from "../../BlockchainBlock.js";
import {Blockchain} from "../../Blockchain.js";

export class CanonizerJetski {

    private manager:CSCanonizeManager ;
    private jetskiFactory:JetskiEntityFactory ;
    private instanceCode:string ;


    public constructor(manager:CSCanonizeManager, instanceCode: string) {

        this.manager = manager ;
        this.jetskiFactory = new JetskiEntityFactory(manager.getSandra());
        this.instanceCode = instanceCode;

        this.instanceCode = 'myCode';


    }


    public getJetskifacory()
    {
        return this.jetskiFactory;
    }

    public notifyRun(block:BlockchainBlock,blockchain:Blockchain){

        let latestJetski = this.jetskiFactory.getOrCreateJetskiInstance(JetskiEntityFactory.LATEST_JETSKI+blockchain.getName());
        let currentJetski = this.jetskiFactory.getOrCreateJetskiInstance(JetskiEntityFactory.LATEST_JETSKI+blockchain.getName());

    }

    private buildInstanceCode():string{

        return (Date.now() / 1000).toString() ;

    }



}

