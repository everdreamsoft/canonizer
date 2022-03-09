import {BalanceFactory} from "./BalanceFactory";
import {Entity} from "../Entity";
import {BlockchainContract} from "./BlockchainContract";
import {BlockchainAddress} from "./BlockchainAddress";
import {Reference} from "../Reference";
import {ContractStandard} from "./ContractStandard";
import {Concept} from "../Concept";
import {SandraManager} from "../SandraManager";

export interface BalanceInterface {
    quantity: string
    specifierArray: Map<Concept, string>,
    contract: BlockchainContract,
    address: BlockchainAddress,
}

export class BalanceEntity extends Entity {

    constructor(balanceFactory: BalanceFactory, balanceData: BalanceInterface) {

        //Long item id added for ERC1155 case that includes address also in item id
        super(balanceFactory, [new Reference(balanceFactory.sandraManager.get(BalanceFactory.BALANCE_ITEM_LONG_ID),
            BalanceEntity.getBalanceUniqueLongId(balanceData.contract, balanceData.address, balanceFactory.sandraManager))]);

        //This is still kept for code compatibility
        this.addReference(new Reference(balanceFactory.sandraManager.get(BalanceFactory.BALANCE_ITEM_ID),
            BalanceEntity.getBalanceId(balanceData.contract)))

        this.addReference(new Reference(balanceFactory.sandraManager.get(BalanceFactory.QUANTITY), balanceData.quantity))

        if (balanceData.specifierArray && balanceData.specifierArray.size > 0)
            balanceData.specifierArray.forEach((value, key) => {
                this.addReference(new Reference(balanceFactory.sandraManager.get(key.shortname), value));
            })

        this.joinEntity(BalanceFactory.ON_CONTRACT, balanceData.contract, this.factory.sandraManager);
        this.joinEntity(BalanceFactory.LINKED_ADDRESS, balanceData.address, this.factory.sandraManager);

    }

    public static getBalanceUniqueLongId(contract: BlockchainContract, address: BlockchainAddress, sandra: SandraManager) {
        let standardArray = contract.getStandard();

        if (standardArray && standardArray.length > 0)
            return contract.getRefValue("id") + "-" + address.getRefValue(sandra.get("address")) + "-" + (standardArray[0] as ContractStandard).getDisplayStructure();

        return contract.getRefValue("id") + "-" + address.getRefValue(sandra.get("address")) + "-" + "NULL";
    }


    public static getBalanceId(contract: BlockchainContract) {
        let standardArray = contract.getStandard();

        if (standardArray && standardArray.length > 0)
            return contract.getRefValue("id") + "-" + (standardArray[0] as ContractStandard).getDisplayStructure();

        return contract.getRefValue("id") + "-" + "NULL";
    }

    public bindContract(contract: BlockchainContract) {
        this.joinEntity(BalanceFactory.ON_CONTRACT, contract, this.factory.sandraManager);
    }

    public bindAddress(address: BlockchainAddress) {
        this.joinEntity(BalanceFactory.LINKED_ADDRESS, address, this.factory.sandraManager);
    }

}
