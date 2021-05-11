import {SandraManager} from "../SandraManager.js";
import {EntityFactory} from "../EntityFactory.js";
import {BlockchainAddress} from "./BlockchainAddress.js";

export class BalanceFactory extends EntityFactory{
    private sandra: SandraManager;

    private address:BlockchainAddress ;




    public constructor(sandra:SandraManager) {

        super('balanceItem','balanceFile',sandra);

        this.sandra = sandra ;

    }

    public getBalanceForAddress(){




    }




}