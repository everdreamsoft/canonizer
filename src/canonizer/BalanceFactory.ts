import {SandraManager} from "../SandraManager.js";
import {EntityFactory} from "../EntityFactory.js";

export class BalanceFactory extends EntityFactory {

    private sandra: SandraManager;

    public constructor(sandra: SandraManager) {
        super('balanceItem', 'balanceFile', sandra);
        this.sandra = sandra;
    }

    public getBalanceForAddress() {
    }

}
