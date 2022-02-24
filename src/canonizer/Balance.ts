import {BalanceFactory} from "./BalanceFactory";
import {Entity} from "../Entity";
import {BlockchainContract} from "./BlockchainContract";
import {BlockchainAddress} from "./BlockchainAddress";

export class Balance extends Entity {

    constructor(balanceFactory: BalanceFactory) {
        super(balanceFactory);
    }

    public bindContract(contract: BlockchainContract) {
        this.joinEntity(BalanceFactory.ON_CONTRACT, contract, this.factory.sandraManager);
    }

    public bindAddress(address: BlockchainAddress) {
        this.joinEntity(BalanceFactory.LINKED_ADDRESS, address, this.factory.sandraManager);
    }



}
